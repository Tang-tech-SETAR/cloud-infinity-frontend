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
