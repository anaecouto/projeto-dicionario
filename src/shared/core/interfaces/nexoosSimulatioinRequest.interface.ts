interface INexoosSimulationRequest {  
    simulation: {
      loan_value: number,
      loan_term: number,
      age: number,
      individual_company: true,
      revenue: true
    }  
}