import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import './App.css';

function AddSite() {
  const [formData, setFormData] = useState({
    site_name: '',
    repeater_type: '',
    repeater_sn: '',
    zone: '',
    maintainer: '',
    address: '',
    longitude: '',
    latitude: '',
    description: '',
  });

  const [files, setFiles] = useState({
    location_picture: null,
    site_layout: null,
    raising_diagram: null,
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFiles((prev) => ({ ...prev, [name]: files[0] }));
  };

  const uploadFile = async (file, folder) => {
    const path = `${folder}/${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage.from('site-assets').upload(path, file);
    if (error) throw error;
    return data.path;
  };

  const handleSubmit = async () => {
    if (!formData.site_name || !formData.zone || !formData.maintainer) {
      alert('Site name, Zone, and Maintainer are required.');
      return;
    }

    setLoading(true);

    try {
      const paths = {};

      if (files.location_picture) {
        paths.location_picture_url = await uploadFile(files.location_picture, 'pictures');
      }
      if (files.site_layout) {
        paths.site_layout_url = await uploadFile(files.site_layout, 'layouts');
      }
      if (files.raising_diagram) {
        paths.raising_diagram_url = await uploadFile(files.raising_diagram, 'diagrams');
      }

      const { error } = await supabase.from('Sites').insert([{
        site_class: 'Online',
        ...formData,
        ...paths
      }]);

      if (error) throw error;

      alert('✅ Site added successfully');
      setFormData({
        site_name: '', repeater_type: '', repeater_sn: '', zone: '', maintainer: '',
        address: '', longitude: '', latitude: '', description: ''
      });
      setFiles({ location_picture: null, site_layout: null, raising_diagram: null });
    } catch (err) {
      alert('❌ Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Site</h2>
      <input name="site_name" placeholder="* Site Name" value={formData.site_name} onChange={handleInputChange} required />
      <input name="repeater_type" placeholder="Repeater Type" value={formData.repeater_type} onChange={handleInputChange} />
      <input name="repeater_sn" placeholder="Repeater SN" value={formData.repeater_sn} onChange={handleInputChange} />
      <input name="zone" placeholder="* Zone" value={formData.zone} onChange={handleInputChange} required />
      <input name="maintainer" placeholder="* Maintainer" value={formData.maintainer} onChange={handleInputChange} required />
      <input name="address" placeholder="Address" value={formData.address} onChange={handleInputChange} />
      <input name="longitude" placeholder="Longitude" value={formData.longitude} onChange={handleInputChange} />
      <input name="latitude" placeholder="Latitude" value={formData.latitude} onChange={handleInputChange} />
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} />

      <label>Location Picture: <input name="location_picture" type="file" onChange={handleFileChange} /></label>
      <label>Site Layout: <input name="site_layout" type="file" onChange={handleFileChange} /></label>
      <label>Raising Diagram: <input name="raising_diagram" type="file" onChange={handleFileChange} /></label>

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Adding...' : 'Add Site'}
      </button>
    </div>
  );
}

export default AddSite;
