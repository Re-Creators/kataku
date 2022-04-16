import React from "react";

function ValidationMessage({ error }) {
  return (
    <div className="mt-1">
      {error && <p className="text-sm text-red-500 italic">{error.message}</p>}
    </div>
  );
}

export default ValidationMessage;
