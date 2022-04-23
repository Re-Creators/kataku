import React from "react"
import Spinner from "../Spinner"

function SubmitButton({ text, handleClick = () => {}, disabled, loading, extraClassName = "" }) {
  return (
    <button
      className={`bg-primary relative py-2 px-10 text-white rounded-md hover:shadow-lg transition-all duration-100 disabled:opacity-75 ${extraClassName}`}
      onClick={handleClick}
      disabled={disabled}
    >
      <span className={loading ? "opacity-0" : ""}>{text}</span>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </button>
  )
}

export default SubmitButton
