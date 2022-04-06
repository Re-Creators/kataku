import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <img src="/images/not-found.svg" alt="" className="w-1/4" />
      <Link to="/" className="mt-10 text-primary text-lg">
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
