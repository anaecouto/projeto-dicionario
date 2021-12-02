import { ICredentials } from "src/shared/core/interfaces/credentials.interface";
import { Credentials } from "../domain/service/Credentials";

export class CredentialsMapper {

  static toDto(credentials: Credentials | undefined): ICredentials | undefined{ 
    return {
      baseUrl: credentials?.baseUrl || '', 
      token: credentials?.token || '',
      username: credentials?.username || '',
      password: credentials?.password || '',
    };
  }
}
