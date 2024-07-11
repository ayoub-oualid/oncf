import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const name = userInfo ? userInfo.name : 'Guest';
  return (
    <Container className="d-flex justify-content-center align-items-start vh-100 py-5">
      <Row className="w-100 justify-content-center">
        <Col xs={12} className="text-center mb-4">
          <h1>Hello, {name}</h1>
        </Col>
        <Col xs={12} className="d-flex justify-content-center">
          <Link to="/profile">
            <Button variant="primary" className="mx-2" size='lg'>
              Profile
            </Button>
          </Link>
          <Link to="/planning">
            <Button variant="primary" className="mx-2" size='lg'>
              Planning
            </Button>
          </Link>
          <Link to="/report">
            <Button variant="primary" className="mx-2" size='lg'>
              Report
            </Button>
          </Link>
          {userInfo && userInfo.role === 'admin' && (
            <Link to="/collab">
            <Button variant="primary" className="mx-2" size='lg'>
              Ajouter collaborateur
            </Button>
          </Link>
          )}
          {userInfo && userInfo.role === 'admin' && (
            <Link to="/register">
            <Button variant="primary" className="mx-2" size='lg'>
              Ajouter un utilisateur
            </Button>
          </Link>
          )}
          
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;