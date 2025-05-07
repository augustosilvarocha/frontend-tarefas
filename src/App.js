import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListaTarefas from './componentes/lista-tarefa';
import CriarTarefa from './componentes/criar-tarefa';
import EditarTarefa from './componentes/editar-tarefa';
import {Link} from 'react-router-dom';
import ExcluirTarefa from './componentes/deletar-tarefa';
import './App.css'
import './componentes/lista-tarefa.css'

function App() {
  return (
    <Router>
      <div className="tarefas">
        <div className="header">
          <Link to="/" h1 className='h1-header'><h1 className='h1-header'>Gerenciador de Tarefas</h1></Link>
          <button className='button-nova-tarefa'><Link to="/criar" className='link'>Criar tarefa</Link></button>
        </div>
        <Routes>
          <Route exact path="/" element={<ListaTarefas />} />
          <Route path="/criar" element={<CriarTarefa />} />
          <Route path="/editar/:id" element={<EditarTarefa />} />
          <Route path="/excluir/:id" element={<ExcluirTarefa />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;