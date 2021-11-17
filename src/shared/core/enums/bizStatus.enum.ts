export enum BizCapitalStatusEnum {
    REJECTED = 'REJECTED',// Rejeitado
    DENIED = 'DENIED', // Negado
    WAITING_LIST = 'WAITING_LIST', 
    // Fila de Espera - Recebemos grande número de pedidos, assim que 
    // possível retornaremos de acordo com a ordem da fila de espera
    RECEIVED = 'RECEIVED', // Recebido (Pedido em análise)
    AWAITING = 'AWAITING', // Aprovado e aguardando aceite da oferta
    IN_ANALYSIS = 'IN_ANALYSIS', // Em análise (Oferta já enviada e aceita)
    DOCUMENTS_PENDING = 'DOCUMENTS_PENDING', // Aguardando o envio da documentação
    SIGNATURE_PENDING = 'SIGNATURE_PENDING', //Aguardando a assinatura do contrato
    APPROVED = 'APPROVED' // Empréstimo aprovado
  }
  