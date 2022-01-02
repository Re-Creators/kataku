import React, { useEffect, useState } from "react";
import VocabularyCard from "../components/VocabularyCard";
import axios from "../axios";

function VocabularyList() {
  const [vocabularies, setVocabularies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get("/vocabularies");
      setVocabularies(data);

      return data;
    }

    fetchData();
  }, []);

  return (
    <div className="mt-10 w-4/5 mx-auto pb-10">
      <h1 className="text-3xl">Daftar Kosakata</h1>
      <div className="flex flex-col">
        <div className="self-end mt-5">
          <label>Filter : </label>
          <select name="" id="">
            <option value="">Semua</option>
            <option value="">Terbaru</option>
            <option value="">Selesai</option>
          </select>
        </div>
        <div className="mt-5 flex flex-wrap gap-5">
          {vocabularies.map((vocabulary) => (
            <VocabularyCard
              date={vocabulary.createdAt}
              key={vocabulary._id}
              indonesia={vocabulary.indonesia}
              english={vocabulary.english}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default VocabularyList;
