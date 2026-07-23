import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

function ChatWindow({
  conversation,
  messages,
  onSend,
  onToggleFavorite,
  showContactPanel,
  setShowContactPanel,
}) {
  // No conversation selected
  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Select a conversation</p>
      </div>
    );
  }

  // Messages for selected conversation
  const conversationMessages = messages.filter(
    (message) => message.conversationId === conversation.id
  );

  // Scroll container
  const messagesContainerRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [conversationMessages]);

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <ChatHeader
  conversation={conversation}
  onToggleFavorite={onToggleFavorite}
  showContactPanel={showContactPanel}
  setShowContactPanel={setShowContactPanel}
/>

      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-5 py-5"
      >
        {/* Date Separator */}
        <div className="flex items-center justify-center my-6">
          <div className="flex-1 h-px bg-gray-200"></div>

          <span className="mx-4 px-4 py-1 text-xs font-medium text-gray-500 bg-white border border-gray-200 rounded-full">
            Today
          </span>

          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {conversationMessages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">
              No messages yet. Start the conversation 👋
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {conversationMessages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message.text}
                image={message.previewUrl}
                time={message.time}
                incoming={message.incoming}
              />
            ))}
          </div>
        )}
      </div>

      <MessageInput onSend={onSend} />
    </div>
  );
}

export default ChatWindow;