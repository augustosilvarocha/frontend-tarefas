import React, { useState } from 'react';
import { CAMPOS } from './campos';
import axios from 'axios';

function CriarTarefa() {
    const [dadosFormulario, setDadosFormulario] = useState(CAMPOS);

    const atualizarCampo = (evento) => {
        const { name, value } = evento.target;
        setDadosFormulario(anterior => ({
            ...anterior,
            [name]: value
        }));
    };

    const enviarFormulario = (evento) => {
        evento.preventDefault();
        axios.post('http://localhost:8000/api/tarefa/', dadosFormulario)
            .then(() => {
                alert('Tarefa criada com sucesso!');
                setDadosFormulario(CAMPOS);
            })
            .catch(erro => {
                console.error("Erro ao criar tarefa:", erro);
                alert('Erro ao criar tarefa.');
            });
    };

    return (
        <div>
            <h2>Criar Nova Tarefa</h2>
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

                <button type="submit">Criar Tarefa</button>
            </form>
        </div>
    );
}

export default CriarTarefa;
