import { Phone, MoreVertical } from "lucide-react";

function ChatHeader() {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">

      {/* Left */}
      <div className="flex items-center gap-3">

        <div className="relative">

          <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            J
          </div>

          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>

        </div>

        <div>

          <h3 className="font-semibold text-gray-800">
            John Smith
          </h3>

          <p className="text-sm text-green-600">
            Online
          </p>

        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-2">

        <button className="w-10 h-10 rounded-lg hover:bg-gray-100 transition flex items-center justify-center">
          <Phone size={20} className="text-gray-700" />
        </button>

        <button className="w-10 h-10 rounded-lg hover:bg-gray-100 transition flex items-center justify-center">
          <MoreVertical size={20} className="text-gray-700" />
        </button>

      </div>

    </div>
  );
}

export default ChatHeader;