import React, { useState } from 'react';
import { CAMPOS } from './campos';
import axios from 'axios';
import './form.css'

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
        <div className="container">
            <h2 className="titulo">Criar Nova Tarefa</h2>
            <form className="form" onSubmit={enviarFormulario}>
                <input
                    type="text"
                    name="nome"
                    placeholder="Nome"
                    value={dadosFormulario.nome}
                    onChange={atualizarCampo}
                    className="input"
                />
    
                <input
                    type="text"
                    name="responsavel"
                    placeholder="Responsável"
                    value={dadosFormulario.responsavel}
                    onChange={atualizarCampo}
                    className="input"
                />
    
                <input
                    type="datetime-local"
                    name="prazo"
                    value={dadosFormulario.prazo}
                    onChange={atualizarCampo}
                    className="input"
                />
    
                <label className="label">Prioridade:</label>
                <select
                    name="prioridade"
                    value={dadosFormulario.prioridade}
                    onChange={atualizarCampo}
                    className="select"
                >
                    <option value="baixa">Baixa</option>
                    <option value="media">Média</option>
                    <option value="alta">Alta</option>
                </select>
    
                <label className="label">Status:</label>
                <select
                    name="status"
                    value={dadosFormulario.status}
                    onChange={atualizarCampo}
                    className="select"
                >
                    <option value="nao_iniciado">Não Iniciado</option>
                    <option value="em_andamento">Em Andamento</option>
                    <option value="concluido">Concluído</option>
                </select>
    
                <button type="submit" className="button">Criar Tarefa</button>
            </form>
        </div>
    );
}

export default CriarTarefa;
