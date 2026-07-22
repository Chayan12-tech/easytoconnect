import { useMemo, useState } from "react";
import { Search, Plus, Star } from "lucide-react";

const avatarColors = [
  "bg-blue-600",
  "bg-purple-600",
  "bg-emerald-600",
  "bg-orange-500",
  "bg-pink-600",
  "bg-cyan-600",
  "bg-indigo-600",
  "bg-red-500",
  "bg-teal-600",
];

function ConversationList({
  conversations,
  selectedConversation,
  onSelectConversation,
  onNewConversation,
}) {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const totalCount = conversations.length;

  const unreadCount = conversations.filter(
    (chat) => chat.unread > 0
  ).length;

  const favoriteCount = conversations.filter(
    (chat) => chat.favorite
  ).length;

  const filteredConversations = useMemo(() => {
    let data = [...conversations];

    if (activeTab === "unread") {
      data = data.filter((chat) => chat.unread > 0);
    }

    if (activeTab === "favorites") {
      data = data.filter((chat) => chat.favorite);
    }

    if (search.trim()) {
      data = data.filter(
        (chat) =>
          chat.name.toLowerCase().includes(search.toLowerCase()) ||
          chat.phone.toLowerCase().includes(search.toLowerCase()) ||
          chat.message.toLowerCase().includes(search.toLowerCase())
      );
    }

    return data;
  }, [conversations, activeTab, search]);

  return (
    <div className="w-[290px] bg-white border-r border-gray-200 flex flex-col">

      {/* Header */}
      <div className="px-5 pt-5 pb-3">
        <h2 className="text-lg font-semibold text-gray-900">
          Conversations
        </h2>
      </div>

      {/* Search */}
      <div className="px-4 pb-3">
        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />

        </div>
      </div>

      {/* New Conversation */}
      <div className="px-4">

        <button
          onClick={onNewConversation}
          className="w-full rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <div className="flex items-center justify-center gap-2">
            <Plus size={18} />
            New Conversation
          </div>
        </button>

      </div>

      {/* Tabs */}

      <div className="px-4 pt-3 pb-3">

        <div className="flex rounded-xl bg-gray-100 p-1">

          <button
            onClick={() => setActiveTab("all")}
            className={`flex-1 rounded-lg py-2 text-sm ${
              activeTab === "all"
                ? "bg-white shadow text-blue-600"
                : "text-gray-600"
            }`}
          >
            All ({totalCount})
          </button>

          <button
            onClick={() => setActiveTab("unread")}
            className={`flex-1 rounded-lg py-2 text-sm ${
              activeTab === "unread"
                ? "bg-white shadow text-blue-600"
                : "text-gray-600"
            }`}
          >
            Unread ({unreadCount})
          </button>

          <button
            onClick={() => setActiveTab("favorites")}
            className={`flex-1 rounded-lg py-2 text-sm flex items-center justify-center gap-1 ${
              activeTab === "favorites"
                ? "bg-white shadow text-blue-600"
                : "text-gray-600"
            }`}
          >
            <Star size={14} />
            ({favoriteCount})
          </button>

        </div>

      </div>

      {/* Conversation List */}

      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-2">

        {filteredConversations.map((chat) => (

          <div
            key={chat.id}
            onClick={() => onSelectConversation(chat)}
            className={`mx-2 cursor-pointer rounded-2xl border-l-[3px] px-3.5 py-3 transition-all duration-200 ${
              selectedConversation?.id === chat.id
                ? "border-blue-600 bg-blue-50"
                : "border-transparent hover:bg-gray-50"
            }`}
          >

            <div className="flex items-center gap-3">

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-full text-white font-semibold ${
                  avatarColors[chat.id % avatarColors.length]
                }`}
              >
                {chat.name.charAt(0)}
              </div>

              <div className="flex-1 min-w-0">

                <div className="flex justify-between">

                  <h3 className="truncate font-semibold text-gray-900">
                    {chat.name}
                  </h3>

                  <span className="text-xs text-gray-500">
                    {chat.time}
                  </span>

                </div>

                <div className="mt-1 flex items-center justify-between">

                  <p className="truncate text-sm text-gray-500">
                    {chat.message || "No messages yet"}
                  </p>

                  <div className="flex items-center gap-2">

                    {chat.favorite && (
                      <Star
                        size={14}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    )}

                    {chat.unread > 0 && (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-2 text-[11px] text-white">
                        {chat.unread}
                      </span>
                    )}

                  </div>

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