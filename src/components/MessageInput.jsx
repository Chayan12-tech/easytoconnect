import { useEffect, useRef, useState } from "react";
import { Smile, ImagePlus, SendHorizontal } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

function MessageInput({ onSend }) {
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const textareaRef = useRef(null);
  const imageInputRef = useRef(null);
  const emojiPickerRef = useRef(null);

  const handleInput = (e) => {
    setText(e.target.value);

    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };


  const handleImageSelect = (event) => {
  const file = event.target.files?.[0];

  if (!file) return;

  console.log(file);

  setSelectedImage(file);
};


const removeSelectedImage = () => {
  setSelectedImage(null);
  setPreviewUrl("");

  if (imageInputRef.current) {
    imageInputRef.current.value = "";
  }
};


useEffect(() => {
  if (!selectedImage) {
    setPreviewUrl("");
    return;
  }

  const objectUrl = URL.createObjectURL(selectedImage);

  setPreviewUrl(objectUrl);

  return () => {
    URL.revokeObjectURL(objectUrl);
  };
}, [selectedImage]);


 const sendMessage = () => {
  const message = text.trim();

  if (!message && !selectedImage) return;

  onSend?.({
    text: message,
    image: selectedImage,
    previewUrl,
  });

  setText("");
  setSelectedImage(null);
  setPreviewUrl("");

  if (imageInputRef.current) {
    imageInputRef.current.value = "";
  }

  if (textareaRef.current) {
    textareaRef.current.style.height = "auto";
  }
};



  const handleEmojiClick = (emojiData) => {
  setText((prev) => prev + emojiData.emoji);

  textareaRef.current?.focus();
};


  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };


useEffect(() => {
  if (!showEmojiPicker) return;

  const handleClickOutside = (event) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target)
    ) {
      setShowEmojiPicker(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [showEmojiPicker]);



  return (
    <div className="relative bg-white border-t border-gray-200 p-4">

{selectedImage && (
  <div className="relative mb-3 w-fit">
    <img
      src={previewUrl}
      alt="Preview"
      className="max-h-48 max-w-[180px] rounded-2xl border border-gray-200 object-cover shadow-md"
    />

    <button
      onClick={removeSelectedImage}
      className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 text-white shadow hover:bg-black transition"
      title="Remove image"
    >
      ✕
    </button>
  </div>
)}


      <div className="flex items-end gap-3">

        {/* Emoji */}
<div ref={emojiPickerRef} className="relative">

  {showEmojiPicker && (
    <div className="absolute bottom-14 left-0 z-50">
      <EmojiPicker
        onEmojiClick={handleEmojiClick}
      />
    </div>
  )}

  <button
    onClick={() => setShowEmojiPicker((prev) => !prev)}
    className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition"
  >
    <Smile size={20} className="text-gray-600" />
  </button>

</div>


        <input
  ref={imageInputRef}
  type="file"
  accept="image/*"
  onChange={handleImageSelect}
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
        <div className="flex-1 border border-gray-300 rounded-3xl px-4 py-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition">
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