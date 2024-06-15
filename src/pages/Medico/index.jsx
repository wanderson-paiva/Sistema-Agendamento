import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { api } from '../../services/api';

export const Medico = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/salaAtendimentos');
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error('Erro ao obter dados:', error);
      }
    };

    fetchData();
  }, []); 

  const deletarAtendimento = (id) =>{
    api.delete(`/salaAtendimentos/${id}`);
    setData(data.filter(item=> item.id !== id));
  };
  
  return (
    
      <div>
        <div>
				  <h2> Bem vindo(a)!</h2>
          <div>
            <h2>Consultas Agendadas</h2>
            <div>
              <table class="table table-striped table-bordered table-hover">
                <thead>
                  <tr >
                    <th>Data</th>
                    <th>Horário</th>
                    <th>Paciente</th>
                    <th>Email Paciente</th>
                    <th>Opções</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(item => (
                    <tr key={item.id}>
                      <td>{item.data}</td>
                      <td>{item.horario}</td>
                      <td>{item.nomePaciente}</td> 
                      <td>{item.emailPaciente}</td>
                      <td>
                          <button class="btn btn-outline-warning">Atualizar</button>
                          <button class="btn btn-outline-danger" onClick={() => deletarAtendimento(item.id)}>
                            Cancelar</button>
                          <button class="btn btn-outline-success">Confirmar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div> 
          </div>
        </div>
      </div>
    
  );
};
