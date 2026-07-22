import { Phone, MoreVertical } from "lucide-react";

function ChatHeader() {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">

      {/* Left */}
      <div className="flex items-center gap-3">

        <div className="relative">

          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center font-semibold text-base shadow-sm">
            J
          </div>

          

        </div>

        <div>

          <h3 className="font-semibold text-gray-900 leading-none">
            John Smith
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            +1 (234) 567-8910
          </p>

        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-2">

        <button className="w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center">
          <Phone size={19} className="text-gray-600" />
        </button>

        <button className="w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center">
          <MoreVertical size={19} className="text-gray-600" />
        </button>

      </div>

    </div>
  );
}

export default ChatHeader;