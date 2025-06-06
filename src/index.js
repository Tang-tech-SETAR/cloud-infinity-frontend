// index.js
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [devices, setDevices] = useState([]);
  const [newDevice, setNewDevice] = useState({
    name: '', ip: '', signal: '', alarm: false, uptime: '', temperature: '', last_seen: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: '', ip: '' });
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setDevices([
      { id: 1, name: 'Repeater 1', ip: '192.168.1.100', signal: 70, alarm: false, uptime: '10d 03h', temperature: '32°C', last_seen: '2025-06-04 09:28:55' },
      { id: 2, name: 'Repeater 2', ip: '192.168.1.101', signal: 55, alarm: true, uptime: '5d 12h', temperature: '37°C', last_seen: '2025-06-04 09:28:55' }
    ]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewDevice(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const addDevice = () => {
    const device = { ...newDevice, id: Date.now() };
    setDevices(prev => [...prev, device]);
    setNewDevice({ name: '', ip: '', signal: '', alarm: false, uptime: '', temperature: '', last_seen: '' });
  };

  const deleteDevice = (id) => {
    setDevices(prev => prev.filter(device => device.id !== id));
  };

  const startEdit = (device) => {
    setEditingId(device.id);
    setEditData({ name: device.name, ip: device.ip });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const saveEdit = (id) => {
    setDevices(prev => prev.map(device => device.id === id ? { ...device, ...editData } : device));
    setEditingId(null);
  };

  return (
    <div className={darkMode ? 'container dark-mode' : 'container'}>
      <button className="toggle-button" onClick={() => setDarkMode(prev => !prev)}>
        Toggle Dark Mode
      </button>

      <h1>Coiler Repeaters Devices</h1>

      <div className="form-container">
        <h2>Add New Device</h2>
        <input name="name" placeholder="Name" value={newDevice.name} onChange={handleInputChange} />
        <input name="ip" placeholder="IP" value={newDevice.ip} onChange={handleInputChange} />
        <input name="signal" placeholder="Signal" value={newDevice.signal} onChange={handleInputChange} />
        <label>Alarm: <input type="checkbox" name="alarm" checked={newDevice.alarm} onChange={handleInputChange} /></label>
        <input name="uptime" placeholder="Uptime" value={newDevice.uptime} onChange={handleInputChange} />
        <input name="temperature" placeholder="Temperature" value={newDevice.temperature} onChange={handleInputChange} />
        <input name="last_seen" placeholder="Last Seen" value={newDevice.last_seen} onChange={handleInputChange} />
        <button onClick={addDevice}>Add Device</button>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name or IP"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="device-list">
        {devices.filter(device =>
          device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          device.ip.includes(searchQuery)
        ).map(device => (
          <div key={device.id} className="device-card">
            {editingId === device.id ? (
              <>
                <input name="name" value={editData.name} onChange={handleEditChange} />
                <input name="ip" value={editData.ip} onChange={handleEditChange} />
                <button onClick={() => saveEdit(device.id)}>Update</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <div className="device-header">
                  <strong>{device.name}</strong>
                  <span><strong>IP:</strong> {device.ip}</span>
                  <span><strong>Signal:</strong> {device.signal}%</span>
                  <div className="signal-bar">
                    <div className="signal-fill" style={{ width: `${device.signal}%` }}></div>
                  </div>
                  <span><strong>Alarm:</strong> {device.alarm ? '🔔 Triggered' : '✅ None'}</span>
                  <span><strong>Uptime:</strong> {device.uptime}</span>
                  <span><strong>Temp:</strong> {device.temperature}</span>
                </div>
                <div className="indicator-row">
                  <strong>Last Seen:</strong> {device.last_seen}
                </div>
                <button className="edit-button" onClick={() => startEdit(device)}>Edit</button>
                <button className="delete-button" onClick={() => deleteDevice(device.id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
