import React, { useState } from 'react';
import { Container, Row, Col, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaUser, FaCalendar, FaClipboardList, FaUserPlus, FaUsers, FaSignOutAlt, FaBars } from 'react-icons/fa';
import CollaboratorStats from './CollaboratorStats';
import { logout } from '../slices/authSlice'; // Ensure this path is correct
import { useLogoutMutation } from '../slices/usersApiSlice'; // Ensure this path is correct

function HomePage() {
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const name = userInfo ? userInfo.name : 'Guest';

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        {/* Left Side Menu */}
        <Col md={3} className={`p-0 bg-primary text-white ${isMenuCollapsed ? 'collapsed' : ''}`} style={{transition: 'all 0.3s', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto'}}>
          <Nav className="flex-column h-100">
            <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
              <h4 className="m-0">Welcome, {name}</h4>
              <Button variant="link" className="text-white p-0" onClick={() => setIsMenuCollapsed(!isMenuCollapsed)}>
                <FaBars />
              </Button>
            </div>
            <Nav.Item>
              <Nav.Link as={Link} to="/profile" className="p-3 text-white">
                <FaUser className="mr-2" /> {!isMenuCollapsed && 'Profile'}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/calendar" className="p-3 text-white">
                <FaCalendar className="mr-2" /> {!isMenuCollapsed && 'Planning'}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/report" className="p-3 text-white">
                <FaClipboardList className="mr-2" /> {!isMenuCollapsed && 'Report'}
              </Nav.Link>
            </Nav.Item>
            {userInfo && userInfo.role === 'admin' && (
              <>
                <Nav.Item>
                  <Nav.Link as={Link} to="/collab" className="p-3 text-white">
                    <FaUserPlus className="mr-2" /> {!isMenuCollapsed && 'Add Collaborator'}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/register" className="p-3 text-white">
                    <FaUserPlus className="mr-2" /> {!isMenuCollapsed && 'Add User'}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/collab-list" className="p-3 text-white">
                    <FaUsers className="mr-2" /> {!isMenuCollapsed && 'Manage Collaborators'}
                  </Nav.Link>
                </Nav.Item>
              </>
            )}
            <div className="mt-auto">
              <Button 
                onClick={logoutHandler} 
                className="w-100 py-3 rounded-0"
                style={{backgroundColor: '#EA651A', borderColor: '#EA651A'}}
              >
                <FaSignOutAlt className="mr-2" /> {!isMenuCollapsed && 'Sign Out'}
              </Button>
            </div>
          </Nav>
        </Col>

        {/* Right Side Dashboard */}
        <Col md={isMenuCollapsed ? 11 : 9} className="p-4">
          <h2 className="mb-4">Dashboard</h2>
          <CollaboratorStats />
          {/* Add more dashboard components here */}
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;