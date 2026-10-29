# Back-End — Estacionamento

## Requisitos
- Node.js instalado
- MySQL em execução

## 1. Criar o banco
No MySQL Workbench ou terminal, execute:
```sql
CREATE DATABASE estacionamento;
```

## 2. Configurar acesso
Copie `.env.example` para `.env` e ajuste `DB_USER` e `DB_PASSWORD` para o seu MySQL.
O arquivo `.env` não deve ser enviado publicamente.

## 3. Instalar e iniciar
```bash
npm install
npm run dev
```
A API estará em `http://localhost:8081`.

## Rotas
| Método | Rota | Função |
|---|---|---|
| GET | /proprietario | Lista proprietários |
| GET | /proprietario/:id | Busca proprietário |
| POST | /proprietario | Cadastra proprietário |
| PUT | /proprietario/:id | Altera proprietário |
| DELETE | /proprietario/:id | Exclui proprietário |
| GET | /veiculo | Lista veículos |
| GET | /veiculo/:id | Busca veículo |
| POST | /veiculo | Cadastra veículo |
| PUT | /veiculo/:id | Altera veículo |
| DELETE | /veiculo/:id | Exclui veículo |

A associação usa `fk_proprietario`. Para evitar perda de dados, um proprietário com veículos vinculados não é excluído; exclua ou reassocie os veículos primeiro.
