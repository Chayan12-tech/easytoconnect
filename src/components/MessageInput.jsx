import { useRef, useState } from "react";
import { Smile, ImagePlus, SendHorizontal } from "lucide-react";

function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const textareaRef = useRef(null);
  const imageInputRef = useRef(null);

  const handleInput = (e) => {
    setText(e.target.value);

    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const sendMessage = () => {
    const message = text.trim();

    if (!message) return;

    onSend?.(message);

    setText("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <div className="flex items-end gap-3">

        {/* Emoji */}
        <button
          className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition"
        >
          <Smile size={20} className="text-gray-600" />
        </button>

        {/* Hidden Image Input */}
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          className="hidden"
        />

        {/* Image Button */}
        <button
          onClick={() => imageInputRef.current?.click()}
          className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition"
        >
          <ImagePlus size={20} className="text-gray-600" />
        </button>

        {/* Textarea */}
        <div className="flex-1 border border-gray-300 rounded-3xl px-4 py-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition">
          <textarea
            ref={textareaRef}
            rows={1}
            value={text}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="w-full bg-transparent outline-none resize-none overflow-y-auto max-h-32 leading-6 text-gray-800 placeholder:text-gray-400"
          />
        </div>

        {/* Send */}
        <button
          onClick={sendMessage}
          className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 active:scale-95 transition"
        >
          <SendHorizontal size={20} />
        </button>

      </div>
    </div>
  );
}

export default MessageInput;