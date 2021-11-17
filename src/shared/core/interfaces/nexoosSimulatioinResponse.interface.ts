interface INexoosSimulationResponse {
  data: {
    id: number;
    type: string;
    attributes: {
      pre_approved_value: number;
      max_approved_value: number;
      installment_value: number;
      percentual_cet: number;
      percentual_interest: number;
    };
  };
}
