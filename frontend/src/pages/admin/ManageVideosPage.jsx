import React, { useState, useEffect } from 'react';
import { getVideos, createVideo, deleteVideo } from '../../services/api';

export const ManageVideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [form, setForm] = useState({ title: '', instagramUrl: '', description: '' });
  const [loading, setLoading] = useState(false);

  const fetchVideoList = async () => {
    const res = await getVideos();
    setVideos(res?.data || []);
  };

  useEffect(() => {
    fetchVideoList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createVideo(form);
      setForm({ title: '', instagramUrl: '', description: '' });
      fetchVideoList();
    } catch (err) {
      alert('Error saving video link');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this video?')) {
      await deleteVideo(id);
      fetchVideoList();
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Instagram Videos</h1>

      {/* Add Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-8 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            required
            className="w-full border rounded-lg p-2.5"
            placeholder="e.g. Morning Routine Combo Reel"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Instagram Post / Reel URL</label>
          <input
            type="url"
            required
            className="w-full border rounded-lg p-2.5"
            placeholder="https://www.instagram.com/reel/C_xxxxxx/"
            value={form.instagramUrl}
            onChange={(e) => setForm({ ...form, instagramUrl: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description (Optional)</label>
          <input
            type="text"
            className="w-full border rounded-lg p-2.5"
            placeholder="Short details..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-emerald-600 text-white font-bold px-6 py-2.5 rounded-lg hover:bg-emerald-700"
        >
          {loading ? 'Adding...' : 'Embed Instagram Video'}
        </button>
      </form>

      {/* Existing List */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-bold mb-4">Active Embedded Videos</h2>
        <div className="space-y-4">
          {videos.map((vid) => (
            <div key={vid._id} className="flex justify-between items-center border-b pb-3">
              <div>
                <p className="font-semibold text-gray-800">{vid.title}</p>
                <a href={vid.instagramUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-600 underline">
                  {vid.instagramUrl}
                </a>
              </div>
              <button
                onClick={() => handleDelete(vid._id)}
                className="bg-red-500 text-white text-xs px-3 py-1.5 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};