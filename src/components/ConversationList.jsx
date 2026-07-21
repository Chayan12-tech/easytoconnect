import { conversations } from "../data/conversations";
import { useState } from "react";


function ConversationList() {
    const [activeChat, setActiveChat] = useState(1);
  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">

      {/* Header */}
      <div className="p-5 border-b">
        <h2 className="text-xl font-semibold text-gray-800">
          Conversations
        </h2>
      </div>

      {/* Search */}
      <div className="p-4">
       <div className="relative">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>

  <input
    type="text"
    placeholder="Search conversations..."
    className="w-full rounded-2xl border border-gray-200 bg-gray-50 pl-12 pr-4 py-3 outline-none transition-all duration-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
  />
</div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-2">

        {conversations.map((chat) => (

<div
  key={chat.id}
  onClick={() => setActiveChat(chat.id)}
  className={`
    mx-2 rounded-2xl p-4 cursor-pointer
    transition-all duration-200
    ${
      activeChat === chat.id
        ? "bg-blue-50 ring-1 ring-blue-200 shadow-sm"
        : "hover:bg-gray-50"
    }
  `}
>
  <div className="flex items-center gap-3">

    {/* Avatar */}
    <div className="relative flex-shrink-0">
      <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
        {chat.name.charAt(0)}
      </div>

      {chat.online && (
        <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white bg-green-500"></div>
      )}
    </div>

    {/* Right Content */}
    <div className="flex-1 min-w-0">

      {/* Name + Time */}
      <div className="flex items-start justify-between gap-3">

        <h3 className="font-semibold text-gray-900 truncate">
          {chat.name}
        </h3>

        <span className="text-xs text-gray-500 flex-shrink-0">
          {chat.time}
        </span>

      </div>

      {/* Message + Badge */}
      <div className="mt-1 flex items-center justify-between gap-3">

        <p className="text-sm text-gray-500 truncate">
          {chat.message}
        </p>

        {chat.unread > 0 && (
          <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
            {chat.unread}
          </span>
        )}

      </div>

    </div>

  </div>
</div>

        ))}

      </div>

    </div>
  );
}

export default ConversationList;