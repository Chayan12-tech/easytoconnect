import { useState, useEffect, useRef } from "react";
import { Phone, Star, MoreVertical } from "lucide-react";

function ChatHeader({
  conversation,
  onToggleFavorite,
  showContactPanel,
  setShowContactPanel,
}) {
  if (!conversation) {
    return (
      <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-center">
        <p className="text-gray-500">No conversation selected</p>
      </div>
    );
  }

  const displayName = conversation.name || conversation.phone;
  const avatarLetter = displayName.charAt(0).toUpperCase();
  const copyPhoneNumber = async () => {
  try {
    await navigator.clipboard.writeText(conversation.phone);
    alert("Phone number copied!");
    setShowMenu(false);
  } catch (error) {
    console.error("Failed to copy:", error);
  }
};

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
  function handleClickOutside(event) {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target)
    ) {
      setShowMenu(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };
}, []);

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center font-semibold text-base shadow-sm">
          {avatarLetter}
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 leading-none">
            {displayName}
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            {conversation.phone}
          </p>
        </div>
      </div>

      {/* Right */}
      <div
  ref={menuRef}
  className="relative flex items-center gap-2"
>
        <button className="w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center">
          <Phone size={19} className="text-gray-600" />
        </button>

        <button
  onClick={() => onToggleFavorite(conversation.id)}
  className="w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
>
  <Star
    size={19}
    className={
      conversation.favorite
        ? "fill-yellow-400 text-yellow-400"
        : "text-gray-600"
    }
  />
</button>


        <button 
        onClick={() => setShowMenu(!showMenu)}
        className="w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center">
          <MoreVertical size={19} className="text-gray-600" />
        </button>

        {showMenu && (
  <div className="absolute right-0 top-12 w-56 rounded-xl border border-gray-200 bg-white shadow-xl py-2 z-50">

<button
  onClick={() => {
    setShowContactPanel(!showContactPanel);
    setShowMenu(false);
  }}
  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
>
  👤 View Contact
</button>

    <button
    onClick={copyPhoneNumber}
    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
      📋 Copy Number
    </button>

    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
      📥 Archive
    </button>

    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
      🚫 Block
    </button>

    <hr className="my-2" />

    <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50">
      🗑 Delete Conversation
    </button>
  </div>
)}

      </div>
    </div>
  );
}

export default ChatHeader;