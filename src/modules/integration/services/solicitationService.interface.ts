import { IPaginationOptions, Pagination } from "nestjs-typeorm-paginate";
import { SolicitationEntity } from "src/shared/infra/database/typeorm/entities/solicitation.entity";

export interface ISolicitationService {
    paginate(options: IPaginationOptions): Promise<Pagination<SolicitationEntity>>
}
