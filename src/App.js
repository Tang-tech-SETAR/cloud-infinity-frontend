import React, { useState, useEffect } from "react";

const apiUrl = "http://127.0.0.1:5000";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [devices, setDevices] = useState([]);
  const [newDevice, setNewDevice] = useState({ name: "", ip: "" });

  const fetchDevices = () => {
    fetch(`${apiUrl}/api/devices`)
      .then(res => res.json())
      .then(setDevices);
  };

  const handleLogin = () => {
    fetch(`${apiUrl}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginForm)
    })
      .then(res => {
        if (!res.ok) throw new Error("Invalid credentials");
        return res.json();
      })
      .then(() => setLoggedIn(true))
      .catch(() => alert("Login failed"));
  };

  const handleAdd = () => {
    fetch(`${apiUrl}/api/devices`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newDevice)
    }).then(() => {
      setNewDevice({ name: "", ip: "" });
      fetchDevices();
    });
  };

  const handleDelete = id => {
    fetch(`${apiUrl}/api/devices/${id}`, { method: "DELETE" }).then(fetchDevices);
  };

  useEffect(() => {
    if (loggedIn) {
      fetchDevices();
    }
  }, [loggedIn]);

  if (!loggedIn) {
    return (
      <div style={{ padding: 40, fontFamily: "sans-serif" }}>
        <h2>Login to Cloud Infinity</h2>
        <input
          placeholder="Username"
          value={loginForm.username}
          onChange={e => setLoginForm({ ...loginForm, username: e.target.value })}
          style={{ display: "block", marginBottom: 8 }}
        />
        <input
          placeholder="Password"
          type="password"
          value={loginForm.password}
          onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
          style={{ display: "block", marginBottom: 8 }}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 32, fontFamily: "sans-serif", background: "#f8fbff" }}>
      <h1 style={{ color: "#007bff" }}>Cloud Infinity Device Dashboard</h1>
      <button onClick={fetchDevices}>Refresh</button>

      <table border="1" cellPadding="8" style={{ marginTop: 16 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>IP</th>
            <th>Signal</th>
            <th>Uptime</th>
            <th>Temperature</th>
            <th>Last Seen</th>
            <th>Alarm</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {devices.map(d => (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>{d.ip}</td>
              <td>{d.signal}</td>
              <td>{d.uptime}</td>
              <td>{d.temperature}</td>
              <td>{d.last_seen}</td>
              <td style={{ color: d.alarm ? "red" : "green" }}>
                {d.alarm ? "Alarm" : "OK"}
              </td>
              <td>
                <button onClick={() => handleDelete(d.id)} style={{ color: "red" }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: 24 }}>Add Device</h3>
      <input
        placeholder="Name"
        value={newDevice.name}
        onChange={e => setNewDevice({ ...newDevice, name: e.target.value })}
      />
      <input
        placeholder="IP"
        value={newDevice.ip}
        onChange={e => setNewDevice({ ...newDevice, ip: e.target.value })}
      />
      <button onClick={handleAdd}>Add</button>

      <p style={{ marginTop: 40, color: "#777" }}>Powered by Flask & React • 2025</p>
    </div>
  );
}

export default App;
