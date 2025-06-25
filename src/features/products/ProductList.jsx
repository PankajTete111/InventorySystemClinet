import React, { useState } from 'react';

const initialProducts = [
  { id: 1, name: 'Laptop', sku: 'LAP-001', price: 1200 },
  { id: 2, name: 'Mouse', sku: 'MOU-002', price: 25 },
  { id: 3, name: 'Keyboard', sku: 'KEY-003', price: 45 },
];

const ProductList = () => {
  const [products, setProducts] = useState(initialProducts);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEdit = (id) => {
    setEditingId(id);
    setEditData(products.find(p => p.id === id));
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = (id) => {
    setProducts(products.map(p => p.id === id ? { ...editData, id } : p));
    setEditingId(null);
  };

  const handleAdd = () => {
    const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    setProducts([...products, { id: newId, name: '', sku: '', price: '', isNew: true }]);
    setEditingId(newId);
    setEditData({ id: newId, name: '', sku: '', price: '' });
  };

  const handleCancel = () => {
    if (editData.isNew) setProducts(products.filter(p => p.id !== editData.id));
    setEditingId(null);
  };

  return (
    <div className="container bg-white rounded shadow p-4 mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Products</h2>
        <button className="btn btn-primary" onClick={handleAdd}>Add Product</button>
      </div>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>SKU</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                {editingId === product.id ? (
                  <>
                    <td><input className="form-control" name="name" value={editData.name} onChange={handleChange} /></td>
                    <td><input className="form-control" name="sku" value={editData.sku} onChange={handleChange} /></td>
                    <td><input className="form-control" name="price" value={editData.price} onChange={handleChange} type="number" /></td>
                    <td>
                      <button className="btn btn-success btn-sm me-2" onClick={() => handleSave(product.id)}>Save</button>
                      <button className="btn btn-secondary btn-sm" onClick={handleCancel}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{product.name}</td>
                    <td>{product.sku}</td>
                    <td>{product.price}</td>
                    <td>
                      <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(product.id)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product.id)}>Delete</button>
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

export default ProductList; 