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
        name: "Booster A",
        ip: "192.168.1.100",
        signal: 70,
        alarm: false,
        uptime: "10d 03h",
        temperature: "32°C",
        last_seen: "2025-06-04 09:28:55"
      },
      {
        id: 2,
        name: "Booster B",
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
      id: devices.length + 1
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

  return (
    <div className="container">

      <h1>Coiler Booster Devices</h1>

      {/* Add Device Form */}
      <div className="form-container">

        <h2>Add New Device</h2>
        <input name="name" placeholder="Name" value={newDevice.name} onChange={handleInputChange} /> <br />
        <input name="ip" placeholder="IP" value={newDevice.ip} onChange={handleInputChange} /> <br />
        <input name="signal" placeholder="Signal" value={newDevice.signal} onChange={handleInputChange} /> <br />
        <label>
          Alarm:
          <input type="checkbox" name="alarm" checked={newDevice.alarm} onChange={handleInputChange} />
        </label><br />
        <input name="uptime" placeholder="Uptime" value={newDevice.uptime} onChange={handleInputChange} /> <br />
        <input name="temperature" placeholder="Temperature" value={newDevice.temperature} onChange={handleInputChange} /> <br />
        <input name="last_seen" placeholder="Last Seen" value={newDevice.last_seen} onChange={handleInputChange} /> <br />
        <button onClick={addDevice}>Add Device</button>
      </div>

      {/* Device List */}
      {devices.map(device => (
        <div key={device.id} className="device-card">

          <h2>{device.name}</h2>
          <p><strong>IP:</strong> {device.ip}</p>
          <p><strong>Signal:</strong> {device.signal}%</p>
          <p><strong>Alarm:</strong> {device.alarm ? '🚨 Triggered' : '✅ None'}</p>
          <p><strong>Uptime:</strong> {device.uptime}</p>
          <p><strong>Temperature:</strong> {device.temperature}</p>
          <p><strong>Last Seen:</strong> {device.last_seen}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
