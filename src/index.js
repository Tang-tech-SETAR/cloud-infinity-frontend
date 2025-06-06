import './App.css';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  const [devices, setDevices] = useState([]);
  const [newDevice, setNewDevice] = useState({
    name: '',
    ip: '',
    signal: '',
    alarm: false,
    uptime: '',
    temperature: '',
    last_seen: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: '', ip: '' });

  useEffect(() => {
    setDevices([
      {
        id: 1,
        name: "A",
        ip: "192.168.1.100",
        signal: 70,
        alarm: false,
        uptime: "10d 03h",
        temperature: "32°C",
        last_seen: "2025-06-04 09:28:55"
      },
      {
        id: 2,
        name: "B",
        ip: "192.168.1.101",
        signal: 55,
        alarm: true,
        uptime: "5d 12h",
        temperature: "37°C",
        last_seen: "2025-06-04 09:28:55"
      }
    ]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewDevice(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const addDevice = () => {
    const device = {
      ...newDevice,
      id: Date.now()
    };
    setDevices(prev => [...prev, device]);
    setNewDevice({
      name: '',
      ip: '',
      signal: '',
      alarm: false,
      uptime: '',
      temperature: '',
      last_seen: ''
    });
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
    setDevices(prev =>
      prev.map(device =>
        device.id === id ? { ...device, ...editData } : device
      )
    );
    setEditingId(null);
  };

  return (
    <div className="container">
      <h1>Coiler Repeaters Devices</h1>

      <div className="form-container">
        <h2>Add New Device</h2>
        <input name="name" placeholder="Name" value={newDevice.name} onChange={handleInputChange} />
        <input name="ip" placeholder="IP" value={newDevice.ip} onChange={handleInputChange} />
        <input name="signal" placeholder="Signal" value={newDevice.signal} onChange={handleInputChange} />
        <label>
          Alarm:
          <input type="checkbox" name="alarm" checked={newDevice.alarm} onChange={handleInputChange} />
        </label>
        <input name="uptime" placeholder="Uptime" value={newDevice.uptime} onChange={handleInputChange} />
        <input name="temperature" placeholder="Temperature" value={newDevice.temperature} onChange={handleInputChange} />
        <input name="last_seen" placeholder="Last Seen" value={newDevice.last_seen} onChange={handleInputChange} />
        <button onClick={addDevice}>Add Device</button>
      </div>

      <div className="device-list">
        {devices.map(device => (
          <div key={device.id} className="device-card">
            {editingId === device.id ? (
              <>
                <input
                  name="name"
                  value={editData.name}
                  onChange={handleEditChange}
                  placeholder="New Name"
                />
                <input
                  name="ip"
                  value={editData.ip}
                  onChange={handleEditChange}
                  placeholder="New IP"
                />
                <button onClick={() => saveEdit(device.id)}>Update</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <div className="repeater-line">
                  <strong>Repeater {device.name}</strong>&nbsp;&nbsp;
                  <strong>IP:</strong> {device.ip}&nbsp;&nbsp;
                  <strong>Signal:</strong> {device.signal}%&nbsp;&nbsp;
                  <div className="signal-bar">
                    <div className="signal-fill" style={{ width: `${device.signal}%` }}></div>
                  </div>
                  &nbsp;&nbsp;<strong>Alarm:</strong> {device.alarm ? '🚨 Triggered' : '✅ None'}
                  &nbsp;&nbsp;<strong>Uptime:</strong> {device.uptime}
                  &nbsp;&nbsp;<strong>Temp:</strong> {device.temperature}
                </div>
                <div className="repeater-footer">
                  <strong>Last Seen:</strong> {device.last_seen}
                  <button onClick={() => startEdit(device)}>Edit</button>
                  <button onClick={() => deleteDevice(device.id)} className="delete-button">Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
