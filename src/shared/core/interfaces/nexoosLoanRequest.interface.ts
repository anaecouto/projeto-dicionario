interface INexoosLoanRequest {
  loan: {
    loan_value: number ,
    loan_term: number ,
    institutional_video_url: string,
    loan_reason: string,
    loan_reason_description: string,
    reason_others: string,
    loan_attachments_attributes: [
      {
        description: string ,
        remote_attachment_url: string,
        attachment: string
      }
    ],
    loan_guarantors_attributes: [
      {
        email: string,
        name: string,
        cpf: string,
        nationality: string,
        address_street: string,
        address_number: string,
        address_complement: string,
        address_neighborhood: string,
        address_zip_code: string,
        address_city: string,
        address_state: string,
        politically_exposed: boolean,
        patrimony: number,
        income: number,
        is_administrator: boolean,
        rg: string,
        rg_issuer: string,
        birth_place: string,
        civil_status: string,
        birthday: string // (dd-mm-yyyy),
        gender: string,
        profession: string,
        phone_number: string,
        percentage: number,
        is_guarantor: true,
        rg_issue_date: string,
        rg_issuer_uf: string,
        mother_name: string,
        father_name: string
      }
    ]
  }
}
