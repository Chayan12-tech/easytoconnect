import { useEffect, useRef, useState } from "react";
import { X, Phone } from "lucide-react";

function NewConversationModal({
  open,
  onClose,
  onContinue,
}) {
  const [phone, setPhone] = useState("");

  const inputRef = useRef(null);

  // Auto focus
  useEffect(() => {
    if (open) {
      setPhone("");

      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [open]);

  // ESC Key
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }

      if (e.key === "Enter") {
        handleContinue();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  if (!open) return null;

  const handleContinue = () => {
    const value = phone.trim();

    if (!value) return;

    onContinue(value);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-3xl bg-white shadow-2xl animate-in fade-in zoom-in duration-200"
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              New Conversation
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Enter a phone number to start chatting.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}

        <div className="px-6 py-6">

          <label className="mb-2 block text-sm font-medium text-gray-700">
            Phone Number
          </label>

          <div className="flex overflow-hidden rounded-xl border border-gray-300 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100">

            <div className="flex items-center gap-2 border-r border-gray-200 bg-gray-50 px-4">
              <Phone size={16} className="text-gray-500" />
              <span className="text-sm font-medium">+1</span>
            </div>

            <input
              ref={inputRef}
              value={phone}
              onChange={(e) =>
                setPhone(
                  e.target.value.replace(/[^0-9]/g, "")
                )
              }
              placeholder="4155551234"
              className="flex-1 px-4 py-3 outline-none"
            />

          </div>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-5">

          <button
            onClick={onClose}
            className="rounded-xl border border-gray-300 px-5 py-2.5 font-medium hover:bg-gray-50 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleContinue}
            disabled={!phone.trim()}
            className="rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Continue
          </button>

        </div>

      </div>
    </div>
  );
}

export default NewConversationModal;