import { Mail, Palette } from "lucide-react";

const senderInfo = {
  name: "SureBlog Media",
  email: "newsletter@sureblog.media",
};

const brand = {
  primary: "#1E3A5F",
  light: "#3B5B82",
  accent: "#C9A227",
};

export default function Settings() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Settings</h1>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Mail size={18} className="text-brand" />
          <h2 className="font-medium text-gray-900">Sender Information</h2>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          This is who your campaigns appear to come from. Read-only for now — will be editable once accounts are connected.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-500 block mb-1">Sender Name</label>
            <div className="border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700 bg-gray-50">
              {senderInfo.name}
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">Sender Email</label>
            <div className="border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700 bg-gray-50">
              {senderInfo.email}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Palette size={18} className="text-brand" />
          <h2 className="font-medium text-gray-900">Brand</h2>
        </div>
        <p className="text-sm text-gray-500 mb-4">Colors used across the dashboard and email templates.</p>
        <div className="flex gap-4">
          {Object.entries(brand).map(([key, hex]) => (
            <div key={key} className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full border border-gray-200" style={{ backgroundColor: hex }} />
              <span className="text-xs text-gray-500 capitalize">{key}</span>
              <span className="text-xs text-gray-400 font-mono">{hex}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-4">
          <div className="w-16 h-16 rounded-md bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-xs text-gray-400 text-center">
            Logo
          </div>
          <p className="text-sm text-gray-500">Logo upload placeholder — will connect to file storage later.</p>
        </div>
      </div>
    </div>
  );
}