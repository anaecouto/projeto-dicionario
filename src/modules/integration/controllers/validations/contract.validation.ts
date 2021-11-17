import { ApiProperty } from "@nestjs/swagger";
import { IContract } from "src/shared/core/interfaces/contract.interface";

export class ContractValidation
  implements IContract {

    @ApiProperty()
    totalAmount: number;
    @ApiProperty()
    profitTax: number;
    @ApiProperty()
    profitTotalAmount: number;
 
}
