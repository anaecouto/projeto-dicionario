import { Test } from "@nestjs/testing";
import { EventEmitter2 } from "eventemitter2";
import { ObjectID } from "mongodb";
import { ContractStatusEnum } from "src/shared/core/enums/contractStatusEnum";
import { UpdateContratDetailsPayload } from "src/shared/core/interfaces/updateContractDetailsPayload";
import { v4 as uuidv4 } from "uuid";
import { Contract } from "../../domain/contract/Contract";
import { ContractRepoTypeOrm } from "../../repositories/implementations/ContractRepoTypeOrm";
import { SaveContractDetailsUseCse } from "../saveContractDetailsUseCase";

const contractMockList: Contract = {
  _id: new ObjectID("61b8a27d8cad3f353ea6fad7"),
  agency: "1878",
  account: "284726",
  document: "62577994060",
  name: "Iago Leandro Renan Ramos",
  state: "MA",
  sex: "M",
  birthDate: new Date("1999-02-21"),
  status: ContractStatusEnum.CREATED,
  phones: ["66988616512"],
  contactedPhones: [""],
} as unknown as Contract;

const contractUpdatedMockList = {
  _id: contractMockList.id,
  agency: "1878",
  account: "284726",
  document: "62577994060",
  name: "Iago Leandro Renan Ramos",
  state: "MA",
  sex: "M",
  birthDate: new Date("1999-02-21"),
  status: ContractStatusEnum.REFUSED,
  phones: ["66988616512"],
  contactedPhones: [""],
  details: {
    annotation: "iago rejeitado",
  },
};

describe("save contract details", () => {
  let saveContractDetailsUseCase: SaveContractDetailsUseCse;
  let contractRepoTypeOrm;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SaveContractDetailsUseCse,
        EventEmitter2,
        {
          provide: ContractRepoTypeOrm,
          useValue: {
            findOne: jest.fn().mockResolvedValue(contractMockList),
            update: jest.fn().mockResolvedValue(contractUpdatedMockList),
          },
        },
      ],
    }).compile();

    saveContractDetailsUseCase =
      await module.resolve<SaveContractDetailsUseCse>(
        SaveContractDetailsUseCse
      );

    contractRepoTypeOrm = await module.get<ContractRepoTypeOrm>(
      ContractRepoTypeOrm
    );
  });

  it("should update contract details", async () => {
    const dto: UpdateContratDetailsPayload = {
      contractId: "61b8a27d8cad3f353ea6fad7",
      details: {
        annotation: "iago rejeitado",
      },
      status: ContractStatusEnum.REFUSED,
    } as UpdateContratDetailsPayload;

    await saveContractDetailsUseCase.execute(dto);

    expect(contractRepoTypeOrm.update).toHaveBeenCalled();
  });
});
