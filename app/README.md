# Task Manager - Offline First Application

Um aplicativo de gerenciamento de tarefas construído com **React**, **Zustand** e **Dexie**, implementando o conceito **Offline First**. As tarefas são persistidas localmente no navegador e podem ser sincronizadas com um servidor quando conectado à internet.

## 🎯 Conceito Offline First

**Offline First** é uma arquitetura que prioriza a experiência do usuário em cenários de conectividade instável. Os dados são salvos **localmente primeiro** no dispositivo do usuário, garantindo que:

- ✅ O aplicativo funciona sem conexão com a internet
- ✅ As operações são instantâneas (sem latência de rede)
- ✅ Os dados não são perdidos
- ✅ Sincronização automática quando a conexão é restabelecida

### Fluxo de Funcionamento

```
Usuario cria tarefa (offline)
    ↓
Zustand action disparada
    ↓
Dexie persiste no IndexedDB
    ↓
UI atualiza imediatamente
    ↓
Timer verifica conectividade (a cada 2 min)
    ↓
Se online → sincroniza com servidor
    ↓
Marca tarefa como sincronizada (wasSync: true)
    ↓
Próximo ciclo
```

## 🛠️ Stack Tecnológico

### Core Framework
- **React 19.2.0** - Biblioteca UI para construir interfaces reativas
- **Vite** - Build tool rápido com suporte a HMR

### State Management
- **Zustand 5.0.10** - Gerenciamento de estado leve e simples
  - Alternativa minimalista ao Redux
  - API intuitiva baseada em hooks
  - Excelente para projetos pequenos a médios

### Persistência & Banco de Dados
- **Dexie 4.2.1** - Wrapper elegante para IndexedDB
  - Acesso local aos dados sem servidor
  - Operações síncronas com API assíncrona
  - Suporte a queries e índices
  - Ideal para aplicações offline-first

- **dexie-react-hooks 4.2.0** - React hooks para Dexie
  - Integração seamless entre Dexie e React
  - Componentes reagem automaticamente a mudanças no BD

### Formulários & Validação
- **react-hook-form 7.71.1** - Gerenciamento eficiente de formulários
  - Renderização mínima
  - Validação em tempo real
  
- **yup 1.7.1** - Validação de schema
  - Validação declarativa
  - Mensagens de erro customizáveis

### UI Components
- **Material-UI (MUI) 7.3.7** - Biblioteca de componentes design profissional
  - Card, Grid, Typography, etc.
  - Tema customizável

- **@emotion/react & @emotion/styled 11.14.0** - CSS-in-JS para estilização
  - Suporte a SSR
  - Scoping automático de estilos

### Requisições HTTP & Data Fetching
- **axios 1.13.2** - Cliente HTTP para requisições ao servidor
  - Interceptadores para autenticação
  - Tratamento de erros robusto
  
## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── task/
│   │   ├── index.tsx          # Formulário para adicionar tarefas
│   │   ├── item.tsx           # Componente de item de tarefa
│   │   └── counter.jsx        # Contador de tarefas
│   └── footer/
│       └── index.tsx          # Footer do aplicativo
├── store/
│   └── task.ts                # Zustand store com persistência Dexie
├── db/
│   └── database.ts            # Configuração do Dexie
├── App.jsx                    # Componente raiz
└── main.jsx                   # Entry point
```

## 🚀 Como Usar

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Abre a aplicação em `http://localhost:5173` com HMR habilitado.

### Build para Produção

```bash
npm run build
```

Gera uma versão otimizada em `dist/`.

## 💾 Fluxo de Dados

### 1. **Criar Tarefa**
```
Input do usuário
  ↓
useTaskStore.addTask()
  ↓
await db.tasks.add(newTask)
  ↓
Zustand update do estado
  ↓
React renderiza UI
```

### 2. **Editar Tarefa**
```
useTaskStore.editTask(id, text)
  ↓
await db.tasks.update(id, { text })
  ↓
Estado atualizado
  ↓
UI reflete a mudança
```

### 3. **Deletar Tarefa**
```
useTaskStore.removeTask(id)
  ↓
await db.tasks.delete(id)
  ↓
Estado atualizado
  ↓
Tarefa removida da UI
```

### 4. **Sincronização com Servidor** (Futuro)
```
Timer verifica: navigator.onLine
  ↓
Se true: envia tarefas com wasSync = false
  ↓
Servidor processa e retorna confirmação
  ↓
useTaskStore.updateWasSync(id, true)
  ↓
Dexie atualiza registro
```

## 🔐 Propriedades de uma Tarefa

```typescript
type Task = {
  id: string | number;           // Identificador único (timestamp)
  text: string;                  // Texto da tarefa
  wasSync: boolean;              // Flag para sincronização com servidor
};
```

## 🎨 Recursos

- ✅ CRUD completo de tarefas (Create, Read, Update, Delete)
- ✅ Persistência automática no navegador (IndexedDB)
- ✅ Interface responsiva com Material-UI
- ✅ Validação de formulários com react-hook-form
- ✅ Suporte offline nativo
- ✅ Pronto para sincronização com backend

## 📚 Próximos Passos

Para expandir este projeto:

1. **Backend API** - Criar endpoints para sincronização
2. **dexie-react-hooks** - Explorar dexie hooks com live query
2. **PWA** - Configurar aplição para suportar PWA

## 🔗 Recursos Úteis

- [Dexie Documentation](https://dexie.org/)
- [Zustand GitHub](https://github.com/pmndrs/zustand)
- [Offline First Manifesto](https://offlinefirst.org/)
- [Material-UI Docs](https://mui.com/)
