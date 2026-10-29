# Front-End — Estacionamento Mobile

## Instalar
```bash
npm install
npx expo install --fix
npm start
```

## Configurar o endereço da API
Edite `constants/api.ts`:
- Android Emulator: `http://10.0.2.2:8081`
- iOS Simulator: `http://localhost:8081`
- Celular físico: use o IPv4 local do computador, por exemplo `http://192.168.0.15:8081`. Celular e computador devem estar na mesma rede Wi-Fi.

Se o sistema operacional bloquear, permita o acesso do Node.js no Firewall do Windows. Mantenha o Back-End e o MySQL ligados enquanto usa o app.

## Pastas
- `app/`: telas e rotas do Expo Router.
- `components/`: botão e campo reutilizáveis.
- `constants/`: endereço da API e estilos.
- `hooks/`: operações de consulta, cadastro, edição e exclusão.

O endereço de API pode precisar de ajuste conforme o dispositivo usado. O projeto deve ser instalado e testado no ambiente local antes da entrega.
