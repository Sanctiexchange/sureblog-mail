import { useState } from "react";
import { X, Search } from "lucide-react";
import { subscribers as initialSubscribers } from "../data/mockData";

function AddSubscriberModal({ onClose, onAdd }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    onAdd({ id: Date.now(), name, email, status: "active", tags: [] });
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">Add Subscriber</h2>
          <button onClick={onClose}><X size={18} className="text-gray-400" /></button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-brand"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
            className="border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-brand"
          />
          <button type="submit" className="bg-brand text-white text-sm font-medium py-2 rounded-md hover:bg-brand-light">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Subscribers() {
  const [subscribers, setSubscribers] = useState(initialSubscribers);
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);

  const filtered = subscribers.filter(
    (s) => s.name.toLowerCase().includes(query.toLowerCase()) || s.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Subscribers</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-brand text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-brand-light"
        >
          Add Subscriber
        </button>
      </div>

      <div className="relative mb-4 max-w-xs">
        <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search subscribers..."
          className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-md outline-none focus:border-brand"
        />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Tags</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((s) => (
              <tr key={s.id}>
                <td className="px-4 py-3 text-gray-900">{s.name || "—"}</td>
                <td className="px-4 py-3 text-gray-500">{s.email}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    s.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                  }`}>
                    {s.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{s.tags.join(", ") || "—"}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-6 text-center text-gray-400">No subscribers found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AddSubscriberModal onClose={() => setShowModal(false)} onAdd={(s) => setSubscribers([s, ...subscribers])} />
      )}
    </div>
  );
}