import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListaTarefas from './componentes/lista-tarefa';
import CriarTarefa from './componentes/criar-tarefa';
import EditarTarefa from './componentes/editar-tarefa';
import ExcluirTarefa from './componentes/deletar-tarefa';

function App() {
  return (
    <Router>
      <div className="tarefas">
        <h1>Gerenciador de Tarefas</h1>
        <Switch>
          <Route exact path="/" component={ListaTarefas} />
          <Route path="/criar" component={CriarTarefa} />
          <Route path="/editar/:id" component={EditarTarefa} />
          <Route path="/excluir/:id" component={ExcluirTarefa} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
