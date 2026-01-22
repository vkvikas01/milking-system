import axios from "axios";
import React, { useEffect, useState } from "react";

function History() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "https://backend-fv9m.onrender.com/api";



  const fetchSessions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/sessions`);
      setSessions(response.data);
    } catch (err) {
      setError("Failed to load history");
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);



  if (loading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <p className="text-lg font-semibold">Loading history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  if (!sessions.length) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <p className="text-gray-500">No milking sessions found</p>
      </div>
    );
  }



  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold mb-6">Milking History</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-black text-white text-left">
              <th className="p-3">Date</th>
              <th className="p-3">Start Time</th>
              <th className="p-3">End Time</th>
              <th className="p-3">Duration</th>
              <th className="p-3">Milk (L)</th>
            </tr>
          </thead>

          <tbody>
            {sessions.map((session) => (
              <tr
                key={session._id}
                className="border-b last:border-none hover:bg-gray-100 transition"
              >
                <td className="p-3">
                  {formatDate(session.start_time)}
                </td>
                <td className="p-3">
                  {formatTime(session.start_time)}
                </td>
                <td className="p-3">
                  {formatTime(session.end_time)}
                </td>
                <td className="p-3">
                  {formatDuration(session.duration)}
                </td>
                <td className="p-3 font-semibold">
                  {session.milk_quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default History;



function formatDate(date) {
  return new Date(date).toLocaleDateString();
}

function formatTime(date) {
  return new Date(date).toLocaleTimeString();
}

function formatDuration(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

