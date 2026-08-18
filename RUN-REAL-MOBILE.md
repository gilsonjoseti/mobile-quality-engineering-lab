# Run real de qualidade mobile

Este guia descreve como preparar e executar um fluxo real de qualidade mobile com Appium, emulador Android e geração de artefatos de evidência.

## 1) Preparar o APK

1. Gere ou obtenha um APK de teste válido para o app alvo.
2. Coloque o arquivo em uma pasta de artefatos do projeto, por exemplo:
   - apps/demo-finance.apk
3. Configure as variáveis de ambiente:

```powershell
$env:PLATFORM = 'android'
$env:APP_PATH = './apps/demo-finance.apk'
$env:APP_PACKAGE = 'com.example.financeapp'
$env:APP_ACTIVITY = '.MainActivity'
$env:DEVICE_NAME = 'Pixel_5_Emulator'
```

4. Valide que o arquivo existe:

```powershell
Test-Path .\apps\demo-finance.apk
```

## 2) Preparar o ambiente Android

1. Instale Android Studio.
2. Configure ANDROID_HOME e adb.
3. Crie ou selecione um emulador Android no AVD Manager.

Exemplo:

```powershell
$env:ANDROID_HOME = 'C:\Users\<your-user>\AppData\Local\Android\Sdk'
$env:JAVA_HOME = 'C:\Program Files\Java\jdk-17'
```

## 3) Iniciar o emulador

```powershell
npm run emulator:start
```

Ou, se preferir iniciar manualmente:

```powershell
& "$env:ANDROID_HOME\emulator\emulator.exe" -avd Pixel_5_Emulator
```

Espere o emulador ficar pronto antes de continuar.

## 4) Iniciar o Appium

Instale o Appium CLI e o driver UiAutomator2:

```powershell
npx appium --version
appium driver install uiautomator2
```

Em seguida, inicie o servidor:

```powershell
npm run appium:start
```

Ou manualmente:

```powershell
appium --port 4723
```

Verifique se o endpoint estiver disponível:

```powershell
Invoke-WebRequest http://localhost:4723/status
```

## 5) Rodar a suíte real

Depois de o emulador e o Appium estarem prontos:

```powershell
npm run test:smoke
```

Se o objetivo for validar cobertura mais ampla:

```powershell
npm run test:api
npm run test:coverage -- --run
```

## 6) Gerar artefatos finais

```powershell
node scripts/generate-report.js
```

Artefatos importantes serão gerados em:

- reports/quality-summary.json
- reports/quality-summary.html
- reports/artifacts/
- reports/screenshots/
- reports/logs/

## 7) Checklist profissional de run real

- APK real disponível
- emulador inicializado com status pronto
- Appium respondendo em http://localhost:4723/wd/hub
- plataforma configurada corretamente
- testes executados
- relatórios e evidências publicados
- decision record e release evidence arquivados

## 8) Observação importante

Em Windows, a execução real de iOS requer macOS ou device farm real. Este projeto já conta com a estratégia e a arquitetura para esse cenário, mas a execução local de iOS não é viável diretamente em Windows.
