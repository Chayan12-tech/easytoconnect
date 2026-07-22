import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

function ChatWindow({ conversation, messages }) {
  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <ChatHeader conversation={conversation} />

      <div className="flex-1 overflow-y-auto px-5 py-5">
        {/* Date Separator */}
        <div className="flex items-center justify-center my-6">
          <div className="flex-1 h-px bg-gray-200"></div>

          <span className="mx-4 px-4 py-1 text-xs font-medium text-gray-500 bg-white border border-gray-200 rounded-full">
            Today
          </span>

          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Messages */}
        <div className="space-y-2">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message.text}
              time={message.time}
              incoming={message.incoming}
            />
          ))}
        </div>
      </div>

      <MessageInput />
    </div>
  );
}

export default ChatWindow;