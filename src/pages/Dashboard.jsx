import { useState } from "react";

import Sidebar from "../components/Sidebar";
import ConversationList from "../components/ConversationList";
import ChatWindow from "../components/ChatWindow";
import TopBar from "../components/TopBar";
import NewConversationModal from "../components/modal/NewConversationModal";

import { conversations as initialConversations } from "../data/conversations";
import initialMessages from "../data/messages";
import ContactPanel from "../components/ContactPanel";

function Dashboard() {
  // Conversations
  const [conversations, setConversations] = useState(initialConversations);

  // Selected conversation
  const [selectedConversation, setSelectedConversation] = useState(
    initialConversations[0] ?? null
  );

  // Messages
  const [messages, setMessages] = useState(initialMessages);

  // Modal
  const [isNewConversationOpen, setIsNewConversationOpen] = useState(false);

  // Search
const [searchQuery, setSearchQuery] = useState("");

// Contact Panel
const [showContactPanel, setShowContactPanel] = useState(false);


// Update contact name
const updateConversation = (conversationId, updates) => {
  setConversations((prev) =>
    prev.map((conversation) =>
      conversation.id === conversationId
        ? {
            ...conversation,
            ...updates,
          }
        : conversation
    )
  );

  setSelectedConversation((prev) =>
    prev && prev.id === conversationId
      ? {
          ...prev,
          ...updates,
        }
      : prev
  );
};

  // Create new conversation
  const createConversation = (phoneNumber) => {
    const phone = `+1${phoneNumber}`;

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
      name: "",
      phone,
      message: "",
      time: "Now",
      unread: 0,
      favorite: false,

      location: "",
      notes: "",
    };

    setConversations((prev) => [newConversation, ...prev]);
    setSelectedConversation(newConversation);
    setIsNewConversationOpen(false);
  };


// Toggle Favorite
const toggleFavorite = (conversationId) => {
  setConversations((prev) => {
    const updatedConversations = prev.map((conversation) =>
      conversation.id === conversationId
        ? {
            ...conversation,
            favorite: !conversation.favorite,
          }
        : conversation
    );

    // Keep selectedConversation in sync
    const updatedSelected = updatedConversations.find(
      (conversation) => conversation.id === conversationId
    );

    if (updatedSelected) {
      setSelectedConversation(updatedSelected);
    }

    return updatedConversations;
  });
};


  // Send Message
  const sendMessage = (data) => {
    if (!selectedConversation) return;

    const { text, image, previewUrl } = data;

    const newMessage = {
      id: Date.now(),
      conversationId: selectedConversation.id,
      text,
      image,
      previewUrl,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      incoming: false,
    };

    

    setMessages((prev) => [...prev, newMessage]);

    setConversations((prev) => {
  const updatedConversations = prev.map((conversation) =>
    conversation.id === selectedConversation.id
      ? {
          ...conversation,
          message: text || (image ? "📷 Photo" : ""),
          time: newMessage.time,
        }
      : conversation
  );

  const activeConversation = updatedConversations.find(
    (conversation) => conversation.id === selectedConversation.id
  );

  const otherConversations = updatedConversations.filter(
    (conversation) => conversation.id !== selectedConversation.id
  );

  return [activeConversation, ...otherConversations];
});
  };

  const filteredConversations = conversations.filter((conversation) => {
  const query = searchQuery.toLowerCase();

  return (
    conversation.name.toLowerCase().includes(query) ||
    conversation.phone.toLowerCase().includes(query)
  );
});

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <TopBar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <ConversationList
          conversations={filteredConversations}
          selectedConversation={selectedConversation}
          onSelectConversation={setSelectedConversation}
          onNewConversation={() => setIsNewConversationOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onToggleFavorite={toggleFavorite}
        />

        <ChatWindow
          conversation={selectedConversation}
          messages={messages}
          onSend={sendMessage}
          onToggleFavorite={toggleFavorite}
          showContactPanel={showContactPanel}
          setShowContactPanel={setShowContactPanel}
        />

        {showContactPanel && (
<ContactPanel
  conversation={selectedConversation}
  onClose={() => setShowContactPanel(false)}
  onUpdate={updateConversation}
/>

)}
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