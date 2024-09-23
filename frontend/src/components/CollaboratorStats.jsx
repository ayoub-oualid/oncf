import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCollabStats } from '../slices/collabstatsSlice';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const CollaboratorStats = () => {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.collabStats);

  useEffect(() => {
    dispatch(fetchCollabStats());
  }, [dispatch]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5 text-danger">Error: {error}</div>;

  const pieChartData = {
    labels: ['Assigned', 'Unassigned'],
    datasets: [
      {
        data: [stats.assignedCollaborators, stats.unassignedCollaborators],
        backgroundColor: ['#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#36A2EB', '#FFCE56']
      }
    ]
  };

  const barChartData = {
    labels: stats.assignmentsByInspector.map(inspector => inspector.inspectorName),
    datasets: [
      {
        label: 'Assigned Collaborators',
        data: stats.assignmentsByInspector.map(inspector => inspector.count),
        backgroundColor: '#36A2EB',
      }
    ]
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Collaborator Assignment Status'
      }
    }
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Collaborators per Inspector'
      }
    }
  };

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Pie data={pieChartData} options={pieOptions} />
              <div className="text-center mt-3">
                Total Collaborators: {stats.totalCollaborators}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Bar data={barChartData} options={barOptions} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CollaboratorStats;