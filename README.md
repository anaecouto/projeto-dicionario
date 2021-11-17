
# BAN-API #

Este boilerplate tem como objetivo implementar uma arquitetura voltada para o Domain-Driven Desing, ou DDD para os mais próximos.

## Comandos da aplicação ##

`yarn start:dev` - para iniciar o ambiente de dev observando mudanças nos arquivos
`yarn build` - limpa a pasta dist e transpila o código
`yarn start:prod` - inicia o projeto para ambiente de produção
`yarn migration:generate <nome da migration>` - gera uma nova migration automaticamente, de acordo com as entidades cadastradas
`yarn migration:create <nome da migration>` - gera uma nova migration vazia
`yarn migration:revert` - reverter ultima migration realizada
`yarn migration:show` - mostra o status da migrations
`yarn migration:run` - executa todas as migrations pendentes

## Como testar o que já existe ##

A aplicação foi construídas com uma rota para que possa testar e verificar o fluxo da aplicação.

Para executar o teste, faça o seguinte:

1. execute o comando `yarn`
2. execute o comando `yarn build`
3. execute o camando `yarn migration:generate Teste` (um banco SQLite em memória será criado pelo TypeORM)
4. execute o comando `yarn build` novamente
5. execute o comando `yarn migration:run`
6. execute o comando `yarn start:dev` e aplicação será disponibilizada no `http://localhost:3000`
7. faça uma requisição `POST` no endereço `http://localhost:3000/messages/new`, com um corpo similar:

   ```json
      {
        "sender": "nome",
        "messages": [
          "um",
          "dois",
          "tres..."
        ]
      }
   ```

Dessa forma um novo `sender` será cadastrado, com mensagens para ele, além disso será emitido um evento mock que está sendo escutado por outro domínio

## TODOs ##

- [ ] Configurar o debugger
- [ ] Adicionar exemplos de testes
- [ ] Adicionar exemplo de service
- [ ] Adicionar exemplo de provider
- [ ] Finalizar o exemplo de getMessages

## Pontos importantes de serem alterados/revisados ao iniciar um novo projeto ##

- UniqueEntityID -> verificar se a aplicação utilizará UUID, se não deve trocar a forma de criação de ID, ou se for usar mais de uma, adiciona-lá
- Conexão do banco -> a aplicação possui um banco SQLITE para exemplo, então não há problemas de apagar o arquivo da raiz e subsituir as configs do typeORM
- A entidades do TypeOrm devem ser importadas no shared para serem usadas em todos os módulos

Como o DDD pode ser um pouco complicado segue um glossário para explicar melhor o que cada coisa no DDD significa, e como deve ser utilizada.

