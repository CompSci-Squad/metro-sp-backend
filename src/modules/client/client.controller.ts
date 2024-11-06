import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from "@nestjs/common";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import {
	ClientCreatorContextService,
	FinderService,
	IndexerService,
	RemoverService,
	UpdaterService,
} from "./services";
import { FindOneParamsDto } from "./dto/find-one-params.dto";

@Controller("client")
export class ClientController {
	constructor(
		private readonly creatorService: ClientCreatorContextService,
		private readonly finderService: FinderService,
		private readonly indexerService: IndexerService,
		private readonly removerService: RemoverService,
		private readonly updaterService: UpdaterService
	) {}

	@Post()
	async create(@Body() createClientDto: CreateClientDto) {
		return this.creatorService.create(createClientDto);
	}

	@Get()
	async findAll() {
		return this.indexerService.index();
	}

	@Get(":id")
	async findOne(@Param() { id }: FindOneParamsDto) {
		return this.finderService.findById(id);
	}

	// @Patch(":id")
	// async update(
	// 	@Param("id") id: string,
	// 	@Body() updateClientDto: UpdateClientDto
	// ) {
	// 	return this.clientService.update(+id, updateClientDto);
	// }

	@Delete(":id")
	async remove(@Param() { id }: FindOneParamsDto) {
		return this.removerService.removeById(id);
	}
}
