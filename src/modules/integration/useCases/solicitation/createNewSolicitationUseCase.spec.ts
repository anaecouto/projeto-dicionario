import { Test } from "@nestjs/testing";

describe("SolicitationsController", () => {
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [],
    }).compile();
  });

  describe("findAll", () => {
    it("should return an array of solicitations", async () => {
      expect(1).toEqual(1);
    });
  });
});
