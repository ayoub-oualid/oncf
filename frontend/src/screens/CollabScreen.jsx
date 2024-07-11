import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Table } from 'react-bootstrap';

const CollabForm = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    matricule: '',
    antenne: '',
    centre: '',
    fctOracle: '',
    fctExercer: '',
    situationRh: '',
    datePsy: '',
    dateVm: '',
    dateEA: '',
    typePersonnel: 'statutaire',
  });

  const [collabs, setCollabs] = useState([]);
  const [selectedCollabs, setSelectedCollabs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    fetchCollabs();
  }, []);

  const fetchCollabs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/collabs');
      const data = await response.json();
      setCollabs(data);
    } catch (error) {
      console.error('Error fetching collaborators:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Parse the dates to ISO format
    const parsedFormData = {
      ...formData,
      datePsy: formData.datePsy ? new Date(formData.datePsy).toISOString() : null,
      dateVm: formData.dateVm ? new Date(formData.dateVm).toISOString() : null,
      dateEA: formData.dateEA ? new Date(formData.dateEA).toISOString() : null,
    };

    try {
      const response = await fetch('http://localhost:5000/api/collabs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedFormData),
      });
      if (response.ok) {
        setFormData({
          nom: '',
          prenom: '',
          matricule: '',
          antenne: '',
          centre: '',
          fctOracle: '',
          fctExercer: '',
          situationRh: '',
          datePsy: '',
          dateVm: '',
          dateEA: '',
          typePersonnel: 'statutaire',
        });
        fetchCollabs();
      } else {
        console.error('Error creating collaborator');
      }
    } catch (error) {
      console.error('Error creating collaborator:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/collabs/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchCollabs();
      } else {
        console.error('Error deleting collaborator');
      }
    } catch (error) {
      console.error('Error deleting collaborator:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/collabs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        fetchCollabs();
      } else {
        console.error('Error updating collaborator');
      }
    } catch (error) {
      console.error('Error updating collaborator:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleSelect = (id) => {
    if (selectedCollabs.includes(id)) {
      setSelectedCollabs(selectedCollabs.filter((collabId) => collabId !== id));
    } else {
      setSelectedCollabs([...selectedCollabs, id]);
    }
  };

  const filteredCollabs = collabs.filter(
    (collab) =>
      collab.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collab.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collab.matricule.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collab.fctOracle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collab.fctExercer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCollabs = filteredCollabs.sort((a, b) => {
    const columnA = a[sortColumn];
    const columnB = b[sortColumn];

    if (columnA < columnB) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (columnA > columnB) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const enums = {
    centre: [
      'rabat',
      'fes',
      'tanger',
      'marrakesh',
      'kenitra',
      'oujda',
      'casablanca',
      'agadir',
      'laayoune',
      'dakhla',
      'nador',
      'tetouan',
      'eljadida',
      'meknes',
      'safi',
      'khouribga',
      'beni mellal',
      'taza',
      'taounate',
      'taourirt',
      'tafraout',
      'taroudant',
      'tiznit',
    ],
    fctOracle: ['CL', 'CTR', 'ECT', 'EF'],
    fctExercer: ['CL', 'CTR', 'ECT', 'EF'],
    situationRh: ['operationnel', 'retrait definitif', 'retrait temporaire'],
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Add/Update Collaborator</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Prenom</Form.Label>
              <Form.Control
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Matricule</Form.Label>
              <Form.Control
                type="text"
                name="matricule"
                value={formData.matricule}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Antenne</Form.Label>
              <Form.Control
                type="text"
                name="antenne"
                value={formData.antenne}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Centre</Form.Label>
              <Form.Control
                as="input"
                list="centreOptions"
                name="centre"
                value={formData.centre}
                onChange={handleChange}
                required
              />
              <datalist id="centreOptions">
                {enums.centre.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </datalist>
            </Form.Group>
            <Form.Group>
              <Form.Label>Fonction Oracle</Form.Label>
              <Form.Control
                as="input"
                list="fctOracleOptions"
                name="fctOracle"
                value={formData.fctOracle}
                onChange={handleChange}
                required
              />
              <datalist id="fctOracleOptions">
                {enums.fctOracle.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </datalist>
            </Form.Group>
            <Form.Group>
              <Form.Label>Fonction Exercée</Form.Label>
              <Form.Control
                as="input"
                list="fctExercerOptions"
                name="fctExercer"
                value={formData.fctExercer}
                onChange={handleChange}
                required
              />
              <datalist id="fctExercerOptions">
                {enums.fctExercer.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </datalist>
            </Form.Group>
            <Form.Group>
              <Form.Label>Situation RH</Form.Label>
              <Form.Control
                as="input"
                list="situationRhOptions"
                name="situationRh"
                value={formData.situationRh}
                onChange={handleChange}
                required
              />
              <datalist id="situationRhOptions">
                {enums.situationRh.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </datalist>
            </Form.Group>
            <Form.Group>
              <Form.Label>Date Psy</Form.Label>
              <Form.Control
                type="date"
                name="datePsy"
                value={formData.datePsy ? formData.datePsy.split('T')[0] : ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date VM</Form.Label>
              <Form.Control
                type="date"
                name="dateVm"
                value={formData.dateVm ? formData.dateVm.split('T')[0] : ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date EA</Form.Label>
              <Form.Control
                type="date"
                name="dateEA"
                value={formData.dateEA ? formData.dateEA.split('T')[0] : ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Type de Personnel</Form.Label>
              <Form.Control
                as="select"
                name="typePersonnel"
                value={formData.typePersonnel}
                onChange={handleChange}
                required
              >
                <option value="statutaire">Statutaire</option>
                <option value="stgm">Stgm</option>
              </Form.Control>
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Collaborators</h2>
          <Form.Control
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th onClick={() => handleSort('nom')}>Nom</th>
                <th onClick={() => handleSort('prenom')}>Prenom</th>
                <th onClick={() => handleSort('matricule')}>Matricule</th>
                <th onClick={() => handleSort('centre')}>Centre</th>
                <th onClick={() => handleSort('fctOracle')}>Fonction Oracle</th>
                <th onClick={() => handleSort('fctExercer')}>Fonction Exercée</th>
                <th onClick={() => handleSort('situationRh')}>Situation RH</th>
                <th>Date Psy</th>
                <th>Date VM</th>
                <th>Date EA</th>
                <th>Type de Personnel</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedCollabs.map((collab) => (
                <tr key={collab._id}>
                  <td>{collab.nom}</td>
                  <td>{collab.prenom}</td>
                  <td>{collab.matricule}</td>
                  <td>{collab.centre}</td>
                  <td>{collab.fctOracle}</td>
                  <td>{collab.fctExercer}</td>
                  <td>{collab.situationRh}</td>
                  <td>{collab.datePsy ? new Date(collab.datePsy).toLocaleDateString() : ''}</td>
                  <td>{collab.dateVm ? new Date(collab.dateVm).toLocaleDateString() : ''}</td>
                  <td>{collab.dateEA ? new Date(collab.dateEA).toLocaleDateString() : ''}</td>
                  <td>{collab.typePersonnel}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleDelete(collab._id)}>Delete</Button>
                    <Button variant="warning" onClick={() => handleUpdate(collab._id)}>Update</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default CollabForm;
