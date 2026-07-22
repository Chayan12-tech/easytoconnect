import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

const messages = [
  {
    id: 1,
    text: "Hello 👋",
    time: "10:30 AM",
    incoming: true,
  },
  {
    id: 2,
    text: "Hi John! Nice to hear from you.",
    time: "10:31 AM",
    incoming: false,
  },
  {
    id: 3,
    text: "How are you today?",
    time: "10:32 AM",
    incoming: true,
  },
  {
    id: 4,
    text: "I'm doing great. What about you?",
    time: "10:33 AM",
    incoming: false,
  },
  {
    id: 5,
    text: "Everything is going well. Thanks!",
    time: "10:34 AM",
    incoming: true,
  },
];

function ChatWindow() {
  return (
    <div className="flex-1 flex flex-col bg-gray-50">

      <ChatHeader />

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