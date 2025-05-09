import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { CAMPOS } from './campos';
import './form.css'

function EditarTarefa() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [dadosFormulario, setDadosFormulario] = useState(CAMPOS);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/tarefa/${id}/`)
            .then(response => {
                setDadosFormulario(response.data);
            })
            .catch(erro => {
                console.error("Erro ao carregar tarefa:", erro);
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
                navigate('/');
            })
            .catch(erro => {
                console.error("Erro ao editar tarefa:", erro);
                alert('Erro ao editar tarefa.');
            });
    };

    return (
        <div className="container">
            <h2 className="titulo">Editar Tarefa</h2>
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
    
                <button type="submit" className="button">Salvar Alterações</button>
            </form>
        </div>
    );
}

export default EditarTarefa;
