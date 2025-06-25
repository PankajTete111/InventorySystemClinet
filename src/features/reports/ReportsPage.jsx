import React, { useState } from 'react';

const initialReports = [
  { id: 1, title: 'Monthly Sales', date: '2024-05-01', status: 'Completed' },
  { id: 2, title: 'Inventory Summary', date: '2024-05-02', status: 'Pending' },
  { id: 3, title: 'Supplier Performance', date: '2024-05-03', status: 'Completed' },
];

const ReportsPage = () => {
  const [reports, setReports] = useState(initialReports);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEdit = (id) => {
    setEditingId(id);
    setEditData(reports.find(r => r.id === id));
  };

  const handleDelete = (id) => {
    setReports(reports.filter(r => r.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = (id) => {
    setReports(reports.map(r => r.id === id ? { ...editData, id } : r));
    setEditingId(null);
  };

  const handleAdd = () => {
    const newId = reports.length ? Math.max(...reports.map(r => r.id)) + 1 : 1;
    setReports([...reports, { id: newId, title: '', date: '', status: '', isNew: true }]);
    setEditingId(newId);
    setEditData({ id: newId, title: '', date: '', status: '' });
  };

  const handleCancel = () => {
    if (editData.isNew) setReports(reports.filter(r => r.id !== editData.id));
    setEditingId(null);
  };

  return (
    <div className="container bg-white rounded shadow p-4 mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Reports</h2>
        <button className="btn btn-primary" onClick={handleAdd}>Add Report</button>
      </div>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead className="table-light">
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(report => (
              <tr key={report.id}>
                {editingId === report.id ? (
                  <>
                    <td><input className="form-control" name="title" value={editData.title} onChange={handleChange} /></td>
                    <td><input className="form-control" name="date" value={editData.date} onChange={handleChange} type="date" /></td>
                    <td><input className="form-control" name="status" value={editData.status} onChange={handleChange} /></td>
                    <td>
                      <button className="btn btn-success btn-sm me-2" onClick={() => handleSave(report.id)}>Save</button>
                      <button className="btn btn-secondary btn-sm" onClick={handleCancel}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{report.title}</td>
                    <td>{report.date}</td>
                    <td>{report.status}</td>
                    <td>
                      <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(report.id)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(report.id)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsPage; 