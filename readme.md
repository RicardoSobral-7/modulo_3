# App

Gympass Style App

## RFs (requisitos funcionais)

- [ ] Cadastrar usuários
- [ ] Autenticar usuários
- [ ] Obter perfil do usuário
- [ ] Obter números de check-ins realizados 
- [ ] Obter histórico de check-in
- [ ] Buscar academias próximas
- [ ] Buscar academias pelo nome
- [ ] Realizar check-in em uma academia
- [ ] Validar o check-in de usuário
- [ ] Cadastrar uma academia

## RNs (requisitos de negócio)

- [ ] Usuário não pode se cadastrar com email duplicado
- [ ] Usuário não pode fazer 2 check-ins no mesmo dia
- [ ] Usuário não pode fazer check-in se não estiver a 100m da academia
- [ ] Check-ins só pode ser validado até 20 min após solicitado
- [ ] Check-ins só pode ser validado por administradores
- [ ] A academia só pode ser cadastrado por outro administradores
- [ ] 

## RNFs (requisitos não-funcionais)
- [ ] Senha do usuário deve estar criptografada
- [ ] Os dados da aplicação deve estar persistidos em banco postgreSQL
- [ ] Todas as listas de dados devem estar páginadas por 20 itens na página
- [ ] O usuário deve ser identificado por um JWT (JSON web token)
