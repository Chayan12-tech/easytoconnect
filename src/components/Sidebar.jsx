import {
  MessageSquare,
  Phone,
  Voicemail,
  Users,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  { name: "Messages", icon: MessageSquare },
  { name: "Calls", icon: Phone },
  { name: "Voicemail", icon: Voicemail },
  { name: "Contacts", icon: Users },
  { name: "Usage & Plan", icon: BarChart3 },
  { name: "Settings", icon: Settings },
];

function Sidebar() {
  return (
    <div className="w-56 h-screen bg-white border-r border-gray-200 flex flex-col">
        
<div className="py-5 border-b px-6">
  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
    Navigation
  </p>
</div>

      {/* Menu */}
      <div className="flex-1 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              className="w-full flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>

      {/* Logout */}
      <div className="border-t p-4">
        <button className="w-full flex items-center gap-3 px-2 py-2 text-red-500 hover:bg-red-50 rounded-lg transition">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;