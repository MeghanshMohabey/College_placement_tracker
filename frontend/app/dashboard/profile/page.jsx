"use client";
import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [cgpa, setCgpa] = useState('');
  const [skills, setSkills] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/auth/me');
        setProfile(res.data);
        setCgpa(res.data.cgpa || '');
        setSkills(res.data.skills?.join(', ') || '');
      } catch (err) {
        alert('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const skillsArray = skills.split(',').map((s) => s.trim()).filter(Boolean);
      await api.put('/users/profile', { cgpa: Number(cgpa), skills: skillsArray });
      alert('Profile updated successfully!');
    } catch (err) {
      alert('Failed to update profile');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: '600px' }}>
      <h1 className="mb-4">My Profile</h1>
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title className="mb-4">Personal Details</Card.Title>
          <div className="mb-4">
            <Row className="mb-2">
              <Col sm={3} className="text-muted fw-bold">Name</Col>
              <Col sm={9}>{profile.name}</Col>
            </Row>
            <Row>
              <Col sm={3} className="text-muted fw-bold">Email</Col>
              <Col sm={9}>{profile.email}</Col>
            </Row>
          </div>

          <hr />

          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3" controlId="cgpa">
              <Form.Label className="fw-bold">Current CGPA</Form.Label>
              <Form.Control type="number" step="0.01" value={cgpa} onChange={(e) => setCgpa(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-4" controlId="skills">
              <Form.Label className="fw-bold">Skills (comma separated)</Form.Label>
              <Form.Control type="text" value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="React, Node.js, Python" />
            </Form.Group>

            <Button variant="primary" type="submit">Update Profile</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
