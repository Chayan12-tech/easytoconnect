function MessageBubble({
  message,
  time,
  incoming = true,
}) {
  return (
    <div
      className={`flex ${
        incoming ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`inline-flex flex-col ${
          incoming ? "items-start" : "items-end"
        }`}
      >
        {/* Bubble */}
        <div
          className={`
            inline-block
            w-fit
            max-w-[420px]
            min-w-[70px]
            px-4
            py-3
            break-words
            whitespace-pre-wrap
            rounded-2xl
            leading-6
            ${
              incoming
                ? "bg-white border border-gray-200 text-gray-800 rounded-bl-md"
                : "bg-blue-600 text-white rounded-br-md"
            }
          `}
        >
          <p className="text-sm">{message}</p>
        </div>

        {/* Time */}
        <span
          className={`mt-1 text-[11px] px-1 ${
            incoming
              ? "text-gray-400"
              : "text-gray-500"
          }`}
        >
          {time}
        </span>
      </div>
    </div>
  );
}

export default MessageBubble;