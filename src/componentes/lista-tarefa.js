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
                {tarefas.map(tarefa =>(
                    <li key={tarefa.id}>{tarefa.nome}</li>
                    
                ))}
            </ul>
        </div>
    );
}
export default ListaTarefas;