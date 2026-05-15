"use client";
import Link from 'next/link';
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function LandingPage() {
  return (
    <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center text-center bg-white">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <h1 className="display-3 fw-bold text-primary mb-4">
              College Placement Tracker
            </h1>
            <p className="lead text-secondary mb-5">
              Your one-stop solution to manage, track, and land your dream job. Explore opportunities, track applications, and manage student profiles effortlessly.
            </p>
            <div className="d-flex gap-3 justify-content-center">
              <Link href="/login" passHref>
                <Button variant="primary" size="lg" className="px-5">Login</Button>
              </Link>
              <Link href="/register" passHref>
                <Button variant="outline-primary" size="lg" className="px-5">Register</Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
