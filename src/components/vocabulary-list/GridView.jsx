import React from "react";
import VocabularyCard from "../VocabularyCard";

export default function GridView({ vocabularies }) {
  return (
    <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 md:gap-5">
      {vocabularies?.map((vocabulary) => (
        <VocabularyCard vocabulary={vocabulary} key={vocabulary._id} />
      ))}

      {vocabularies?.length === 0 && (
        <p className="text-center text-xl mt-10 mx-auto">Tidak ada kosa kata</p>
      )}
    </div>
  );
}
