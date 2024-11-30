export class UnauthorizedError extends Error {
  constructor(message: string = 'Acesso não autorizado.') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}
