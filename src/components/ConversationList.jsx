import { useMemo, useState } from "react";
import { Search, Plus, Star } from "lucide-react";
import { conversations } from "../data/conversations";

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

function ConversationList() {
  const [activeChat, setActiveChat] = useState(1);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const totalCount = conversations.length;

  const unreadCount = conversations.filter((chat) => chat.unread > 0).length;

  const favoriteCount = conversations.filter((chat) => chat.favorite).length;

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
          chat.message.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return data;
  }, [search, activeTab]);

  return (
    <div className="w-[290px] bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="px-5 pt-5 pb-3">
        <h2 className="text-lg font-semibold text-gray-900">Conversations</h2>
      </div>

      {/* Search */}
      <div className="px-4 pb-3">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search conversations..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 py-2.5 text-sm outline-none transition-all duration-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* New Conversation */}
      <div className="px-4">
        <button
          className="
w-full
rounded-xl
bg-blue-600
hover:bg-blue-700
transition-all
duration-200
text-white
py-2.5
text-sm
font-semibold
flex
items-center
justify-center
gap-2
hover:shadow-md
active:scale-[0.98]
"
        >
          <Plus size={18} />
          New Conversation
        </button>
      </div>

      {/* Tabs */}
      <div className="px-4 pt-3 pb-3">
        <div className="flex rounded-xl bg-gray-100 p-1">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${
              activeTab === "all"
                ? "bg-white shadow text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            All ({totalCount})
          </button>

          <button
            onClick={() => setActiveTab("unread")}
            className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${
              activeTab === "unread"
                ? "bg-white shadow text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Unread ({unreadCount})
          </button>

          <button
            onClick={() => setActiveTab("favorites")}
            className={`flex-1 rounded-lg py-2 text-sm font-medium transition flex items-center justify-center gap-1 ${
              activeTab === "favorites"
                ? "bg-white shadow text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Star size={14} />({favoriteCount})
          </button>
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-2">
        {" "}
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Search size={26} className="text-gray-400" />
            </div>

            <h3 className="text-gray-700 font-semibold">
              No conversations found
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Try searching with another keyword.
            </p>
          </div>
        ) : (
          filteredConversations.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={`
                mx-2
                rounded-2xl
                px-3.5 py-3
                cursor-pointer
                transition-all
                duration-200
                border-l-[3px]
                ${
                  activeChat === chat.id
                    ? "bg-blue-50 border-blue-600"
                    : "border-transparent hover:bg-gray-50"
                }
              `}
            >
              <div className="flex items-center gap-3">
                {/* Avatar */}

                <div className="flex-shrink-0">
                  <div
                    className={`w-11 h-11 rounded-full ${
                      avatarColors[chat.id % avatarColors.length]
                    } text-white flex items-center justify-center font-semibold`}
                  >
                    {chat.name.charAt(0)}
                  </div>
                </div>

                {/* Content */}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {chat.name}
                    </h3>

                    <span className="text-xs text-gray-500 flex-shrink-0">
                      {chat.time}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 mt-1">
                    <p className="text-sm text-gray-500 truncate">
                      {chat.message}
                    </p>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {chat.favorite && (
                        <Star
                          size={14}
                          className="fill-yellow-400 text-yellow-400"
                        />
                      )}

                      {chat.unread > 0 && (
                        <span className="min-w-5 h-5 px-2 rounded-full bg-blue-600 text-white text-[11px] flex items-center justify-center">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ConversationList;