> As descrições abaixo, foram retiradas do artigo [An introduction do Domain-Driven Design](https://khalilstemmler.com/articles/domain-driven-design-intro/)

## [Domain Entities](https://khalilstemmler.com/articles/typescript-domain-driven-design/entities/), ou Entity ##

> Entidades devem ser o primeiro lugar em que pensamos em colocar regras de negócio

As entidades são Objetos de domínimo que queremos identificar unicamente devem e devem expressar o que um modelo:

* Pode fazer
* Quando pode fazer
* Quais condições devem ser satisfeitas para realizar uma ação

Elas são coisas como: `CartItem`, `User`, `Debit`...
Entidades podem ser convertidas para camada de persistencia, por meio de mapper, criando um registro em forma de banco de dados.

As vezes pode não fazer sentido colocar uma certa lógica dentro de uma Entity, para isso, temos um outro artefato chamado *Domain Services*.

> Um Domain Service não deve ser confundido com um Application Service / UseCase, o Domain service, pode conhecer apenas entitidades da camada de domínio. 
> Enquanto que o Application Service pode conversar com outras camadas, preferencialmente por interfaces, por exemplo, banco de dados, apis externas...

## [Value Objects](https://khalilstemmler.com/articles/typescript-value-object/) ##

São objetos que não possuem um identificador. Eles são _atributos_ de uma Entity.

Pense em Value Objects como:

* `Name` é um Value Object de um `User`
* `CartStatus` é um Value Object de um `Cart`
* `CardNumber` é um Value Objetct de um `PersonCard`

Eles possuem pequenos comportamentos, limitados a seu escopo. Por exemplo, um Value Object de `Email` pode saber como se validar.
Ou então, um Value Object de `CPF` pode saber remover e colocar máscaras.
Value Objects podem até mesmo validar sua criação, vamos supor que temos a seguinte regra: "um nome de usuário não pode conter números".
Para resover isso podemos ter o seguinte código:

```js
interface UserNameProps {
  name: string
}

class UserName extends ValueObject<UserNameProps> {

  get name (): string {
    return this.props.name;
  }

  private constructor (props: UserProps) {
    super(props);
  }

  private static hasNumber(name: string){
    // implementação...
  }

  static create(name: string): UserName{
    if(this.hasNumber(name)){
      throw Error('Nome não pode conter número');
    }

    return new UserName({ name });
  }
}
```

Dessa forma, utilizando o pattern de `Factory Method`, garantimos que sejam criados apenas objetos válidos, e não precisamos mais de preocupar com essa validação toda vez que criarmos um usuário por exemplo.

Além disso, os ValueObjects também trazem o benefício da clareza, afinal, qualquer desenvolvedor que ver que `User` precisa de um `UserName` para ser criado, ou invés de uma `string`, já sabe exatamente do que se trata.

## Aggregate ##

> Um "aggregate" é um grupo de objetos associados que tratamos como uma única unidade para propósito de alteração de dados." - Eric Evans.

Como já descrito pelo próprio autor do DDD, Aggregates é um conjunto de entidades que fazem sentido juntas. Ele pode conter regras de negócio.

Um bom exemplo de Aggregate seria uma entidade de `Cart` que possui `CartItems`, os `CartItems` _pertencem_ a um `Cart`.

Um Aggregate pode ser criado para satisfazer as seguintes condições:

* Prover informações suficientes para garantir que o modelo permaneça confiável (sem alterações externas)
* Executar casos de usos
* Garantir uma performace decente nos bancos de dados
* Prover informações suficientes para transaforma uma Domain Entity em um DTO

Aggregates devem seguir as seguintes para serem os mais confiáveis e estáveis possível:

* Entidades dentro de um Aggregate não devem ser referenciadas fora dele, assim garantimos a consistências das informações e apenas um ponto de verdade
* Ao ser recuperado da camada de persistencia, um Aggregate deve ser montado complementamente (isso pode ser atingido utilizando Mappers na camada de persistencia)
  
Para definir Aggregates, é necessário estabelecer os limites dele, com base no negócio que está sendo utilizado

## Domain Services ##

Este é responsável por cuidar de lógicas de negócio, que não pertencem claramente a nenhuma entidade em específico, ou talvez pareça pertencer a duas entidades ao mesmo tempo

> Domain Services são normalmente executandos pela camada de aplicação, por meio de UseCases / ApplicationServices.
> Já que os Domain Services são parte da Camada de Domínio, eles devem obedecer a [Regra de dependencia](https://khalilstemmler.com/wiki/dependency-rule/), e não podem depender de nada que refere-se outra camada, como Repositories para acessar as Domain Entities que ele interage.
> Tendo isso em mente, o UseCase é responsavel por buscar as Domain Entities que o Domain Service necessita.

Para ter isso mais claro, pense no seguinte exemplo:

```ts
//.../domain/domainServices/vipAccountService.ts
export class VipAccountService {
  // dado um usuário já existente, valide se o usuário pode ter uma conta vip
  // se estiver valido crie a conta
  createVip(user: User): VipAccount{
    
    if(!user.isEmailVerified()){
      throw new Error('User is not verified')
    }

    // outras validações

    return VipAccount.crete();
  }
}

//.../useCases/createAccount/createAccount.ts
export class CreateVipAccountService {
  constructor(
    private vipAccountService: VipAccountService,
    private vipAccountRepo: IVipAccountRepo,
    private userRepo: IUserRepo,
  ){}

  private convertVipAccounttoDTO(vipAccount: VipAccount){
    // converte
  }

  execute(dto: CreateVipAccountDTO){

    const user: User = this.userRepo.findByEmail(dto.email);

    const vipAccount: VipAccount = this.vipAccountService.createVip(user);

    await this.vipAccountRepo.save(vipAccount);

    return this.convertVipAccounttoDTO(vipAccount);
  }
}


```

## [Domain Events](https://khalilstemmler.com/articles/typescript-domain-driven-design/chain-business-logic-domain-events/) ##

Domain Events são simplemente objetos que definem algum evento que ocorre no domínio e tem alguma importancia para todos os os domínios da aplicação.

Eles ajudam a desacoplar a aplicação, diminuir (muito) os códigos procedurais e escrever regras de negócio complexar com mais facilidade.

Domain Events fazem uso do `Observer Pattern` entregar os eventos, ao objeto que deseja escutá-lo.

Este é um fluxo de um Domain Event em nossa aplicação:

1. Um Aggregate adiciona um novo evento a sua instancia, e informa a classe `DomainEvents`, que ele deve ser disparado quando a transação for concluída. (Por exemplo, um evento de novo usuário, pode se chamar `UserCreatedEvent`) 
2. Quem define se uma transação foi concluída? No nosso caso, quando a entidade for persistida no banco ela é considerada como "Completa". Então, ao persistir no banco, o `Hook` da camada de persistencia, informa ao `DomainEvents` que a transação foi concluída e que ele pode disparar os eventos relacionados a entidade salva.
3. Depois que `DomainEvents` dispara os eventos, podemos possuir vários `listeners` que escutam esse evento, e reagem de acordo com sua regra. Ou seja, no nosso exemplo de `UserCreatedEvent`, poderíamos ter uma `listener` `SendWelcomeEmail` e ao escutar o evento, esse `listener` faria o envio de um email de boas vindas.

## UseCases ##

Estes são o ponto de entrada para que as regras de negócio possam ser chamadas, na Clean Arquitecture, esse artefato é chamado de `service`.

Normalmente, ele recebe um DTO e trabalha chamando a Entity ou Aggregate que pode resolver a regra de negócio.

Ele serve para fazer um vínculo entre camadas, ele conhece a camada de domínio (muitas vezes por meio de concreções), e conhece a camada de infra por meio de interfaces.

Um caso de uso não deve conter regras de negócio, mas pode conter validações, por exemplo, o caso de uso `CreateUser` pode ter a seguinte estrutura:

```ts

//.../useCases/createUser/creatUser.ts
export class CreateUser {
  constructor(
    private userRepo: IUserRepo,
  ){}

  execute(dto: CreateUserDTO){

    const foundUser: User = this.userRepo.findByEmail(dto.email);

    if(foundUser){
      throw new Error('Já existe um usuário cadastrado com este email')
    }

    const email = Email.create({ value: dto.email });
    const password = Password.create({ value: dto.password });

    const user = User.create({ email: email, password: password});

    await this.userRepo.save(user);
  }
}
```

## Providers ##

Todos os serviços externos a aplicação, por exemplo, uma consulta de boleto.

Estes devem ser preferencialmente criados a partir de uma interface, para evitar um alto acoplamento quando for utilizado na camada de aplicação.
