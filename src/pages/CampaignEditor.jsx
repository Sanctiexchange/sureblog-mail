import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const templates = [
  {
    name: "Newsletter",
    subject: "This Week in Ideas & Culture",
    content: "<h1>This Week at SureBlog</h1><p>Here's what's new this week...</p><h2>Featured Story</h2><p>...</p>",
  },
  {
    name: "Announcement",
    subject: "Big News from SureBlog",
    content: "<h1>We've got news!</h1><p>We're excited to share...</p>",
  },
  {
    name: "Vendor Spotlight",
    subject: "Vendor Spotlight: [Vendor Name]",
    content: "<h1>Meet [Vendor Name]</h1><p>This week we're spotlighting a vendor from our marketplace...</p>",
  },
  { name: "Blank", subject: "", content: "" },
];

function ConfirmSendDialog({ subject, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-900">Send Campaign?</h2>
          <button onClick={onClose}><X size={18} className="text-gray-400" /></button>
        </div>
        <p className="text-sm text-gray-500 mb-5">
          You're about to send <span className="font-medium text-gray-900">"{subject || "(no subject)"}"</span> to
          all active subscribers. This can't be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 border border-gray-200 text-gray-700 text-sm font-medium py-2 rounded-md hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 bg-brand text-white text-sm font-medium py-2 rounded-md hover:bg-brand-light">
            Yes, Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CampaignEditor() {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  function applyTemplate(t) {
    setSubject(t.subject);
    setContent(t.content);
  }

  function handleSave(status) {
    console.log({ subject, content, status });
    navigate("/campaigns");
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">New Campaign</h1>

      <div className="flex gap-2 mb-6">
        {templates.map((t) => (
          <button key={t.name} onClick={() => applyTemplate(t)}
            className="text-sm px-3 py-1.5 border border-gray-200 rounded-full text-gray-600 hover:border-brand hover:text-brand">
            {t.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Subject line</label>
            <input value={subject} onChange={(e) => setSubject(e.target.value)}
              placeholder="This Week in Ideas & Culture"
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-brand" />
          </div>
          <div className="flex-1 flex flex-col">
            <label className="text-sm font-medium text-gray-700 block mb-1">Content (HTML)</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)}
              placeholder="<h1>Hello subscribers...</h1>"
              className="flex-1 min-h-75 border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-brand font-mono" />
          </div>
          <div className="flex gap-3">
            <button onClick={() => handleSave("draft")}
              className="flex-1 border border-gray-200 text-gray-700 text-sm font-medium py-2 rounded-md hover:bg-gray-50">
              Save Draft
            </button>
            <button onClick={() => setShowConfirm(true)}
              className="flex-1 bg-brand text-white text-sm font-medium py-2 rounded-md hover:bg-brand-light">
              Send Campaign
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <label className="text-sm font-medium text-gray-700 block mb-3">Live Preview</label>
          <div className="border border-gray-100 rounded-md p-4 min-h-75 prose prose-sm max-w-none">
            {content ? <div dangerouslySetInnerHTML={{ __html: content }} /> : <p className="text-gray-400">Start typing to see a preview...</p>}
          </div>
        </div>
      </div>

      {showConfirm && (
        <ConfirmSendDialog subject={subject} onClose={() => setShowConfirm(false)} onConfirm={() => { setShowConfirm(false); handleSave("sent"); }} />
      )}
    </div>
  );
}