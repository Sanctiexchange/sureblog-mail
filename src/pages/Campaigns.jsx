import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CampaignEditor() {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  function handleSave(status) {
    console.log({ subject, content, status });
    navigate("/campaigns");
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">New Campaign</h1>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Subject line</label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="This Week in Ideas & Culture"
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-brand"
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label className="text-sm font-medium text-gray-700 block mb-1">Content (HTML)</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="<h1>Hello subscribers...</h1>"
              className="flex-1 min-h-75 border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-brand font-mono"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => handleSave("draft")}
              className="flex-1 border border-gray-200 text-gray-700 text-sm font-medium py-2 rounded-md hover:bg-gray-50"
            >
              Save Draft
            </button>
            <button
              onClick={() => handleSave("sent")}
              className="flex-1 bg-brand text-white text-sm font-medium py-2 rounded-md hover:bg-brand-light"
            >
              Send Campaign
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <label className="text-sm font-medium text-gray-700 block mb-3">Live Preview</label>
          <div className="border border-gray-100 rounded-md p-4 min-h-75 prose prose-sm max-w-none">
            {content ? (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
              <p className="text-gray-400">Start typing to see a preview...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}