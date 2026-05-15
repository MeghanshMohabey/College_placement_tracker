"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/axios';
import Cookies from 'js-cookie';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await api.post('/auth/login', { email, password });
      Cookies.set('token', res.data.token, { expires: 7 });
      
      if (res.data.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <Container className="d-flex justify-content-center">
        <Card style={{ width: '400px' }} className="shadow-sm">
          <Card.Body>
            <Card.Title className="text-center mb-4 fs-3">Welcome Back</Card.Title>
            {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </Form.Group>

              <Form.Group className="mb-4" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </Form>
          </Card.Body>
          <Card.Footer className="text-center text-muted bg-white border-top-0 pt-0 pb-3">
            <small>Don't have an account? <Link href="/register" className="text-decoration-none">Register</Link></small>
          </Card.Footer>
        </Card>
      </Container>
    </div>
  );
}
