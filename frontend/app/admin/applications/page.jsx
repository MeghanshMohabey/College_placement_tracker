"use client";
import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Table, Form } from 'react-bootstrap';

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const res = await api.get('/applications');
      setApplications(res.data);
    } catch (err) {
      alert('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchApplications(); }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/applications/${id}`, { status: newStatus });
      fetchApplications();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Selected': return 'badge bg-success';
      case 'Rejected': return 'badge bg-danger';
      case 'Shortlisted': return 'badge bg-info text-dark';
      default: return 'badge bg-secondary';
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="mb-4">Manage Applications</h1>
      
      <div className="bg-white rounded shadow-sm border p-3">
        <Table responsive hover className="mb-0">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Email</th>
              <th>CGPA</th>
              <th>Company</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-end" style={{ minWidth: '150px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="align-middle">
                <td className="fw-bold">{app.studentId?.name}</td>
                <td>{app.studentId?.email}</td>
                <td>{app.studentId?.cgpa}</td>
                <td>{app.companyId?.companyName}</td>
                <td>{app.companyId?.roleOffered}</td>
                <td>
                   <span className={getStatusBadge(app.status)}>
                     {app.status}
                   </span>
                </td>
                <td className="text-end">
                  <Form.Select 
                    size="sm" 
                    value={app.status} 
                    onChange={(e) => handleStatusChange(app._id, e.target.value)}
                  >
                    <option value="Applied">Applied</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Selected">Selected</option>
                    <option value="Rejected">Rejected</option>
                  </Form.Select>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
