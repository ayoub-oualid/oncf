import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Button, Modal, Table } from 'react-bootstrap';

function UserSearchAndAssignScreen() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [collabs, setCollabs] = useState([]);
  const [selectedCollabs, setSelectedCollabs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users');
      const data = await response.json();
      console.log(data);
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const assignCollaborator = async (user, collabs) => {
    const response = await fetch(`/api/users/${user._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ collabs }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to assign collaborators');
    }
  
    const updatedUser = await response.json();
    setSelectedUser(updatedUser);
  };

  const handleAssignCollaboratorClick = async () => {
    const response = await fetch('/api/collabs');
    const data = await response.json();
    setCollabs(data);
    setSelectedCollabs(selectedUser?.collabs || []);
    setIsModalOpen(true);
  };

  const handleCollabSelect = (collab) => {
    setSelectedCollabs((prevSelectedCollabs) => {
      if (prevSelectedCollabs.some((c) => c.matricule === collab.matricule)) {
        return prevSelectedCollabs.filter((c) => c.matricule !== collab.matricule);
      } else {
        return [...prevSelectedCollabs, collab];
      }
    });
  };

  const handleSave = async () => {
    await assignCollaborator(selectedUser, selectedCollabs);
    alert('Collaborators assigned!');
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <ListGroup>
            {users.map((user) => (
              <ListGroup.Item
                key={user._id}
                action
                onClick={() => handleUserSelect(user)}
              >
                <div>
                  <h5>{user.name}</h5>
                  <p>Email: {user.email}</p>
                  <p>Role: {user.role}</p>
                  {user.matricule && <p>Matricule: {user.matricule}</p>}
                  {user.antenne && <p>Antenne: {user.antenne}</p>}
                  {user.centre && <p>Centre: {user.centre}</p>}
                  {user.fct && <p>Fct: {user.fct}</p>}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={6}>
          {selectedUser && (
            <div>
              <h2>{selectedUser.name}</h2>
              <p>Email: {selectedUser.email}</p>
              <p>Role: {selectedUser.role}</p>
              <Button variant="primary" onClick={handleAssignCollaboratorClick}>
                Assign Collaborator
              </Button>
            </div>
          )}
        </Col>
      </Row>

      <Modal show={isModalOpen} onHide={handleCancel} size="lg" dialogClassName="modal-90w">
        <Modal.Header closeButton>
          <Modal.Title>Select Collaborators</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th></th>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Matricule</th>
                  <th>Antenne</th>
                  <th>Centre</th>
                  <th>Fct Oracle</th>
                  <th>Fct Exercer</th>
                  <th>Situation RH</th>
                  <th>Date Psy</th>
                  <th>Date Vm</th>
                  <th>Date EA</th>
                  <th>Type Personnel</th>
                </tr>
              </thead>
              <tbody>
                {collabs.map((collab) => (
                  <tr key={collab.matricule}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedCollabs.some((c) => c.matricule === collab.matricule)}
                        onChange={() => handleCollabSelect(collab)}
                      />
                    </td>
                    <td>{collab.nom}</td>
                    <td>{collab.prenom}</td>
                    <td>{collab.matricule}</td>
                    <td>{collab.antenne}</td>
                    <td>{collab.centre}</td>
                    <td>{collab.fctOracle}</td>
                    <td>{collab.fctExercer}</td>
                    <td>{collab.situationRh}</td>
                    <td>{collab.datePsy }</td>
                    <td>{collab.dateVm }</td>
                    <td>{collab.dateEA }</td>
                    <td>{collab.typePersonnel}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default UserSearchAndAssignScreen;