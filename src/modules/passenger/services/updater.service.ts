import { Injectable, Logger } from "@nestjs/common";
import { ClientRepository } from "../repositories/passenger.repository";

@Injectable()
export class UpdaterService {
    private readonly logger = new Logger(UpdaterService.name)

    constructor(
        private readonly clientRepository: ClientRepository
    ){}

    public async update(){}
}