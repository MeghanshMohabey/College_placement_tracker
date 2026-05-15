"use client";
import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Card, Row, Col } from 'react-bootstrap';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function AdminDashboard() {
  const [stats, setStats] = useState({ students: 0, companies: 0, applications: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [studRes, compRes, appRes] = await Promise.all([
          api.get('/users/students'),
          api.get('/companies'),
          api.get('/applications')
        ]);
        
        setStats({
          students: studRes.data.length,
          companies: compRes.data.length,
          applications: appRes.data.length
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

  const barData = {
    labels: ['Students', 'Companies', 'Applications'],
    datasets: [{
      label: 'Platform Overview',
      data: [stats.students, stats.companies, stats.applications],
      backgroundColor: ['#6f42c1', '#d63384', '#0d6efd']
    }]
  };

  return (
    <div>
      <h1 className="mb-4">Admin Dashboard</h1>
      
      <Row className="mb-4 g-4">
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="text-muted fs-6">Total Students</Card.Title>
              <Card.Text className="fs-2 fw-bold">{stats.students}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="text-muted fs-6">Total Companies</Card.Title>
              <Card.Text className="fs-2 fw-bold">{stats.companies}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="text-muted fs-6">Total Applications</Card.Title>
              <Card.Text className="fs-2 fw-bold">{stats.applications}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white">Platform Stats</Card.Header>
            <Card.Body>
               <div style={{ height: '350px' }} className="d-flex justify-content-center align-items-center">
                 <Bar data={barData} options={{ maintainAspectRatio: false }} />
               </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
