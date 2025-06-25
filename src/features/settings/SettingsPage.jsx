import React, { useState } from 'react';

const initialSettings = [
  { id: 1, key: 'Currency', value: 'USD' },
  { id: 2, key: 'Timezone', value: 'UTC+0' },
  { id: 3, key: 'Theme', value: 'Light' },
];

const SettingsPage = () => {
  const [settings, setSettings] = useState(initialSettings);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEdit = (id) => {
    setEditingId(id);
    setEditData(settings.find(s => s.id === id));
  };

  const handleDelete = (id) => {
    setSettings(settings.filter(s => s.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = (id) => {
    setSettings(settings.map(s => s.id === id ? { ...editData, id } : s));
    setEditingId(null);
  };

  const handleAdd = () => {
    const newId = settings.length ? Math.max(...settings.map(s => s.id)) + 1 : 1;
    setSettings([...settings, { id: newId, key: '', value: '', isNew: true }]);
    setEditingId(newId);
    setEditData({ id: newId, key: '', value: '' });
  };

  const handleCancel = () => {
    if (editData.isNew) setSettings(settings.filter(s => s.id !== editData.id));
    setEditingId(null);
  };

  return (
    <div className="container bg-white rounded shadow p-4 mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Settings</h2>
        <button className="btn btn-primary" onClick={handleAdd}>Add Setting</button>
      </div>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead className="table-light">
            <tr>
              <th>Key</th>
              <th>Value</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {settings.map(setting => (
              <tr key={setting.id}>
                {editingId === setting.id ? (
                  <>
                    <td><input className="form-control" name="key" value={editData.key} onChange={handleChange} /></td>
                    <td><input className="form-control" name="value" value={editData.value} onChange={handleChange} /></td>
                    <td>
                      <button className="btn btn-success btn-sm me-2" onClick={() => handleSave(setting.id)}>Save</button>
                      <button className="btn btn-secondary btn-sm" onClick={handleCancel}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{setting.key}</td>
                    <td>{setting.value}</td>
                    <td>
                      <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(setting.id)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(setting.id)}>Delete</button>
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

export default SettingsPage; 