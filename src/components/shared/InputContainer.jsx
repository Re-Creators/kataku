import React from "react"
import ValidationMessage from "./ValidationMessage"

function InputContainer({ textLabel, errorMessage, children }) {
  return (
    <div className="mt-5">
      <label>{textLabel}</label>
      <div className="relative">{children}</div>
      <ValidationMessage error={errorMessage} />
    </div>
  )
}

export default InputContainer
