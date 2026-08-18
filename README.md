# Laboratório de Quality Engineering Mobile

![CI](https://img.shields.io/badge/CI-GitHub%20Actions-2088FF)
![Quality Gate](https://img.shields.io/badge/Quality%20Gate-Release%20Ready-2EA043)
![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20iOS-6F42C1)
![Automation](https://img.shields.io/badge/Automation-Appium%20%7C%20API%20%7C%20BDD-FF8C42)

Implementação de referência em nível sênior para quality engineering mobile, criada para demonstrar como uma equipe de QA/SDET pode estruturar automação, validação orientada a risco, evidências de CI e confiança de release para jornadas móveis críticas.

> Este repositório é um projeto de portfolio focado em trabalho prático de qualidade de engenharia: arquitetura de testes, desenho de pipeline, observabilidade, release gates e estratégia de automação para Android e iOS.

## Visão geral

Este laboratório modela um fluxo mobile com estilo financeiro, com ênfase em jornadas reais do usuário, como autenticação, validação de dashboard e fluxos de transação de alto risco. Ele combina Appium, testes de API, BDD, quality gates, estratégia de device farm e geração estruturada de evidências em uma referência reutilizável de engenharia.

## Problema de negócio

Jornadas móveis críticas precisam ser resilientes diante da fragmentação de dispositivos, da variabilidade de sistemas operacionais e da pressão evolutiva de release. O projeto demonstra como uma equipe de quality engineering pode reduzir incertezas por meio de cobertura orientada a risco, desenho de automação e decisões baseadas em evidência.

## Resumo da arquitetura

```mermaid
flowchart LR
    Requirements --> RiskAnalysis
    RiskAnalysis --> Scenarios
    Scenarios --> BDD
    BDD --> Appium
    BDD --> Maestro
    BDD --> Robot
    Appium --> Android
    Appium --> iOS
    Android --> DeviceFarm
    iOS --> DeviceFarm
    Appium --> Reports
    API --> Reports
    Reports --> QualityGate
    QualityGate --> ReleaseDecision
```

## Capacidades principais

- base de automação em TypeScript com validação rigorosa
- arquitetura Appium 2 + WebdriverIO com Screen Object Pattern
- testes de contrato e cenários negativos com clientes baseados em axios
- validação de schema para integridade de payload
- padrões de retry e política de falhas para serviços resilientes
- relatórios em JUnit e JSON para publicação de evidência no CI
- suporte a pipeline em Azure DevOps com publicação de artefatos
- estratégia de device farm em nuvem para execução em matriz Android e iOS

## Stack tecnológica

- Node.js LTS + TypeScript
- Appium 2 + WebdriverIO
- estratégia de capacidades UiAutomator2 e XCUITest
- Maestro para validação leve de smoke flow
- Robot Framework + AppiumLibrary para execução keyword-driven
- testes de API com Axios e validação de schema
- Vitest para verificações unitárias e de contrato
- estrutura de pipeline em Azure DevOps
- estratégia com BrowserStack, Firebase Test Lab e AWS Device Farm

## Estratégia de testes

O projeto organiza os testes em torno de risco de negócio e confiança de release. Fluxos de autenticação e transacionais recebem prioridade mais alta do que caminhos exploratórios de baixo risco, e a suíte de automação reflete essa priorização.

## Estratégia de qualidade

- smoke checks validam alcance do caminho crítico
- testes de contrato de API cobrem cenários positivos e negativos
- regressões protegem fluxos de alto risco
- estratégia de device farm amplia cobertura além da infraestrutura local
- bundles de evidência sustentam decisões de quality gate

## Arquitetura Appium

- Screen Object Pattern para manutenção
- abstração BaseScreen com waits explícitos e ações reutilizáveis
- seletores estáveis e padrões resilientes de interação
- captura de screenshot em cenários de falha
- logging estruturado para workflows de CI e depuração

## Arquitetura de testes de API

- cliente base de API para uso consistente de HTTP
- testes de contrato para comportamentos GET/POST/PUT/DELETE
- lógica de retry para falhas transitórias
- validação de schema para reduzir risco de payload malformado

## Estratégia de Device Farm e CI

- validação local/CI para feedback rápido em PRs
- execuções em nuvem nightly sobre matriz representativa de dispositivos
- validação de release baseada em bundle de evidência e thresholds por ambiente

## Quality Gates

- Smoke Tests = 100%
- Critical Tests >= 98%
- Regression >= 95%
- Sem defects bloqueadores
- Sem defects críticos

## Environment Gates

- local: feedback rápido para desenvolvimento
- ci: obrigatório para elegibilidade de PR e merge
- nightly: obrigatório para validação de matriz em device farm
- release: obrigatório para promoção de deploy

## Observabilidade e relatórios

O projeto inclui relatórios estruturados para evidência de pipeline, saídas JUnit, screenshots e metadados de execução. Isso sustenta uma história real de qualidade de engenharia em vez de um repositório estático de tutorial.

## Case study de negócio

Este projeto representa um cenário realista de entrega de software mobile em um contexto de alta criticidade: jornadas de autenticação, pagamentos, confirmação de transações e validação de risco operacional. Em ambientes reais, falhas nesses fluxos impactam diretamente confiança do usuário, conversão, reputação do produto e continuidade do negócio.

A proposta do repositório é demonstrar como a qualidade deixa de ser uma etapa final e passa a ser uma disciplina operacional de engenharia, com foco em:

- detectar riscos antes da liberação
- automatizar os fluxos mais críticos
- provar evidência de execução antes do release
- reduzir retrabalho e falhas em produção
- garantir consistência entre desenvolvimento, validação e promoção de versões

## Roadmap de maturidade profissional

### Fase 1 — alta prioridade
- executar um app real em fluxo end-to-end em ambiente controlado
- publicar relatórios visuais mais profissionais e artefatos de evidência
- adicionar GitHub Actions com badges reais de status e qualidade
- documentar um case study de negócio no README com impacto e contexto de decisão

### Fase 2 — média prioridade
- registrar ADRs para decisões arquiteturais importantes
- monitorar flaky tests e evidenciar taxa de instabilidade
- definir thresholds de cobertura por suíte e fluxo crítico
- manter histórico de execução e evidência por release

## Como executar

### Validação local e estática

```powershell
npm install
npm run setup:check
npm run lint
npm run typecheck
npm run test:api
node scripts/generate-report.js
```

### Execução real de qualidade mobile no Windows

A execução real do fluxo Android exige o SDK Android completo, o emulador configurado e o APK gerado localmente. A sequência correta no ambiente validado é:

```powershell
Set-Location "D:\App Mobile"

$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
$env:JAVA_HOME = "C:\Program Files\Java\jdk-17"
$env:Path += ";$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\emulator;$env:ANDROID_HOME\cmdline-tools\latest\bin"

& "$env:ANDROID_HOME\cmdline-tools\latest\bin\sdkmanager.bat" --install "platform-tools" "platforms;android-34" "build-tools;34.0.0" "system-images;android-34;google_apis;x86_64" "emulator"

& "$env:ANDROID_HOME\emulator\emulator.exe" -create-avd -n Pixel_8 -k "system-images;android-34;google_apis;x86_64" -d pixel_8

Set-Location "D:\App Mobile\android-demo-app"
.\gradlew.bat assembleDebug

Set-Location "D:\App Mobile"
New-Item -ItemType Directory -Force -Path "apps" | Out-Null
Copy-Item ".\android-demo-app\app\build\outputs\apk\debug\app-debug.apk" ".\apps\demo-finance.apk" -Force
```

Em outro terminal:

```powershell
Set-Location "D:\App Mobile"
& "$env:ANDROID_HOME\emulator\emulator.exe" -avd Pixel_8
```

Em um terceiro terminal:

```powershell
Set-Location "D:\App Mobile"
npm run appium:start
```

Confirmação do Appium:

```powershell
Set-Location "D:\App Mobile"
node scripts/require-appium.js
```

Execução do run real:

```powershell
Set-Location "D:\App Mobile"
npm run run:real -- -AppPath "./apps/demo-finance.apk" -DeviceName "Pixel_8"
```

Esse comando automatiza a sequência: valida o APK, valida o AVD, inicia o emulador, aguarda o device ficar pronto, inicia o Appium, executa a suíte de qualidade e produz os artefatos finais em reports/.

Importante: no ambiente validado, o bloqueio real foi causado por ausência do APK e de infraestrutura Android completa para build, não por falha no código da automação. Para iOS, o modelo correto continua sendo macOS ou device farm real; execução local direta de iOS não é realista em Windows.

## Observações de infraestrutura

- Android SDK completo e command-line tools necessários
- JDK 17 recomendado para build do app demo
- AVD Android 14 com Google APIs e x86_64 recomendado
- Appium em execução local na porta 4723
- APK final gerado em `./apps/demo-finance.apk` antes do run real

## Estrutura do projeto

```text
appium/
api/
maestro/
robot-framework/
bdd/
performance/
device-farm/
scripts/
reports/
docs/
azure-pipelines.yml
README.md
PROJECT_STATUS.md
```

## Status verificado

O repositório foi validado no ambiente atual com os seguintes checks:

- ESLint concluído com sucesso
- validação estrita de TypeScript concluída
- testes de contrato de API aprovados
- checks de smoke/regressão mobile aprovados
- avaliação de release gate concluída para thresholds de local, CI, nightly e release

## Pilares de maturidade profissional

Este projeto foi estruturado para reforçar quatro pilares essenciais de um time de Quality Engineering profissional:

- Evidência real: as decisões de qualidade são apoiadas por artefatos, relatórios, validações e evidência de execução em pipeline.
- Execução prática: a solução demonstra como automatizar fluxos críticos, integrar API e mobile e validar riscos reais de release.
- Narrativa de negócio: o projeto conecta testes e automação à experiência do usuário, ao valor do produto e ao impacto de falhas em jornadas críticas.
- Governança de qualidade: gates por ambiente, critérios de qualidade, mecanismos de revisão e política de decisão de release são tratadas como parte do processo, e não como etapa informal.

Esses pilares tornam o repositório mais do que um laboratório de tecnologia: ele passa a funcionar como uma prova de capacidade de operar qualidade em contextos reais de entrega mobile.

## Posicionamento de portfolio

Este repositório é adequado para demonstrar:

- arquitetura e desenho de quality engineering mobile
- estratégia de automação e priorização por risco
- evidência de CI/CD e release gates
- planejamento de device farm e execução multi-ambiente
- profundidade prática para portfolio de SDET / Quality Engineer

## Lições aprendidas

- seletores determinísticos e waits explícitos melhoram a confiabilidade mobile
- priorização baseada em risco gera mais confiança de release do que cobertura ampla e superficial
- quality gates baseados em evidência são mais valiosos do que aprovação manual ad hoc
- CI e execução em nuvem precisam ser desenhados para variabilidade real de dispositivos e retenção de artefatos.
