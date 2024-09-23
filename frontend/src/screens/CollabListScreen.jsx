import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';

const CollabListScreen = () => {
  const [collabs, setCollabs] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedCollab, setSelectedCollab] = useState(null);
  const [users, setUsers] = useState([]);
  const [affectedUser, setAffectedUser] = useState(null);

  useEffect(() => {
    fetchCollabs();
    fetchUsers();
  }, []);

  const fetchCollabs = async () => {
    const { data } = await axios.get('/api/collabs');
    setCollabs(data);
  };

  const fetchUsers = async () => {
    const { data } = await axios.get('/api/users');
    setUsers(data);
  };

  const handleEdit = (collab) => {
    setSelectedCollab(collab);
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/collabs/${id}`);
    fetchCollabs();
  };

  const handleAffect = (collab) => {
    setSelectedCollab(collab);
    setShowUserModal(true);
  };

  const handleUnaffect = async (id) => {
    await axios.put(`/api/collabs/${id}`, { affected: null });
    fetchCollabs();
  };

  const handleSaveEdit = async () => {
    await axios.put(`/api/collabs/${selectedCollab._id}`, selectedCollab);
    setShowEditModal(false);
    fetchCollabs();
  };

  const handleSaveAffect = async () => {
    await axios.put(`/api/collabs/${selectedCollab._id}`, { affected: affectedUser });
    setShowUserModal(false);
    fetchCollabs();
  };

  return (
    <div>
      <h1>Collaborators</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Matricule</th>
            <th>Antenne</th>
            <th>Centre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {collabs.map((collab) => (
            <tr key={collab._id}>
              <td>{collab.nom} {collab.prenom}</td>
              <td>{collab.matricule}</td>
              <td>{collab.antenne}</td>
              <td>{collab.centre}</td>
              <td>
                <Button variant="primary" onClick={() => handleEdit(collab)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(collab._id)}>Delete</Button>
                <Button variant="secondary" onClick={() => handleAffect(collab)}>Affect</Button>
                {collab.affected && (
  <Button variant="warning" onClick={() => handleUnaffect(collab._id)}>Unaffect</Button>
)}0
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Collaborator</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNom">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={selectedCollab?.nom}
                onChange={(e) => setSelectedCollab({ ...selectedCollab, nom: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formPrenom">
              <Form.Label>Prenom</Form.Label>
              <Form.Control
                type="text"
                value={selectedCollab?.prenom}
                onChange={(e) => setSelectedCollab({ ...selectedCollab, prenom: e.target.value })}
              />
            </Form.Group>
            {/* Add other fields as needed */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleSaveEdit}>Save changes</Button>
        </Modal.Footer>
      </Modal>

      {/* User Modal */}
      <Modal show={showUserModal} onHide={() => setShowUserModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Affect to User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formUser">
            <Form.Label>Select User</Form.Label>
            <Form.Control
              as="select"
              value={affectedUser}
              onChange={(e) => setAffectedUser(e.target.value)}
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>{user.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUserModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleSaveAffect}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CollabListScreen;