import React, { useState } from 'react';

const initialCategories = [
  { id: 1, name: 'Electronics', description: 'Electronic items' },
  { id: 2, name: 'Stationery', description: 'Office supplies' },
  { id: 3, name: 'Furniture', description: 'Office furniture' },
];

const CategoryList = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEdit = (id) => {
    setEditingId(id);
    setEditData(categories.find(c => c.id === id));
  };

  const handleDelete = (id) => {
    setCategories(categories.filter(c => c.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = (id) => {
    setCategories(categories.map(c => c.id === id ? { ...editData, id } : c));
    setEditingId(null);
  };

  const handleAdd = () => {
    const newId = categories.length ? Math.max(...categories.map(c => c.id)) + 1 : 1;
    setCategories([...categories, { id: newId, name: '', description: '', isNew: true }]);
    setEditingId(newId);
    setEditData({ id: newId, name: '', description: '' });
  };

  const handleCancel = () => {
    if (editData.isNew) setCategories(categories.filter(c => c.id !== editData.id));
    setEditingId(null);
  };

  return (
    <div className="container bg-white rounded shadow p-4 mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Categories</h2>
        <button className="btn btn-primary" onClick={handleAdd}>Add Category</button>
      </div>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <tr key={category.id}>
                {editingId === category.id ? (
                  <>
                    <td><input className="form-control" name="name" value={editData.name} onChange={handleChange} /></td>
                    <td><input className="form-control" name="description" value={editData.description} onChange={handleChange} /></td>
                    <td>
                      <button className="btn btn-success btn-sm me-2" onClick={() => handleSave(category.id)}>Save</button>
                      <button className="btn btn-secondary btn-sm" onClick={handleCancel}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{category.name}</td>
                    <td>{category.description}</td>
                    <td>
                      <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(category.id)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(category.id)}>Delete</button>
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

export default CategoryList; 