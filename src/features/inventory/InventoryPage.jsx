import React, { useState } from 'react';

const initialInventory = [
  { id: 1, product: 'Laptop', quantity: 10, location: 'Warehouse A' },
  { id: 2, product: 'Mouse', quantity: 50, location: 'Warehouse B' },
  { id: 3, product: 'Keyboard', quantity: 30, location: 'Warehouse A' },
];

const InventoryPage = () => {
  const [inventory, setInventory] = useState(initialInventory);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEdit = (id) => {
    setEditingId(id);
    setEditData(inventory.find(i => i.id === id));
  };

  const handleDelete = (id) => {
    setInventory(inventory.filter(i => i.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = (id) => {
    setInventory(inventory.map(i => i.id === id ? { ...editData, id } : i));
    setEditingId(null);
  };

  const handleAdd = () => {
    const newId = inventory.length ? Math.max(...inventory.map(i => i.id)) + 1 : 1;
    setInventory([...inventory, { id: newId, product: '', quantity: '', location: '', isNew: true }]);
    setEditingId(newId);
    setEditData({ id: newId, product: '', quantity: '', location: '' });
  };

  const handleCancel = () => {
    if (editData.isNew) setInventory(inventory.filter(i => i.id !== editData.id));
    setEditingId(null);
  };

  return (
    <div className="container bg-white rounded shadow p-4 mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Inventory</h2>
        <button className="btn btn-primary" onClick={handleAdd}>Add Inventory</button>
      </div>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead className="table-light">
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map(item => (
              <tr key={item.id}>
                {editingId === item.id ? (
                  <>
                    <td><input className="form-control" name="product" value={editData.product} onChange={handleChange} /></td>
                    <td><input className="form-control" name="quantity" value={editData.quantity} onChange={handleChange} type="number" /></td>
                    <td><input className="form-control" name="location" value={editData.location} onChange={handleChange} /></td>
                    <td>
                      <button className="btn btn-success btn-sm me-2" onClick={() => handleSave(item.id)}>Save</button>
                      <button className="btn btn-secondary btn-sm" onClick={handleCancel}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{item.product}</td>
                    <td>{item.quantity}</td>
                    <td>{item.location}</td>
                    <td>
                      <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(item.id)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>Delete</button>
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

export default InventoryPage; 