import { ApiProperty } from "@nestjs/swagger";
import { ICredentials } from "src/shared/core/interfaces/credentials.interface";

export class CredentialsValidation
  implements ICredentials {
    @ApiProperty()
    baseUrl: string;
    
    @ApiProperty()
    token?: string;
    
    @ApiProperty()
    username?: string;
    
    @ApiProperty()
    password?: string;
 
}
