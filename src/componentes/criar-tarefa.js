import React, { useState } from 'react';
import { CAMPOS } from './campos';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './form.css'

function CriarTarefa() {
    const [dadosFormulario, setDadosFormulario] = useState(CAMPOS);
    const navigate = useNavigate()

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
                navigate('/');
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
                <label className="label">Nome:</label>
                <input
                    type="text"
                    name="nome"
                    placeholder="Nome"
                    value={dadosFormulario.nome}
                    onChange={atualizarCampo}
                    className="input"
                />
                <label className="label">Responsável pela tarefa:</label>
                <input
                    type="text"
                    name="responsavel"
                    placeholder="Responsável"
                    value={dadosFormulario.responsavel}
                    onChange={atualizarCampo}
                    className="input"
                />
                <label className="label">Prazo:</label>
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

                <label className="label">Observação:</label>
                <input
                    type="text"
                    name="observacao"
                    placeholder="Observação"
                    value={dadosFormulario.observacao}
                    onChange={atualizarCampo}
                    className="input"
                />
    
                <button type="submit" className="button">Criar Tarefa</button>
            </form>
        </div>
    );
}

export default CriarTarefa;
