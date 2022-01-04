import React, { useEffect, useState } from "react";
import VocabularyCard from "../components/VocabularyCard";
import Spinner from "../components/Spinner";
import { useDispatch } from "react-redux";
import { getVocabularies } from "../features/vocabulary/vocabularySlice";
import { vocabularySelector } from "../features/vocabulary/vocabularySlice";
import { useSelector } from "react-redux";
import ModalContainer from "../components/modals/ModalContainer";
import EditVocabularyModal from "../components/modals/EditVocabularyModal";

const editModeClass = " transform translate-x-6";

function VocabularyList() {
  const dispatch = useDispatch();
  const { data: vocabularies, isFetching } = useSelector(vocabularySelector);

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    dispatch(getVocabularies());
  }, [dispatch]);

  return (
    <div className="mt-10 w-4/5 mx-auto pb-10">
      <ModalContainer>
        <EditVocabularyModal />
      </ModalContainer>
      <h1 className="text-3xl">Daftar Kosakata</h1>
      <div className="flex flex-col">
        <div className="flex justify-between mt-5 ">
          <div className="flex gap-2 items-center">
            <div
              className="w-10 h-4 flex items-center bg-white rounded-full cursor-pointer"
              onClick={() => {
                setEditMode(!editMode);
              }}
            >
              <div
                className={
                  "bg-primary h-4 w-4 rounded-full shadow-md transform duration-300 ease-in-out" +
                  (editMode ? editModeClass : null)
                }
              ></div>
            </div>
            <div>Edit Mode</div>
          </div>
          <div className="">
            <label>Filter : </label>
            <select name="" id="">
              <option value="">Semua</option>
              <option value="">Terbaru</option>
              <option value="">Selesai</option>
            </select>
          </div>
        </div>

        {isFetching ? (
          <div className="w-full mt-10 flex items-center justify-center">
            <Spinner classSize="w-10 h-10" />
          </div>
        ) : (
          <div className="mt-5 flex flex-wrap gap-5">
            {vocabularies?.map((vocabulary) => (
              <VocabularyCard
                id={vocabulary._id}
                date={vocabulary.createdAt}
                key={vocabulary._id}
                indonesia={vocabulary.indonesia}
                english={vocabulary.english}
                editMode={editMode}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default VocabularyList;
