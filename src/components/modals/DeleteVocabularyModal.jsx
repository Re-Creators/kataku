import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  getVocabularies,
  vocabularySelector,
} from "../../features/vocabulary/vocabularySlice";
import axios from "../../axios";
import { useState } from "react";
import Spinner from "../Spinner";

function DeleteVocabularyModal({ onClose }) {
  const dispatch = useDispatch();
  const { selectedVocabulary } = useSelector(vocabularySelector);
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/vocabularies/${selectedVocabulary._id}`);

      onClose();
      setLoading(false);
      dispatch(getVocabularies());
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="modal p-6">
      <button className="top-5 right-3 absolute" onClick={() => onClose()}>
        <IoClose fontSize={24} />
      </button>
      <div className="mt-8">
        <h1 className="font-bold text-lg">
          Anda yakin ingin menghapus kosa kata ini ?
        </h1>
        <p className="text-gray-500 mt-2">
          Kosa kata akan hilang permanen setelah dihapus
        </p>
      </div>
      <div className="mt-14 flex justify-end">
        <button
          className="px-10 py-2 border-2 mr-3 rounded-md"
          onClick={() => onClose()}
        >
          Batal
        </button>
        <button
          className="py-2 bg-red-500 rounded-md text-white w-[100px]"
          onClick={() => onDelete()}
          disabled={loading}
        >
          {loading ? <Spinner /> : "Hapus"}
        </button>
      </div>
    </div>
  );
}

export default DeleteVocabularyModal;
