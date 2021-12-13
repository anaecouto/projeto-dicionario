import { Test } from "@nestjs/testing";
import { EventEmitter2 } from "eventemitter2";
import { ContractStatusEnum } from "src/shared/core/enums/contractStatusEnum";
import { v4 as uuidv4 } from "uuid";
import { CreateNewContractValidation } from "../../controllers/contract/validations/createNewContract.validation";
import { Contract } from "../../domain/contract/Contract";
import { ContractRepoTypeOrm } from "../../repositories/implementations/ContractRepoTypeOrm";
import { CreateNewContractUseCase } from "../createNewContractUseCase";

const contractMockList: Contract[] = [
  {
    id: uuidv4(),
    agency: "5568",
    account: "12053023",
    document: "11221794051",
    name: "Francisco Fernando Diogo Fogaça",
    state: "GO",
    sex: "M",
    birthDate: new Date("1968-07-11"),
    status: ContractStatusEnum.CREATED,
    phones: ["11987997201"],
    contactedPhones: [""],
  },
] as Contract[];

describe("create new contract", () => {
  let createNewContractUseCase: CreateNewContractUseCase;
  let contractRepoTypeOrm;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateNewContractUseCase,
        EventEmitter2,
        {
          provide: ContractRepoTypeOrm,
          useValue: {
            save: jest
              .fn()
              .mockResolvedValue(contractMockList[0]),
          },
        },
      ],
    }).compile();

    createNewContractUseCase = await module.resolve<CreateNewContractUseCase>(
      CreateNewContractUseCase
    );

    contractRepoTypeOrm = await module.get<ContractRepoTypeOrm>(
      ContractRepoTypeOrm
    );
  });

  it("should create a new contract", async () => {
      const dto: CreateNewContractValidation = {
            agency: "5568",
            account: "12053023",
            document: "11221794051",
            name: "Francisco Fernando Diogo Fogaça",
            state: "GO",
            sex: "M",
            birthDate: new Date("1968-07-11"),
            status: ContractStatusEnum.CREATED,
            phones: ["11987997201"],
            contactedPhones: [""],
      };
    
      const result = await createNewContractUseCase.execute(dto);
      console.log(result);

      expect(result).toEqual(contractMockList[0]);
  });
});