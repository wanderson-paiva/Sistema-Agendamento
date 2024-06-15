import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form, ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import DateInput  from '../../components/dateInput'; 
import { api } from '../../services/api';

export const Paciente = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/salaAtendimentos');
        setData(response.data);
      } catch (error) {
        console.error('Erro ao obter dados:', error);
      }
    };

    fetchData();
  }, []); 

  const deleteAtendimento = (id) => {
    api.delete(`/salaAtendimentos/${id}`)
      .then(() => {
        setData(data.filter(item => item.id !== id));
      })
      .catch(error => {
        console.error('Erro ao deletar atendimento:', error);
      });
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleSubmit = () => {
    // Lógica para salvar o novo agendamento
    handleCloseModal(); // Fechar o modal após salvar
  };

  return (
    <div>
      <div>
        <h1> Meus Agendamentos</h1>
        <div>
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Novo Agendamento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <div>
                  <ButtonGroup>
                    <DropdownButton variant="secondary" as={ButtonGroup} title="Especialidade">
                      <Dropdown.Item eventKey="1">Clínico Geral</Dropdown.Item>
                      <Dropdown.Item eventKey="2">Pediatra</Dropdown.Item>
                      <Dropdown.Item eventKey="3">Dentista</Dropdown.Item>
                    </DropdownButton>
                  </ButtonGroup>
                </div>
                <div>
                  <ButtonGroup>
                    <DropdownButton variant="secondary" as={ButtonGroup} title="Médicos">
                      <Dropdown.Item eventKey="1">Dr.Felipe</Dropdown.Item>
                      <Dropdown.Item eventKey="2">Dr.Paulo</Dropdown.Item>
                      <Dropdown.Item eventKey="3">Dr.Carla</Dropdown.Item>
                      <Dropdown.Item eventKey="4">Dr.Jessica</Dropdown.Item>
                    </DropdownButton>
                  </ButtonGroup>
                </div>
                <div>
                  <DateInput
                    value={''} // Inserir o estado para o valor do DateInput
                    startdate={''} // Inserir o estado para o startdate do DateInput
                    onChange={() => {}} // Inserir o estado para o onChange do DateInput
                    id="dataSentenca"
                    name="dataSentenca"
                    type="date"
                  />
                </div>
                <div>
                  <ButtonGroup>
                    <DropdownButton variant="secondary" as={ButtonGroup} title="Horários">
                      <Dropdown.Item eventKey="1">07:00-08:00</Dropdown.Item>
                      <Dropdown.Item eventKey="2">08:00-09:00</Dropdown.Item>
                      <Dropdown.Item eventKey="3">09:00-10:00</Dropdown.Item>
                      <Dropdown.Item eventKey="4">10:00-11:00</Dropdown.Item>
                      <Dropdown.Item eventKey="5">13:00-14:00</Dropdown.Item>
                      <Dropdown.Item eventKey="6">14:00-15:00</Dropdown.Item>
                      <Dropdown.Item eventKey="7">15:00-16:00</Dropdown.Item>
                      <Dropdown.Item eventKey="8">16:00-17:00</Dropdown.Item>
                    </DropdownButton>
                  </ButtonGroup>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Fechar
              </Button>
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Salvar
              </Button>
            </Modal.Footer>
          </Modal>

          <Button variant="warning" onClick={handleShowModal}>Novo Agendamento</Button>
        </div>

        <div>
          <h2>Tabela de Dados</h2>
          <div>
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>Médico</th>
                  <th>Especialidade</th>
                  <th>Data</th>
                  <th>Horário</th>
                  <th>Email Paciente</th>
                  <th>Opções</th>
                </tr>
              </thead>
              <tbody>
                {data.map(item => (
                  <tr key={item.id}>
                    <td>{item.nomeMedico}</td>
                    <td>{item.especialidade}</td>
                    <td>{item.data}</td>
                    <td>{item.horario}</td>
                    <td>{item.emailPaciente}</td>
                    <td>
                      <button className="btn btn-outline-warning">Atualizar</button>
                      <button className="btn btn-outline-danger" onClick={() => deleteAtendimento(item.id)}>
                        Cancelar
                      </button>
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
