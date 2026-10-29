# Sistema de Estacionamento — leia antes de executar

Este pacote contém `backend/` (API Node.js/Express/Sequelize/MySQL) e `frontend/` (Expo/React Native).

## Ordem de execução
1. Instale Node.js e MySQL.
2. Crie o banco: `CREATE DATABASE estacionamento;`
3. Entre na pasta `backend`, copie `.env.example` para `.env`, ajuste usuário/senha do MySQL e execute `npm install` e `npm run dev`.
4. Confira no navegador `http://localhost:8081`. Deve aparecer uma mensagem de API funcionando.
5. Entre na pasta `frontend`, execute `npm install` e `npm start`.
6. Ajuste `frontend/constants/api.ts` se for usar celular físico ou outro ambiente.
7. Cadastre um proprietário antes de cadastrar um veículo.

## Importante
- O projeto foi montado a partir da estrutura e dos recursos descritos no material de apoio, mas deve ser executado no seu computador para confirmar compatibilidade e produzir capturas de tela reais.
- Não envie `node_modules` no ZIP.
- Não invente evidências: abra o aplicativo, teste GET/POST/PUT/DELETE e insira as capturas reais no documento de entrega.
