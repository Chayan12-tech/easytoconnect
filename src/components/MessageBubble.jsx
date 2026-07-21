function MessageBubble({
  message,
  time,
  incoming = true,
}) {
  return (
    <div
      className={`flex mb-4 ${
        incoming ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`max-w-md rounded-2xl px-4 py-3 shadow-sm ${
          incoming
            ? "bg-white text-gray-800"
            : "bg-blue-600 text-white"
        }`}
      >
        <p className="text-sm">
          {message}
        </p>

        <p
          className={`mt-2 text-xs ${
            incoming
              ? "text-gray-400"
              : "text-blue-100"
          }`}
        >
          {time}
        </p>
      </div>
    </div>
  );
}

export default MessageBubble;