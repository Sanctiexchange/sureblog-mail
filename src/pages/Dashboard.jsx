import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Users, Mail, TrendingUp } from "lucide-react";
import { subscribers, campaigns, statsHistory } from "../data/mockData";

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 flex items-center gap-4">
      <div className="bg-brand/10 text-brand p-3 rounded-md">
        <Icon size={22} />
      </div>
      <div>
        <div className="text-2xl font-semibold text-gray-900">{value}</div>
        <div className="text-sm text-gray-500">{label}</div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const activeSubs = subscribers.filter((s) => s.status === "active").length;
  const sentCampaigns = campaigns.filter((c) => c.status === "sent").length;
  const avgOpenRate = Math.round(
    campaigns.filter((c) => c.status === "sent").reduce((sum, c) => sum + c.openRate, 0) / sentCampaigns
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard icon={Users} label="Active Subscribers" value={activeSubs} />
        <StatCard icon={Mail} label="Campaigns Sent" value={sentCampaigns} />
        <StatCard icon={TrendingUp} label="Avg. Open Rate" value={`${avgOpenRate}%`} />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-sm font-medium text-gray-700 mb-4">Opens over time</h2>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={statsHistory}>
            <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
            <YAxis stroke="#9CA3AF" fontSize={12} />
            <Tooltip />
            <Line type="monotone" dataKey="opens" stroke="#1E3A5F" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}