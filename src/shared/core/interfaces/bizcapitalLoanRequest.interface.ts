interface IBizCapitalLoanRequest {
    amountRequested: number,
    loanUse: string,
    detailedLoanUse: string,
    borrower: {
      applicantName: string,
      applicantCpf: string,
      cnpj: string,
      monthlyRevenue: string,
      phone: string,
      affiliation: string,
      email: string
    },
    tracking: {
      optInIp: string,
      trackers: string,
      sessionId: string
    },
    optInDate: string,
    utmCampaign: string,
    utmMedium: string,
    utmTerm: string,
}