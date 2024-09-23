import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
const centres = [
  'rabat', 'fes', 'tanger', 'marrakesh', 'kenitra', 'oujda', 'casablanca', 'agadir', 'laayoune', 'dakhla', 'nador', 'tetouan', 'eljadida', 'meknes', 'safi', 'khouribga', 'beni mellal', 'taza', 'taounate', 'taourirt', 'tafraout', 'taroudant', 'tiznit'
];

function CreateCollab() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    matricule: '',
    antenne: '',
    centre: '',
    dateIns: '',
    fctOracle: '',
    fctExercer: '',
    situationRh: '',
    datePsy: '',
    dateVm: '',
    dateEA: '',
    typePersonnel: 'statutaire',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/collabs', formData);
      console.log('Collaborator created:', response.data);
      // Reset form or redirect user
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
      alert('Collaborator created successfully!');
    } catch (error) {
      console.error('Error creating collaborator:', error);
      alert('Error creating collaborator. Please try again.');
    }
  };

  return (
    <Container className="mt-4">
      <Card className="shadow">
        <Card.Header as="h2" className="text-center bg-primary text-white">
          Create New Collaborator
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nom</Form.Label>
              <Form.Control type="text" name="nom" value={formData.nom} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Prénom</Form.Label>
              <Form.Control type="text" name="prenom" value={formData.prenom} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Matricule</Form.Label>
              <Form.Control type="text" name="matricule" value={formData.matricule} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Antenne</Form.Label>
              <Form.Control type="text" name="antenne" value={formData.antenne} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Centre</Form.Label>
              <Form.Control as="select" name="centre" value={formData.centre} onChange={handleChange} required>
                <option value="">Select a centre</option>
                {centres.map((centre) => (
                  <option key={centre} value={centre}>{centre}</option>
                ))}
              </Form.Control>
            </Form.Group>


            <Form.Group className="mb-3">
              <Form.Label>Fonction Oracle</Form.Label>
              <Form.Control as="select" name="fctOracle" value={formData.fctOracle} onChange={handleChange}>
                <option value="">Select a function</option>
                <option value="CL">CL</option>
                <option value="CTR">CTR</option>
                <option value="ECT">ECT</option>
                <option value="EF">EF</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Fonction Exercée</Form.Label>
              <Form.Control as="select" name="fctExercer" value={formData.fctExercer} onChange={handleChange}>
                <option value="">Select a function</option>
                <option value="CL">CL</option>
                <option value="CTR">CTR</option>
                <option value="ECT">ECT</option>
                <option value="EF">EF</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Situation RH</Form.Label>
              <Form.Control as="select" name="situationRh" value={formData.situationRh} onChange={handleChange}>
                <option value="">Select a situation</option>
                <option value="operationnel">Opérationnel</option>
                <option value="retrait definitif">Retrait Définitif</option>
                <option value="retrait temporaire">Retrait Temporaire</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date PSY</Form.Label>
              <Form.Control type="date" name="datePsy" value={formData.datePsy} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date VM</Form.Label>
              <Form.Control type="date" name="dateVm" value={formData.dateVm} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date EA</Form.Label>
              <Form.Control type="date" name="dateEA" value={formData.dateEA} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Type de Personnel</Form.Label>
              <Form.Control as="select" name="typePersonnel" value={formData.typePersonnel} onChange={handleChange}>
                <option value="statutaire">Statutaire</option>
                <option value="stgm">STGM</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Create Collaborator
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CreateCollab;