
# SRC #

Esté o ponto de entrada da aplicação, e, salvo necessidades específicas, não deve conter outras pastas ou arquivos além dos seguintes:

## config ##

Pasta onde ficarão armazenadas as configurações da aplicação, por exemplo, alguma chave de api, ou url de conexão. Ela não substitui o `.env`, podendo ser usada em conjunto com element

## modules ##

Pasta responsável por conter os módulos da aplicação, sendo idealmente cada módula uma representação de um *Bounded Context*.

## shared ##

Contém arquivos que não pertencem exclusivamente a nenhum contexto específico.

---

## app.module.ts ##

Arquivo gerado pelo nest para unir os módulos que serão lidos na aplicação de

## main.ts ##

Arquivo de entrada da aplicação ("Entry Point")
