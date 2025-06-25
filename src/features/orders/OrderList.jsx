import React, { useState } from 'react';

const initialOrders = [
  { id: 1, orderNo: 'ORD-001', customer: 'John Doe', total: 500 },
  { id: 2, orderNo: 'ORD-002', customer: 'Jane Smith', total: 1200 },
  { id: 3, orderNo: 'ORD-003', customer: 'Mike Brown', total: 300 },
];

const OrderList = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEdit = (id) => {
    setEditingId(id);
    setEditData(orders.find(o => o.id === id));
  };

  const handleDelete = (id) => {
    setOrders(orders.filter(o => o.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = (id) => {
    setOrders(orders.map(o => o.id === id ? { ...editData, id } : o));
    setEditingId(null);
  };

  const handleAdd = () => {
    const newId = orders.length ? Math.max(...orders.map(o => o.id)) + 1 : 1;
    setOrders([...orders, { id: newId, orderNo: '', customer: '', total: '', isNew: true }]);
    setEditingId(newId);
    setEditData({ id: newId, orderNo: '', customer: '', total: '' });
  };

  const handleCancel = () => {
    if (editData.isNew) setOrders(orders.filter(o => o.id !== editData.id));
    setEditingId(null);
  };

  return (
    <div className="container bg-white rounded shadow p-4 mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Orders</h2>
        <button className="btn btn-primary" onClick={handleAdd}>Add Order</button>
      </div>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead className="table-light">
            <tr>
              <th>Order No</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                {editingId === order.id ? (
                  <>
                    <td><input className="form-control" name="orderNo" value={editData.orderNo} onChange={handleChange} /></td>
                    <td><input className="form-control" name="customer" value={editData.customer} onChange={handleChange} /></td>
                    <td><input className="form-control" name="total" value={editData.total} onChange={handleChange} type="number" /></td>
                    <td>
                      <button className="btn btn-success btn-sm me-2" onClick={() => handleSave(order.id)}>Save</button>
                      <button className="btn btn-secondary btn-sm" onClick={handleCancel}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{order.orderNo}</td>
                    <td>{order.customer}</td>
                    <td>{order.total}</td>
                    <td>
                      <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(order.id)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(order.id)}>Delete</button>
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

export default OrderList; 