import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

function ExcluirTarefa() {
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        axios.delete(`http://localhost:8000/api/tarefa/${id}/`)
            .then(() => {
                alert("Tarefa excluída com sucesso!");
                history.push('/tarefas');
            })
            .catch(erro => {
                console.error("Erro ao excluir tarefa:", erro);
                alert("Erro ao excluir tarefa.");
            });
    }, [id, history]);

    return <p>Excluindo tarefa...</p>;
}

export default ExcluirTarefa;
