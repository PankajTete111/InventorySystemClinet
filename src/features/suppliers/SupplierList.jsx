import React, { useState } from 'react';

const initialSuppliers = [
  { id: 1, name: 'ABC Distributors', contact: 'John Doe', phone: '123-456-7890' },
  { id: 2, name: 'XYZ Supplies', contact: 'Jane Smith', phone: '987-654-3210' },
  { id: 3, name: 'Global Traders', contact: 'Mike Brown', phone: '555-123-4567' },
];

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEdit = (id) => {
    setEditingId(id);
    setEditData(suppliers.find(s => s.id === id));
  };

  const handleDelete = (id) => {
    setSuppliers(suppliers.filter(s => s.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = (id) => {
    setSuppliers(suppliers.map(s => s.id === id ? { ...editData, id } : s));
    setEditingId(null);
  };

  const handleAdd = () => {
    const newId = suppliers.length ? Math.max(...suppliers.map(s => s.id)) + 1 : 1;
    setSuppliers([...suppliers, { id: newId, name: '', contact: '', phone: '', isNew: true }]);
    setEditingId(newId);
    setEditData({ id: newId, name: '', contact: '', phone: '' });
  };

  const handleCancel = () => {
    if (editData.isNew) setSuppliers(suppliers.filter(s => s.id !== editData.id));
    setEditingId(null);
  };

  return (
    <div className="container bg-white rounded shadow p-4 mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Suppliers</h2>
        <button className="btn btn-primary" onClick={handleAdd}>Add Supplier</button>
      </div>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map(supplier => (
              <tr key={supplier.id}>
                {editingId === supplier.id ? (
                  <>
                    <td><input className="form-control" name="name" value={editData.name} onChange={handleChange} /></td>
                    <td><input className="form-control" name="contact" value={editData.contact} onChange={handleChange} /></td>
                    <td><input className="form-control" name="phone" value={editData.phone} onChange={handleChange} /></td>
                    <td>
                      <button className="btn btn-success btn-sm me-2" onClick={() => handleSave(supplier.id)}>Save</button>
                      <button className="btn btn-secondary btn-sm" onClick={handleCancel}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{supplier.name}</td>
                    <td>{supplier.contact}</td>
                    <td>{supplier.phone}</td>
                    <td>
                      <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(supplier.id)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(supplier.id)}>Delete</button>
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

export default SupplierList; 