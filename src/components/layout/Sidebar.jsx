import { useState } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Send, Settings as SettingsIcon, Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/subscribers", label: "Subscribers", icon: Users },
  { to: "/campaigns", label: "Campaigns", icon: Send },
  { to: "/settings", label: "Settings", icon: SettingsIcon },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="md:hidden flex items-center justify-between bg-brand text-white px-4 py-3">
        <span className="font-semibold">SureBlog Mail</span>
        <button onClick={() => setOpen(true)}><Menu size={22} /></button>
      </div>

      {open && <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setOpen(false)} />}

      <aside
        className={`fixed md:static top-0 left-0 h-full w-60 bg-brand text-white flex flex-col py-6 px-4 z-50 transform transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between mb-8 px-2">
          <span className="text-lg font-semibold">SureBlog Mail</span>
          <button className="md:hidden" onClick={() => setOpen(false)}><X size={20} /></button>
        </div>
        <nav className="flex flex-col gap-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => setOpen(false)}
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
    </>
  );
}