"use client";
import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Table } from 'react-bootstrap';

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get('/users/students');
        setStudents(res.data);
      } catch (err) {
        alert('Failed to load students');
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="mb-4">Registered Students</h1>
      
      <div className="bg-white rounded shadow-sm border p-3">
        <Table responsive hover className="mb-0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>CGPA</th>
              <th>Skills</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="align-middle">
                <td className="fw-bold">{student.name}</td>
                <td>{student.email}</td>
                <td>{student.cgpa}</td>
                <td>{student.skills?.join(', ') || 'None'}</td>
                <td>{new Date(student.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
