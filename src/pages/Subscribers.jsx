import { useState } from "react";
import { X, Search, Trash2, Tag } from "lucide-react";
import { subscribers as initialSubscribers } from "../data/mockData";
import { useToast } from "../context/ToastContext";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function SubscriberModal({ initialData, onClose, onSave, onDelete }) {
  const [name, setName] = useState(initialData?.name || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [status, setStatus] = useState(initialData?.status || "active");
  const [error, setError] = useState("");
  const isEditing = Boolean(initialData);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return setError("Email is required.");
    if (!EMAIL_REGEX.test(email)) return setError("Enter a valid email address.");
    onSave({
      id: initialData?.id ?? Date.now(),
      name: name.trim(),
      email: email.trim(),
      status,
      tags: initialData?.tags || [],
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">{isEditing ? "Edit Subscriber" : "Add Subscriber"}</h2>
          <button onClick={onClose}><X size={18} className="text-gray-400" /></button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-brand"
          />
          <div>
            <input
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              placeholder="Email"
              className={`w-full border rounded-md px-3 py-2 text-sm outline-none focus:border-brand ${
                error ? "border-red-400" : "border-gray-200"
              }`}
            />
            {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
          </div>
          {isEditing && (
            <select value={status} onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-brand">
              <option value="active">Active</option>
              <option value="unsubscribed">Unsubscribed</option>
            </select>
          )}
          <button type="submit" className="bg-brand text-white text-sm font-medium py-2 rounded-md hover:bg-brand-light">
            {isEditing ? "Save Changes" : "Add"}
          </button>
          {isEditing && (
            <button type="button" onClick={() => { onDelete(initialData.id); onClose(); }}
              className="text-red-600 text-sm font-medium py-2 rounded-md hover:bg-red-50">
              Delete Subscriber
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default function Subscribers() {
  const [subscribers, setSubscribers] = useState(initialSubscribers);
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingSubscriber, setEditingSubscriber] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const { addToast } = useToast();

  const filtered = subscribers.filter(
    (s) => s.name.toLowerCase().includes(query.toLowerCase()) || s.email.toLowerCase().includes(query.toLowerCase())
  );

  function handleSave(data) {
    const isNew = !subscribers.some((s) => s.id === data.id);
    setSubscribers((prev) => (isNew ? [data, ...prev] : prev.map((s) => (s.id === data.id ? data : s))));
    addToast(isNew ? "Subscriber added." : "Subscriber updated.");
  }

  function handleDelete(id) {
    setSubscribers((prev) => prev.filter((s) => s.id !== id));
    setSelectedIds((prev) => prev.filter((sid) => sid !== id));
    addToast("Subscriber deleted.", "error");
  }

  function toggleSelect(id) {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]));
  }

  function toggleSelectAll() {
    setSelectedIds((prev) => (prev.length === filtered.length ? [] : filtered.map((s) => s.id)));
  }

  function applyTagToSelected() {
    if (!tagInput.trim()) return;
    setSubscribers((prev) =>
      prev.map((s) => (selectedIds.includes(s.id) && !s.tags.includes(tagInput) ? { ...s, tags: [...s.tags, tagInput.trim()] } : s))
    );
    addToast(`Tag "${tagInput.trim()}" applied to ${selectedIds.length} subscriber(s).`);
    setTagInput("");
    setSelectedIds([]);
  }

  function bulkDelete() {
    const count = selectedIds.length;
    setSubscribers((prev) => prev.filter((s) => !selectedIds.includes(s.id)));
    setSelectedIds([]);
    addToast(`${count} subscriber(s) deleted.`, "error");
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Subscribers</h1>
        <button onClick={() => { setEditingSubscriber(null); setShowModal(true); }}
          className="bg-brand text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-brand-light">
          Add Subscriber
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="relative max-w-xs w-full">
          <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search subscribers..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-md outline-none focus:border-brand" />
        </div>

        {selectedIds.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 bg-brand/5 border border-brand/20 rounded-md px-3 py-1.5">
            <span className="text-sm text-brand font-medium">{selectedIds.length} selected</span>
            <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder="Tag name"
              className="border border-gray-200 rounded-md px-2 py-1 text-sm outline-none focus:border-brand w-28" />
            <button onClick={applyTagToSelected} className="flex items-center gap-1 text-sm text-brand hover:underline">
              <Tag size={14} /> Apply
            </button>
            <button onClick={bulkDelete} className="flex items-center gap-1 text-sm text-red-600 hover:underline">
              <Trash2 size={14} /> Delete
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500">
            <tr>
              <th className="px-4 py-3 w-10">
                <input type="checkbox" checked={filtered.length > 0 && selectedIds.length === filtered.length} onChange={toggleSelectAll} />
              </th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Tags</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <input type="checkbox" checked={selectedIds.includes(s.id)} onChange={() => toggleSelect(s.id)} />
                </td>
                <td className="px-4 py-3 text-gray-900 cursor-pointer" onClick={() => { setEditingSubscriber(s); setShowModal(true); }}>{s.name || "—"}</td>
                <td className="px-4 py-3 text-gray-500 cursor-pointer" onClick={() => { setEditingSubscriber(s); setShowModal(true); }}>{s.email}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${s.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {s.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{s.tags.join(", ") || "—"}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-6 text-center text-gray-400">No subscribers found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <SubscriberModal initialData={editingSubscriber} onClose={() => setShowModal(false)} onSave={handleSave} onDelete={handleDelete} />
      )}
    </div>
  );
}