"use client";
import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Card, Row, Col } from 'react-bootstrap';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, applied: 0, selected: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [compRes, appRes] = await Promise.all([
          api.get('/companies'),
          api.get('/applications')
        ]);
        
        const apps = appRes.data;
        const selectedCount = apps.filter((a) => a.status === 'Selected').length;
        
        setStats({
          total: compRes.data.length,
          applied: apps.length,
          selected: selectedCount
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  const pieData = {
    labels: ['Applied', 'Selected'],
    datasets: [{
      data: [stats.applied, stats.selected],
      backgroundColor: ['#0d6efd', '#198754']
    }]
  };

  return (
    <div>
      <h1 className="mb-4">Dashboard</h1>
      
      <Row className="mb-4 g-4">
        <Col md={4}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title className="text-muted fs-6">Available Companies</Card.Title>
              <Card.Text className="fs-2 fw-bold">{stats.total}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title className="text-muted fs-6">Applied Companies</Card.Title>
              <Card.Text className="fs-2 fw-bold">{stats.applied}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title className="text-muted fs-6">Selected</Card.Title>
              <Card.Text className="fs-2 fw-bold text-success">{stats.selected}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white">Application Stats</Card.Header>
            <Card.Body>
               <div style={{ height: '300px' }} className="d-flex justify-content-center align-items-center">
                 {stats.applied > 0 ? (
                   <Pie data={pieData} options={{ maintainAspectRatio: false }} />
                 ) : (
                   <span className="text-muted">No applications yet.</span>
                 )}
               </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
