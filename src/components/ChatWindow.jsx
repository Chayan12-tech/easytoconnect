import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";

function ChatWindow() {
  return (
    <div className="flex-1 flex flex-col bg-gray-50">

      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-6">

        <MessageBubble
          message="Hello 👋"
          time="10:30 AM"
          incoming={true}
        />

        <MessageBubble
          message="Hi John! Nice to hear from you."
          time="10:31 AM"
          incoming={false}
        />

        <MessageBubble
          message="How are you today?"
          time="10:32 AM"
          incoming={true}
        />

        <MessageBubble
          message="I'm doing great. What about you?"
          time="10:33 AM"
          incoming={false}
        />

        <MessageBubble
          message="Everything is going well. Thanks!"
          time="10:34 AM"
          incoming={true}
        />

      </div>
      <MessageInput />
    </div>
    
  );
}

export default ChatWindow;