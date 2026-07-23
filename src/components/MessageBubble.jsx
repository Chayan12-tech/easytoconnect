function MessageBubble({
  message,
  image,
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


{/* bubble */}

<div
  className={`
    inline-block
    w-fit
    max-w-[300px]
    min-w-[70px]
    ${image ? "p-1" : "px-4 py-3"}
    break-words
    whitespace-pre-wrap
    rounded-2xl
    leading-6
    ${
  image
    ? incoming
      ? "bg-white border border-gray-200 rounded-xl"
      : "bg-blue-600/10 rounded-xl"
    : incoming
    ? "bg-white border border-gray-200 text-gray-800 rounded-bl-md"
    : "bg-blue-600 text-white rounded-br-md"
}
  `}
>


{image && (
  <div className="overflow-hidden rounded-2xl">
    <img
      src={image}
      alt="Attachment"
      className="block w-[260px] max-w-full object-cover"
    />
  </div>
)}

{message && (
  <p className={`${image ? "mt-2 px-1 text-sm" : "text-sm"}`}>
    {message}
  </p>
)}


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