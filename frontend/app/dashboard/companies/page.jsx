"use client";
import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await api.get('/companies');
        setCompanies(res.data);
      } catch (err) {
        alert('Failed to load companies');
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  const handleApply = async (companyId) => {
    try {
      await api.post('/applications', { companyId });
      alert('Applied successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to apply');
    }
  };

  if (loading) return <div>Loading...</div>;

  const filteredCompanies = companies.filter((c) => 
    c.companyName.toLowerCase().includes(search.toLowerCase()) ||
    c.roleOffered.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <h1>Available Companies</h1>
        <Form.Control 
          type="text" 
          placeholder="Search companies or roles..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          style={{ maxWidth: '300px' }}
        />
      </div>
      <Row className="g-4">
        {filteredCompanies.map((company) => (
          <Col md={6} lg={4} key={company._id}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column">
                <Card.Title>{company.companyName}</Card.Title>
                <Card.Subtitle className="mb-3 text-muted">{company.roleOffered}</Card.Subtitle>
                
                <div className="mb-auto">
                  <p className="mb-1"><strong>Package:</strong> {company.package}</p>
                  <p className="mb-1"><strong>CGPA Required:</strong> {company.eligibilityCGPA}</p>
                  <p className="mb-3"><strong>Deadline:</strong> {new Date(company.deadline).toLocaleDateString()}</p>
                  <Card.Text className="small text-truncate" style={{ WebkitLineClamp: 3, display: '-webkit-box', WebkitBoxOrient: 'vertical', whiteSpace: 'normal', height: '60px', overflow: 'hidden' }}>
                    {company.description}
                  </Card.Text>
                </div>

                <Button variant="primary" className="w-100 mt-3" onClick={() => handleApply(company._id)}>
                  Apply Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
        {filteredCompanies.length === 0 && <p className="text-muted">No companies found.</p>}
      </Row>
    </div>
  );
}
