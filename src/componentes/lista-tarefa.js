import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ListaTarefas(){
    const [tarefas, setTarefas] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/tarefa/')
            .then(res => setTarefas(res.data))
            .catch(err => console.error("Não foi possível buscar tarefas: ",err));
    },[]);
    return (
        <div>
            <h2>Lista de Tarefas</h2>
            <ul>
            {tarefas.map(tarefa => (
                <li key={tarefa.id}>
                <strong>Nome:</strong> {tarefa.nome}<br />
                <strong>Responsável:</strong> {tarefa.responsavel}<br />
                <strong>Prazo:</strong> {tarefa.prazo}<br />
                <strong>Prioridade:</strong> {tarefa.prioridade}<br />
                <strong>Status:</strong> {tarefa.status}
                <hr />
                </li>
            ))}
            </ul>
        </div>
    );
}
export default ListaTarefas;