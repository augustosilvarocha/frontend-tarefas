import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { CAMPOS } from './campos';

function EditarTarefa() {
    const { id } = useParams();
    const history = useHistory();
    const [dadosFormulario, setDadosFormulario] = useState(CAMPOS);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/tarefa/${id}/`)
            .then(response => {
                setDadosFormulario(response.data);
            })
            .catch(erro => {
                console.error("Erro ao carregar tarefa:", erro);
                alert('Erro ao carregar dados para edição.');
            });
    }, [id]);

    const atualizarCampo = (evento) => {
        const { name, value } = evento.target;
        setDadosFormulario(anterior => ({
            ...anterior,
            [name]: value
        }));
    };

    const enviarFormulario = (evento) => {
        evento.preventDefault();
        axios.put(`http://localhost:8000/api/tarefa/${id}/`, dadosFormulario)
            .then(() => {
                alert('Tarefa editada com sucesso!');
                history.push('/tarefas');
            })
            .catch(erro => {
                console.error("Erro ao editar tarefa:", erro);
                alert('Erro ao editar tarefa.');
            });
    };

    return (
        <div>
            <h2>Editar Tarefa</h2>
            <form onSubmit={enviarFormulario}>
                <input
                    type="text"
                    name="nome"
                    placeholder="Nome"
                    value={dadosFormulario.nome}
                    onChange={atualizarCampo}
                /><br />

                <input
                    type="text"
                    name="responsavel"
                    placeholder="Responsável"
                    value={dadosFormulario.responsavel}
                    onChange={atualizarCampo}
                /><br />

                <input
                    type="datetime-local"
                    name="prazo"
                    value={dadosFormulario.prazo}
                    onChange={atualizarCampo}
                /><br />

                <label>Prioridade:</label>
                <select
                    name="prioridade"
                    value={dadosFormulario.prioridade}
                    onChange={atualizarCampo}
                >
                    <option value="baixa">Baixa</option>
                    <option value="media">Média</option>
                    <option value="alta">Alta</option>
                </select><br />

                <label>Status:</label>
                <select
                    name="status"
                    value={dadosFormulario.status}
                    onChange={atualizarCampo}
                >
                    <option value="nao_iniciado">Não Iniciado</option>
                    <option value="em_andamento">Em Andamento</option>
                    <option value="concluido">Concluído</option>
                </select><br />

                <button type="submit">Salvar Alterações</button>
            </form>
        </div>
    );
}

export default EditarTarefa;
