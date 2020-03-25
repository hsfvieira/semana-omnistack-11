import React, {useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {FiPower, FiTrash2} from 'react-icons/fi'

import './styles.css'

import logoImg from '../../assets/logo.svg'

import api from '../../services/api'

export default function Profile() {

    const ongId = localStorage.getItem('ongId')
    const ongName = localStorage.getItem('ongName')
    const history = useHistory()
    const [incidents, setIncidents] = useState([])

    useEffect(() => {
        async function fetchData() {
            const response = await api.get('/profile', {
                headers: {
                    Authorization: ongId
                }
            })
    
            setIncidents(response.data)
        }
        fetchData(ongId, setIncidents)
    }, [ongId])

    async function handleIncidentDelete(id, ongId, incidents, setIncidents) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch(err) {
            alert('Erro ao deletar caso, tente novamente.')
        }
    }

    function handleLogout(history) {
        localStorage.clear()
        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={() => handleLogout(history)} type="button">
                    <FiPower size={18} color="e02041"/>
                </button>

            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                        <button onClick={() => handleIncidentDelete(incident.id, ongId, incidents, setIncidents)} type="button">
                            <FiTrash2 color="a8a8b3" size={18} />
                        </button>
                    </li>    
                ))}

                
            </ul>
            
        </div>
    )
}