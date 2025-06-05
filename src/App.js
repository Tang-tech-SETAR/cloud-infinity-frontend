<div key={device.id} className="device-card">
  <h2>{device.name}</h2>

  <div className="indicator-row"><strong>IP:</strong> {device.ip}</div>

  <div className="indicator-row">
    <strong>Signal:</strong> {device.signal}%
  </div>
  <div className="signal-bar">
    <div className="signal-fill" style={{ width: `${device.signal}%` }}></div>
  </div>

  <div className="indicator-row">
    <strong>Alarm:</strong> {device.alarm ? '🚨 Triggered' : '✅ None'}
  </div>

  <div className="indicator-row"><strong>Uptime:</strong> {device.uptime}</div>
  <div className="indicator-row"><strong>Temperature:</strong> {device.temperature}</div>
  <div className="indicator-row"><strong>Last Seen:</strong> {device.last_seen}</div>

  <button onClick={() => deleteDevice(device.id)} className="delete-button">Delete Device</button>
</div>
