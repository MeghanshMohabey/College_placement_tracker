"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import api from '@/lib/axios';
import { Container, Nav, Navbar } from 'react-bootstrap';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/auth/me');
        if (res.data.role !== 'admin') {
          router.push('/dashboard');
        } else {
          setUser(res.data);
        }
      } catch {
        router.push('/login');
      }
    };
    fetchUser();
  }, [router]);

  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/login');
  };

  if (!user) return <div className="min-vh-100 d-flex align-items-center justify-content-center">Loading...</div>;

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <Navbar bg="primary" variant="dark" expand="lg" className="px-4 shadow-sm">
        <Navbar.Brand>Admin Portal</Navbar.Brand>
        <Navbar.Toggle aria-controls="admin-navbar-nav" />
        <Navbar.Collapse id="admin-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/admin">Dashboard</Nav.Link>
            <Nav.Link as={Link} href="/admin/companies">Companies</Nav.Link>
            <Nav.Link as={Link} href="/admin/applications">Applications</Nav.Link>
            <Nav.Link as={Link} href="/admin/students">Students</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={handleLogout} className="text-white opacity-75">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      
      <Container className="flex-grow-1 py-4">
        {children}
      </Container>
    </div>
  );
}
