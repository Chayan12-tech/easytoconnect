import { Bell, Globe, ChevronDown } from "lucide-react";

function TopBar() {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">

      {/* Left */}
      <div className="flex items-center gap-8">

        <h1 className="text-xl font-bold text-blue-600">
          EasyToConnect
        </h1>

        <button className="flex items-center gap-2 hover:text-blue-600 transition">

          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>

          <span className="font-medium text-gray-700">
            +1 (646) 555-1234
          </span>

          <ChevronDown size={18} className="text-gray-500" />

        </button>

      </div>

      {/* Right */}
      <div className="flex items-center gap-6">

        <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition">
          <Globe size={20} />
          <span className="text-sm font-medium">EN</span>
        </button>

        <button className="relative text-gray-600 hover:text-blue-600 transition">

          <Bell size={21} />

          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500"></span>

        </button>

        <button className="flex items-center gap-2 hover:text-blue-600 transition">

          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
            A
          </div>

          <span className="font-medium text-gray-700">
            Admin
          </span>

          <ChevronDown size={18} />

        </button>

      </div>

    </div>
  );
}

export default TopBar;