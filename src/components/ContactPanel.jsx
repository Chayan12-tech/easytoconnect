import { useState } from "react";

function ContactPanel({
  conversation,
  onClose,
}) {

    const [copied, setCopied] = useState(false);

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
    {conversation?.name?.charAt(0)?.toUpperCase()}
  </div>

  <h3 className="mt-3 text-lg font-semibold text-gray-900">
    {conversation?.name}
  </h3>

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

        <p className="mt-1 text-sm text-gray-900">
          New Town, Kolkata
        </p>
      </div>

      <button
        className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
        title="Edit location"
      >
        ✏️
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

        <p className="mt-2 text-sm text-gray-500">
          No notes yet.
        </p>
      </div>

      <button
        className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
        title="Add note"
      >
        ✏️
      </button>
    </div>
  </div>
</div>



    </div>
    </div>
  );
}

export default ContactPanel;