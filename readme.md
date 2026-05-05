# App

Gympass Style App

## RFs (requisitos funcionais)

- [x] Cadastrar usuários
- [x] Autenticar usuários
- [x] Obter perfil do usuário
- [x] Obter números de check-ins realizados 
- [x] Obter histórico de check-in
- [ ] Buscar academias próximas até 10 km
- [x] Buscar academias pelo nome
- [x] Realizar check-in em uma academia
- [ ] Validar o check-in de usuário
- [x] Cadastrar uma academia

## RNs (requisitos de negócio)

- [x] Usuário não pode se cadastrar com email duplicado
- [x] Usuário não pode fazer 2 check-ins no mesmo dia
- [x] Usuário não pode fazer check-in se não estiver a 100m da academia
- [ ] Check-ins só pode ser validado até 20 min após solicitado
- [ ] Check-ins só pode ser validado por administradores
- [ ] A academia só pode ser cadastrado por outro administradores
- [ ] 

## RNFs (requisitos não-funcionais)
- [x] Senha do usuário deve estar criptografada
- [x] Os dados da aplicação deve estar persistidos em banco postgreSQL
- [x] Todas as listas de dados devem estar páginadas por 20 itens na página
- [ ] O usuário deve ser identificado por um JWT (JSON web token)
