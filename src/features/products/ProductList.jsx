import React, { useState } from 'react';

const initialProducts = [
  { id: 1, name: 'Old Monk Rum', sku: 'OM-001', category: 'Rum', brand: 'Old Monk', volume: 750, price: 500 },
  { id: 2, name: 'Kingfisher Beer', sku: 'KF-002', category: 'Beer', brand: 'Kingfisher', volume: 650, price: 180 },
  { id: 3, name: 'Royal Stag Whisky', sku: 'RS-003', category: 'Whisky', brand: 'Royal Stag', volume: 750, price: 900 },
];

const ProductList = () => {
  const [products, setProducts] = useState(initialProducts);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    sku: '',
    category: '',
    brand: '',
    volume: '',
    price: '',
  });

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

  // Modal logic
  const handleModalChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    setShowModal(true);
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    setProducts([
      ...products,
      { id: newId, ...newProduct, volume: Number(newProduct.volume), price: Number(newProduct.price) },
    ]);
    setShowModal(false);
    setNewProduct({ name: '', sku: '', category: '', brand: '', volume: '', price: '' });
  };

  const handleModalCancel = () => {
    setShowModal(false);
    setNewProduct({ name: '', sku: '', category: '', brand: '', volume: '', price: '' });
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
              <th>SKU/Barcode</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Volume (ml)</th>
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
                    <td><input className="form-control" name="category" value={editData.category} onChange={handleChange} /></td>
                    <td><input className="form-control" name="brand" value={editData.brand} onChange={handleChange} /></td>
                    <td><input className="form-control" name="volume" value={editData.volume} onChange={handleChange} type="number" /></td>
                    <td><input className="form-control" name="price" value={editData.price} onChange={handleChange} type="number" /></td>
                    <td>
                      <button className="btn btn-success btn-sm me-2" onClick={() => handleSave(product.id)}>Save</button>
                      <button className="btn btn-secondary btn-sm" onClick={() => setEditingId(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{product.name}</td>
                    <td>{product.sku}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>{product.volume}</td>
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

      {/* Add Product Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleModalSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Add Product</h5>
                  <button type="button" className="btn-close" onClick={handleModalCancel}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Product Name</label>
                    <input className="form-control" name="name" value={newProduct.name} onChange={handleModalChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">SKU/Barcode</label>
                    <input className="form-control" name="sku" value={newProduct.sku} onChange={handleModalChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <input className="form-control" name="category" value={newProduct.category} onChange={handleModalChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Brand</label>
                    <input className="form-control" name="brand" value={newProduct.brand} onChange={handleModalChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Volume (ml)</label>
                    <input className="form-control" name="volume" value={newProduct.volume} onChange={handleModalChange} type="number" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input className="form-control" name="price" value={newProduct.price} onChange={handleModalChange} type="number" required />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleModalCancel}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList; 