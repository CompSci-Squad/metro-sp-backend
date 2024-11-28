import { Injectable, Scope, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { HttpMethodEnum } from '../enums/http-method.enum';

@Injectable({ scope: Scope.TRANSIENT })
export abstract class DataSource {
  protected readonly httpService: HttpService;
  protected abstract baseUrl: string;
  protected headers: Record<string, any> = {};
  protected params: Record<string, any> = {};
  protected token: string;
  protected bearerToken: string;
  protected timeoutMs = 120000;
  private payload: any = {};

  constructor(httpService: HttpService) {
    this.httpService = httpService;
  }

  public withHeaders(headers: Record<string, any>): this {
    this.headers = headers;
    return this;
  }

  public withParams(params: Record<string, any>): this {
    this.params = params;
    return this;
  }

  public withToken(token: string): this {
    this.token = token;
    return this;
  }

  public withBearerToken(token: string): this {
    this.bearerToken = `Bearer ${token}`;
    return this;
  }

  public timeout(milliseconds: number): this {
    this.timeoutMs = milliseconds;
    return this;
  }

  public interceptPayload(data: any): this {
    this.payload = { ...this.payload, ...data };
    return this;
  }

  async get<T = any>(endpoint: string): Promise<T> {
    return this.execute<T>(HttpMethodEnum.GET, endpoint);
  }

  async post<T = any>(
    endpoint: string,
    data: any,
    type: 'FORM' | 'JSON' = 'JSON',
  ): Promise<T> {
    return this.execute<T>(HttpMethodEnum.POST, endpoint, data, type);
  }

  async put<T = any>(endpoint: string, data: any): Promise<T> {
    return this.execute<T>(HttpMethodEnum.PUT, endpoint, data);
  }

  async patch<T = any>(endpoint: string, data: any): Promise<T> {
    return this.execute<T>(HttpMethodEnum.PATCH, endpoint, data);
  }

  async delete<T = any>(endpoint: string): Promise<T> {
    return this.execute<T>(HttpMethodEnum.DELETE, endpoint);
  }

  private async execute<T = any>(
    method: HttpMethodEnum,
    endpoint: string,
    data?: any,
    type: 'FORM' | 'JSON' = 'JSON',
  ): Promise<T> {
    const config: AxiosRequestConfig = {
      baseURL: this.baseUrl,
      headers: this.makeHeaders(),
      params: this.params,
      timeout: this.timeoutMs,
      method: method as AxiosRequestConfig['method'],
      url: endpoint,
      data: type === 'FORM' ? this.formatAsFormData(data) : data,
    };

    try {
      const response = await lastValueFrom(this.httpService.request<T>(config));
      this.validateStatus(response);
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Request failed',
        error.response?.status || 500,
      );
    } finally {
      this.clearAttributes();
    }
  }

  private makeHeaders(): Record<string, any> {
    const headers = { ...this.headers };

    if (this.token) headers.token = this.token;
    if (this.bearerToken) headers.Authorization = this.bearerToken;

    return headers;
  }

  private formatAsFormData(data: Record<string, any>): string {
    return new URLSearchParams(data).toString();
  }

  private validateStatus(response: AxiosResponse): void {
    if (response.status >= 500) {
      throw new HttpException(
        `Server error with status code ${response.status}`,
        response.status,
      );
    }
  }

  private clearAttributes(): void {
    this.headers = {};
    this.params = {};
    this.payload = {};
  }
}
