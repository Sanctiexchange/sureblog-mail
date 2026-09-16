import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Send } from "lucide-react";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/subscribers", label: "Subscribers", icon: Users },
  { to: "/campaigns", label: "Campaigns", icon: Send },
];

export default function Sidebar() {
  return (
    <aside className="w-60 bg-brand text-white flex flex-col py-6 px-4">
      <div className="text-lg font-semibold mb-8 px-2">SureBlog Mail</div>
      <nav className="flex flex-col gap-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                isActive ? "bg-brand-light font-medium" : "text-white/70 hover:bg-brand-light/50"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}