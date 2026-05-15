"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import api from '@/lib/axios';
import { Container, Nav, Navbar } from 'react-bootstrap';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/auth/me');
        if (res.data.role !== 'student') {
          router.push('/admin');
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
      <Navbar bg="dark" variant="dark" expand="lg" className="px-4">
        <Navbar.Brand>Student Portal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} href="/dashboard/companies">Companies</Nav.Link>
            <Nav.Link as={Link} href="/dashboard/profile">Profile</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={handleLogout} className="text-danger">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      
      <Container className="flex-grow-1 py-4">
        {children}
      </Container>
    </div>
  );
}
