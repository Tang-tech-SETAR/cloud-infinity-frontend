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

  return (
    <div className="container">
      <h1>Coiler Repeaters Devices</h1>

      <div className="main-layout">
        {/* Form Section */}
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

        {/* Device List Section */}
        <div className="device-list">
          {devices.map(device => (
            <div key={device.id} className="device-card">
              <h2>{device.name}</h2>
              <p><strong>IP:</strong> {device.ip}</p>
              <p><strong>Signal:</strong> {device.signal}%</p>
              <div className="signal-bar">
                <div className="signal-fill" style={{ width: `${device.signal}%` }}></div>
              </div>
              <p><strong>Alarm:</strong> {device.alarm ? '🚨 Triggered' : '✅ None'}</p>
              <p><strong>Uptime:</strong> {device.uptime}</p>
              <p><strong>Temperature:</strong> {device.temperature}</p>
              <p><strong>Last Seen:</strong> {device.last_seen}</p>
              <button onClick={() => deleteDevice(device.id)} className="delete-button">Delete Device</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
