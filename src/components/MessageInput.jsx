import { Smile, Paperclip, Send } from "lucide-react";

function MessageInput() {
  return (
    <div className="bg-white border-t border-gray-200 p-4">

      <div className="flex items-center gap-3">

        <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition">
          <Smile size={20} />
        </button>

        <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition">
          <Paperclip size={20} />
        </button>

        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-3 rounded-full border border-gray-300 outline-none focus:border-blue-500"
        />

        <button className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition">
          <Send size={20} />
        </button>

      </div>

    </div>
  );
}

export default MessageInput;