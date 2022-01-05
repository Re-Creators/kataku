import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  getVocabularies,
  vocabularySelector,
} from "../../features/vocabulary/vocabularySlice";
import axios from "../../axios";

function EditVocabularyModal() {
  const dispatch = useDispatch();
  const { selectedVocabulary } = useSelector(vocabularySelector);
  const [indonesia, setIndonesia] = useState(selectedVocabulary.indonesia);
  const [english, setEnglish] = useState(selectedVocabulary.english);

  const onUpdate = async () => {
    try {
      await axios.put(`/vocabularies/${selectedVocabulary._id}`, {
        english,
        indonesia,
      });
      dispatch(getVocabularies());
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="modal p-10">
      <div className="mb-5">
        <label>Inggris</label>
        <input
          type="text"
          className="w-full border-2 mt-2 p-2 outline-none focus:border-primary"
          value={english}
          onChange={(e) => setEnglish(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label>Indonesia</label>
        <input
          type="text"
          className="w-full border-2 mt-2 p-2 outline-none focus:border-primary"
          value={indonesia}
          onChange={(e) => setIndonesia(e.target.value)}
        />
      </div>
      <button
        className="py-3 px-10 bg-primary rounded-md text-white mx-auto w-full"
        onClick={() => onUpdate()}
      >
        Simpan
      </button>
    </div>
  );
}

export default EditVocabularyModal;
