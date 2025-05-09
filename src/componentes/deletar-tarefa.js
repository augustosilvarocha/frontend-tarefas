import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ExcluirTarefa() {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.delete(`http://localhost:8000/api/tarefa/${id}/`)
            .then(() => {
                alert("Tarefa excluída com sucesso!");
                navigate('/');
            })
            .catch(erro => {
                console.error("Erro ao excluir tarefa:", erro);
            });
    }, [id, navigate]);

    return <p>Excluindo tarefa...</p>;
}

export default ExcluirTarefa;
