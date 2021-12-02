import { ISubService } from "src/shared/core/interfaces/subService.interface";
import { SubService } from "../domain/service/SubService";

export class SubServiceMapper {
  static toDto(subService: SubService): ISubService { 
    return {
      title: subService.title,
      subServiceKey: subService.subServiceKey,
      sequence: subService.sequence,
      description: subService.description,
      companies: subService.companies,
    };
  }
}
