interface IMultiplikeRequestInterface {
  name: string;
  email: string;
  phone: string;
  fiveBiggestCustomers: [
    {
      name: string;
      phone: string;
    }
  ];
  partnersAndSpousesPhones: [
    {
      name: string;
      phone: string;
    }
  ];
  bankDetails: {
    ag: string;
    cc: string;
    type: string; //corrente, poupança
    bank: string;
    cpf: string;
  };
  form: [
    {
      partnerName: string;
      limitAmount: number;
      takenAmount: number;
    }
  ];
}
