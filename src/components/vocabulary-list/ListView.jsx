import React from "react";
import ListCard from "./ListCard";

function ListView({ vocabularies }) {
  return (
    <div className="mt-5 flex flex-col">
      {vocabularies?.map((vocabulary) => (
        <ListCard vocabulary={vocabulary} key={vocabulary._id} />
      ))}
    </div>
  );
}

export default ListView;
