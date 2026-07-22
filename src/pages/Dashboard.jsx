import { useState } from "react";
import initialMessages from "../data/messages";

import Sidebar from "../components/Sidebar";
import ConversationList from "../components/ConversationList";
import ChatWindow from "../components/ChatWindow";
import TopBar from "../components/TopBar";
import NewConversationModal from "../components/modal/NewConversationModal";

import { conversations as initialConversations } from "../data/conversations";

function Dashboard() {
  // All conversations
  const [conversations, setConversations] = useState(initialConversations);

  // Selected conversation
  const [selectedConversation, setSelectedConversation] = useState(
    initialConversations[0] ?? null
  );

  const [messages, setMessages] = useState(initialMessages);

  // New Conversation Modal
  const [isNewConversationOpen, setIsNewConversationOpen] = useState(false);

  // Create new conversation
  const createConversation = (phoneNumber) => {
    const phone = `+1${phoneNumber}`;

    // Check if conversation already exists
    const existingConversation = conversations.find(
      (chat) => chat.phone === phone
    );

    if (existingConversation) {
      setSelectedConversation(existingConversation);
      setIsNewConversationOpen(false);
      return;
    }

    const newConversation = {
      id: Date.now(),
      name: phone,
      phone,
      message: "",
      time: "Now",
      unread: 0,
      favorite: false,
    };

    setConversations((prev) => [newConversation, ...prev]);
    setSelectedConversation(newConversation);
    setIsNewConversationOpen(false);
  };

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <TopBar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <ConversationList
          conversations={conversations}
          selectedConversation={selectedConversation}
          onSelectConversation={setSelectedConversation}
          onNewConversation={() => setIsNewConversationOpen(true)}
        />

        <ChatWindow
          conversation={selectedConversation}
          messages={messages}
        />
      </div>

      <NewConversationModal
        open={isNewConversationOpen}
        onClose={() => setIsNewConversationOpen(false)}
        onContinue={createConversation}
      />
    </div>
  );
}

export default Dashboard;