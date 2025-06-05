import React, { useEffect, useState } from 'react';

function App() {
  const [devices, setDevices] = useState([]);

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

  return (
    <div style={{ padding: '20px' }}>
      <h1>Coiler Booster Devices</h1>
      {devices.map(device => (
        <div key={device.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
          <h2>{device.name}</h2>
          <p><strong>IP:</strong> {device.ip}</p>
          <p><strong>Signal:</strong> {device.signal}%</p>
          <p><strong>Alarm:</strong> {device.alarm ? '⚠️ Active' : '✅ None'}</p>
          <p><strong>Uptime:</strong> {device.uptime}</p>
          <p><strong>Temperature:</strong> {device.temperature}</p>
          <p><strong>Last Seen:</strong> {device.last_seen}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
