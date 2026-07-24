import { useEffect, useState } from "react";

function ContactPanel({
  conversation,
  onClose,
  onUpdate,
}) {

    const [copied, setCopied] = useState(false);

    const [isEditingLocation, setIsEditingLocation] = useState(false);
    const [isEditingNotes, setIsEditingNotes] = useState(false);
    const [isEditingName, setIsEditingName] = useState(false);

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [notes, setNotes] = useState("");


useEffect(() => {
  setName(conversation?.name || "");
  setLocation(conversation?.location || "");
  setNotes(conversation?.notes || "");

  // Reset edit modes when switching conversations
  setIsEditingName(false);
  setIsEditingLocation(false);
  setIsEditingNotes(false);
}, [conversation]);



      const formatPhoneNumber = (phone) => {
    if (!phone) return "";

    const digits = phone.replace(/\D/g, "");

    const usNumber =
      digits.length === 11 && digits.startsWith("1")
        ? digits.slice(1)
        : digits;

    if (usNumber.length !== 10) return phone;

    return `(${usNumber.slice(0, 3)}) ${usNumber.slice(3, 6)}-${usNumber.slice(6)}`;
  };


    const handleCopyPhone = async () => {
  try {
    await navigator.clipboard.writeText(conversation?.phone || "");

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);

  } catch (err) {
    console.error("Failed to copy phone number", err);
  }
};


  return (
    <div className="w-[280px] bg-white border-l border-gray-200 flex flex-col">
        <div className="h-16 border-b border-gray-200 flex items-center justify-between px-5">
           <h2 className="text-base font-semibold text-gray-900">
             Contact Details
           </h2>

           <button
             onClick={onClose}
             className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
           >
             ✕
           </button>
     </div>


     <div className="flex-1 overflow-y-auto pb-4">

     <div className="px-6 py-8 flex flex-col items-center">
  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-600">
    {conversation?.name
  ? conversation.name.charAt(0).toUpperCase()
  : "?"}
  </div>

<div className="mt-3 flex w-full items-center justify-center gap-2">
  {isEditingName ? (
    <>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter contact name"
        className="w-40 rounded-md border border-gray-300 px-2 py-1 text-center text-lg font-semibold outline-none focus:border-blue-500"
      />

      <button
        onClick={() => {
  const newName = name.trim();

  onUpdate(conversation.id, {
  name: newName,
});

  setIsEditingName(false);
}}
        className="flex h-7 w-7 items-center justify-center rounded-md text-green-600 transition hover:bg-green-50"
        title="Save"
      >
        ✔️
      </button>
    </>
  ) : (
    <>
      <h3 className="text-lg font-semibold text-gray-900">
        {conversation?.name || "Unknown"}
      </h3>

      <button
        onClick={() => {
          setName(conversation?.name || "");
          setIsEditingName(true);
        }}
        className="flex h-7 w-7 items-center justify-center rounded-md text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
        title="Edit contact name"
      >
        ✏️
      </button>
    </>
  )}
</div>

  <div className="mt-1 flex items-center justify-center gap-2">
  <p className="text-sm text-gray-500">
  {formatPhoneNumber(conversation?.phone)}
</p>

  <button
    onClick={handleCopyPhone}
    className="flex h-7 w-7 items-center justify-center rounded-md text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
    title="Copy phone number"
  >
    {copied ? "✓" : "📋"}
  </button>

</div>

</div>



{/* ------------------- Created Card Start ----------------------- */}

<div className="px-3 mt-3">
  <div className="rounded-xl border border-gray-200 bg-slate-50 p-4">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
          Created
        </p>

        <p className="mt-1 text-sm text-gray-900">
          July 15, 2026
        </p>
      </div>


    </div>
  </div>
</div>



{/* ------------------- Total Messages Card Start ----------------------- */}

<div className="px-3 mt-3">
  <div className="rounded-xl border border-gray-200 bg-slate-50 p-4">
    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
      Total Messages
    </p>

    <div className="mt-1 flex items-center text-sm text-gray-900">
        
      <span>Sent 102</span>

      <span className="mx-2 text-gray-300">•</span>

      <span>Received 85</span>

      

      
    </div>
  </div>
</div>




{/* ------------------- Location Card Start ----------------------- */}

<div className="px-3 pt-4">
  <div className="rounded-xl border border-gray-200 bg-slate-50 p-4">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
          Location
        </p>

        
{isEditingLocation ? (
  <input
    type="text"
    value={location}
    onChange={(e) => setLocation(e.target.value)}
    placeholder="Enter location"
    className="mt-2 w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-sm outline-none focus:border-blue-500"
    autoFocus
  />
) : (
  <p
    className={`mt-1 text-sm ${
      location ? "text-gray-900" : "text-gray-500 italic"
    }`}
  >
    {location || "No location added"}
  </p>
)}


      </div>

<button
  onClick={() => {
    if (isEditingLocation) {
      const newLocation = location.trim();

      onUpdate(conversation.id, {
        location: newLocation,
      });
    }

    setIsEditingLocation(!isEditingLocation);
  }}
  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
  title={isEditingLocation ? "Done" : "Edit location"}
>
  {isEditingLocation ? "✔️" : "✏️"}
</button>


    </div>
  </div>
</div>


{/* ------------------- Notes Card Start ----------------------- */}

<div className="px-3 mt-3">
  <div className="rounded-xl border border-gray-200 bg-slate-50 p-4">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
          Notes
        </p>

        {isEditingNotes ? (
  <textarea
    value={notes}
    onChange={(e) => setNotes(e.target.value)}
    placeholder="Enter notes"
    rows={3}
    className="mt-2 w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-sm outline-none focus:border-blue-500 resize-none"
    autoFocus
  />
) : (
  <p
    className={`mt-2 text-sm ${
      notes ? "text-gray-900" : "text-gray-500 italic"
    }`}
  >
    {notes || "No notes yet."}
  </p>
)}
      </div>

<button
  onClick={() => {
    if (isEditingNotes) {
      const newNotes = notes.trim();

      onUpdate(conversation.id, {
        notes: newNotes,
      });
    }

    setIsEditingNotes(!isEditingNotes);
  }}
  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
  title={isEditingNotes ? "Done" : "Edit notes"}
>
  {isEditingNotes ? "✔️" : "✏️"}
</button>

    </div>
  </div>
</div>



    </div>
    </div>
  );
}

export default ContactPanel;