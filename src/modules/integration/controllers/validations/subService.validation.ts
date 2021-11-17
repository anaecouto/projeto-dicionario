import { ApiProperty } from "@nestjs/swagger";
import { ISubService } from "src/shared/core/interfaces/subService.interface";
export class SubServiceValidation
  implements ISubService {

    @ApiProperty()
    title: string;
    @ApiProperty()
    subServiceKey: string;
    @ApiProperty()
    sequence: number;
    @ApiProperty()
    description: string;
    @ApiProperty()
    companies: any[];
 
}
