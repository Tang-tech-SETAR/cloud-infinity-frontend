import './App.css';
import React, { useState, useEffect } from 'react';

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
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    setDevices([
      {
        id: 1,
        name: "Repeater A",
        ip: "192.168.1.100",
        signal: 70,
        alarm: false,
        uptime: "10d 03h",
        temperature: "32°C",
        last_seen: "2025-06-04 09:28:55"
      },
      {
        id: 2,
        name: "Repeater B",
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

  const addOrUpdateDevice = () => {
    if (editId) {
      setDevices(prev =>
        prev.map(dev => (dev.id === editId ? { ...newDevice, id: editId } : dev))
      );
      setEditId(null);
    } else {
      const device = {
        ...newDevice,
        id: Date.now()
      };
      setDevices(prev => [...prev, device]);
    }

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

  const editDevice = (device) => {
    setNewDevice(device);
    setEditId(device.id);
  };

  const deleteDevice = (id) => {
    setDevices(prev => prev.filter(device => device.id !== id));
    if (editId === id) {
      setEditId(null);
      setNewDevice({
        name: '',
        ip: '',
        signal: '',
        alarm: false,
        uptime: '',
        temperature: '',
        last_seen: ''
      });
    }
  };

  return (
    <div className="container">
      <h1>Coiler Repeaters Devices</h1>

      <div className="main-layout">
        <div className="form-container">
          <h2>{editId ? 'Edit Device' : 'Add New Device'}</h2>
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
          <button onClick={addOrUpdateDevice}>{editId ? 'Update Device' : 'Add Device'}</button>
        </div>

        <div className="device-list">
          {devices.map(device => (
            <div key={device.id} className="device-card-horizontal">
              <strong>{device.name}</strong>
              <span><strong>IP:</strong> {device.ip}</span>
              <span><strong>Signal:</strong> {device.signal}%</span>
              <span><strong>Alarm:</strong> {device.alarm ? '🚨' : '✅'}</span>
              <span><strong>Uptime:</strong> {device.uptime}</span>
              <span><strong>Temp:</strong> {device.temperature}</span>
              <span><strong>Last:</strong> {device.last_seen}</span>
              <button onClick={() => editDevice(device)} className="edit-button">Edit</button>
              <button onClick={() => deleteDevice(device.id)} className="delete-button">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
