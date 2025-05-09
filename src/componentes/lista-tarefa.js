import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './lista-tarefa.css';

function ListaTarefas() {
    const [tarefas, setTarefas] = useState([]);
    const [filtroPrioridade, setFiltroPrioridade] = useState('');

    useEffect(() => {
        const url = filtroPrioridade
            ? `http://localhost:8000/api/tarefa/?prioridade=${filtroPrioridade}`
            : 'http://localhost:8000/api/tarefa/';
        axios.get(url)
            .then(res => setTarefas(res.data))
            .catch(err => console.error("Não foi possível buscar tarefas: ", err));
    }, [filtroPrioridade]);

    const handleLegendaClick = (prioridade) => {
        if (prioridade !== filtroPrioridade) {
            setFiltroPrioridade(prioridade);
        } else {
            setFiltroPrioridade('');
        }
    };

    return (
        <div className='container'>
            <button className='button-nova-tarefa'>
                <Link to="/criar" className='link'>Criar nova tarefa</Link>
            </button>
            <h2 className="h1">Todas as Tarefas</h2>

            <div className="legenda-status">
                <strong>Filtrar por Prioridade</strong>
                <ul>
                    <li
                        className={`cor-concluida ${filtroPrioridade === 'baixa' ? 'filtro-ativo' : ''}`}
                        onClick={() => handleLegendaClick('baixa')}
                    >
                        Baixa
                    </li>
                    <li
                        className={`cor-em-andamento ${filtroPrioridade === 'media' ? 'filtro-ativo' : ''}`}
                        onClick={() => handleLegendaClick('media')}
                    >
                        Média
                    </li>
                    <li
                        className={`cor-pendente ${filtroPrioridade === 'alta' ? 'filtro-ativo' : ''}`}
                        onClick={() => handleLegendaClick('alta')}
                    >
                        Alta
                    </li>
                    <li
                        className={`cor-todas ${filtroPrioridade === '' ? 'filtro-ativo' : ''}`}
                        onClick={() => handleLegendaClick('')}
                    >
                        Todas
                    </li>
                </ul>
            </div>

            <ul className='tarefa'>
                {tarefas.map(tarefa => (
                    <li key={tarefa.id}
                        className={`tarefa-item 
                            ${tarefa.status === 'concluido' ? 'concluida' : tarefa.status === 'em_andamento' ? 'em-andamento' : 'pendente'} 
                            ${tarefa.prioridade === 'alta' ? 'prioridade-alta' : tarefa.prioridade === 'media' ? 'prioridade-media' : 'prioridade-baixa'}`}
                    >
                        <span><strong>Nome:</strong> {tarefa.nome}</span>
                        <span><strong>Responsável:</strong> {tarefa.responsavel}</span>
                        <span>
                            <strong>Prazo:</strong> {new Date(tarefa.prazo).toLocaleString('pt-BR', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </span>
                        <span><strong>Prioridade:</strong> {tarefa.prioridade}</span>
                        <span>
                            <strong>Status:</strong>
                            {tarefa.status === 'concluido' ? ' Concluída' : tarefa.status === 'em_andamento' ? ' Em andamento' : ' Não iniciada'}
                        </span>
                        <span><strong>Observação:</strong> {tarefa.observacao}</span>
                        <div className="div-button">
                            <button className='button-excluir'>
                                <Link to={`/excluir/${tarefa.id}`} className='link'>Deletar</Link>
                            </button>
                            <button className='button-editar'>
                                <Link to={`/editar/${tarefa.id}`} className='link'>Editar</Link>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListaTarefas;
