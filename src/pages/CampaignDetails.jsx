import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { campaigns, campaignDetails } from "../data/mockData";

export default function CampaignDetail() {
  const { id } = useParams();
  const campaign = campaigns.find((c) => c.id === Number(id));
  const detail = campaignDetails[id];

  if (!campaign) return <p className="text-gray-500">Campaign not found.</p>;

  return (
    <div>
      <Link to="/campaigns" className="flex items-center gap-1 text-sm text-gray-500 hover:text-brand mb-4">
        <ArrowLeft size={16} /> Back to Campaigns
      </Link>
      <h1 className="text-2xl font-semibold text-gray-900 mb-1">{campaign.subject}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {campaign.status === "sent" ? `Sent ${campaign.sentAt} · ${campaign.recipients} recipients` : "Draft"}
      </p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-semibold text-gray-900">{campaign.openRate}%</div>
          <div className="text-sm text-gray-500">Open Rate</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-semibold text-gray-900">{detail?.clickRate ?? 0}%</div>
          <div className="text-sm text-gray-500">Click Rate</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-semibold text-gray-900">{detail?.opens.length ?? 0}</div>
          <div className="text-sm text-gray-500">Total Opens</div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 font-medium text-gray-700 text-sm">Who opened this</div>
        <table className="w-full text-sm">
          <tbody className="divide-y divide-gray-100">
            {detail?.opens.map((o, i) => (
              <tr key={i}>
                <td className="px-4 py-3 text-gray-900">{o.name}</td>
                <td className="px-4 py-3 text-gray-500">{o.email}</td>
                <td className="px-4 py-3 text-gray-400 text-right">{o.openedAt}</td>
              </tr>
            ))}
            {!detail?.opens.length && (
              <tr><td className="px-4 py-6 text-center text-gray-400" colSpan={3}>No opens yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}