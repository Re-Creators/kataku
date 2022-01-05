import React, { useState } from "react";
import { BsCalendar3 } from "react-icons/bs";
import { BiPencil } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";
import axios from "../axios";
import { getVocabularies } from "../features/vocabulary/vocabularySlice";
import { useDispatch } from "react-redux";
import { toggleModal } from "../features/modal/modalSlice";
import { setSelectedVocabulary } from "../features/vocabulary/vocabularySlice";

function VocabularyCard({ vocabulary, editMode }) {
  const dispatch = useDispatch();

  const isToday = () =>
    new Date(vocabulary.createdAt).toDateString() === new Date().toDateString();

  const deleteVocabulary = async () => {
    try {
      await axios.delete(`/vocabularies/${vocabulary._id}`);
      dispatch(getVocabularies());
    } catch (err) {
      console.log(err);
    }
  };

  const onEdit = () => {
    dispatch(setSelectedVocabulary(vocabulary));
    dispatch(toggleModal());
  };

  return (
    <div className="w-96 h-52 bg-white p-5 rounded-md cursor-pointer hover:shadow-lg transition-shadow duration-300 relative">
      {isToday() && !editMode && (
        <div className="absolute top-1 -right-3 w-20 h-14">
          <img
            src="/images/complete-banner.svg"
            alt=""
            className="w-full h-full"
          />

          <p className="absolute w-full text-center top-1/2 -translate-y-1/2 text-white text-sm">
            Baru
          </p>
        </div>
      )}

      {editMode && (
        <div className="absolute top-4 right-5 flex gap-3 text-gray-500">
          <button title="Edit">
            <BiPencil onClick={() => onEdit()} />
          </button>
          <button title="Hapus" onClick={() => deleteVocabulary()}>
            <BiTrash />
          </button>
        </div>
      )}

      <div className="flex items-center text-gray-400 gap-2">
        <BsCalendar3 fontSize={14} />
        <span className="text-xs">{vocabulary.createdAt.substr(0, 10)}</span>
      </div>
      <div className="flex items-center justify-center mt-8 flex-col">
        <div className="text-4xl text-primary font-bold">
          {vocabulary.english}
        </div>
        <div className="text-2xl  font-bold mt-4">{vocabulary.indonesia}</div>
      </div>
    </div>
  );
}

export default VocabularyCard;
