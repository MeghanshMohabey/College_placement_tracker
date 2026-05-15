"use client";
import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Table, Button, Form, Modal } from 'react-bootstrap';

export default function AdminCompanies() {
  const [companies, setCompanies] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '', roleOffered: '', package: '', eligibilityCGPA: '', deadline: '', description: ''
  });

  const fetchCompanies = async () => {
    try {
      const res = await api.get('/companies');
      setCompanies(res.data);
    } catch (err) {
      alert('Failed to load companies');
    }
  };

  useEffect(() => { fetchCompanies(); }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/companies', formData);
      alert('Company added successfully');
      handleClose();
      fetchCompanies();
    } catch (err) {
      alert('Failed to add company');
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/companies/${id}`);
      fetchCompanies();
    } catch (err) {
      alert('Failed to delete company');
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Manage Companies</h1>
        <Button variant="primary" onClick={handleShow}>Add Company</Button>
      </div>

      <div className="bg-white rounded shadow-sm border p-3">
        <Table responsive hover className="mb-0">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Role</th>
              <th>Package</th>
              <th>CGPA</th>
              <th>Deadline</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((c) => (
              <tr key={c._id} className="align-middle">
                <td className="fw-bold">{c.companyName}</td>
                <td>{c.roleOffered}</td>
                <td>{c.package}</td>
                <td>{c.eligibilityCGPA}</td>
                <td>{new Date(c.deadline).toLocaleDateString()}</td>
                <td className="text-end">
                  <Button variant="danger" size="sm" onClick={() => handleDelete(c._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} id="companyForm">
            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control required value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role Offered</Form.Label>
              <Form.Control required value={formData.roleOffered} onChange={e => setFormData({...formData, roleOffered: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Package</Form.Label>
              <Form.Control required value={formData.package} onChange={e => setFormData({...formData, package: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Eligibility CGPA</Form.Label>
              <Form.Control required type="number" step="0.01" value={formData.eligibilityCGPA} onChange={e => setFormData({...formData, eligibilityCGPA: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Deadline</Form.Label>
              <Form.Control required type="date" value={formData.deadline} onChange={e => setFormData({...formData, deadline: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" type="submit" form="companyForm">Save Company</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
