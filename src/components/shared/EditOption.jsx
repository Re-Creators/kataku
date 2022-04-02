import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import VocabularyContext from "../../context/VocabularyContext";
import { setSelectedVocabulary } from "../../features/vocabulary/vocabularySlice";
import { BiPencil } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";

function EditOption({ vocabulary }) {
  const dispatch = useDispatch();
  const { toggleEditModal, toggleDelModal } = useContext(VocabularyContext);

  const onDelete = () => {
    dispatch(setSelectedVocabulary(vocabulary));
    toggleDelModal(vocabulary);
  };

  const onEdit = () => {
    dispatch(setSelectedVocabulary(vocabulary));
    toggleEditModal();
  };

  return (
    <div className="absolute top-4 right-5 flex gap-3 text-gray-500">
      <button title="Edit">
        <BiPencil onClick={() => onEdit()} />
      </button>
      <button title="Hapus" onClick={() => onDelete()}>
        <BiTrash />
      </button>
    </div>
  );
}

export default EditOption;
