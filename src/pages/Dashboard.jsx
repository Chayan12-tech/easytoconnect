import Sidebar from "../components/Sidebar";
import ConversationList from "../components/ConversationList";
import ChatWindow from "../components/ChatWindow";
import TopBar from "../components/TopBar";

function Dashboard() {
  return (
    <div className="h-screen bg-gray-100 flex flex-col">

      {/* Top Navigation */}
      <TopBar />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">

        <Sidebar />

        <ConversationList />

        <ChatWindow />

      </div>

    </div>
  );
}

export default Dashboard;