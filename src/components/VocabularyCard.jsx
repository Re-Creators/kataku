import { BsCalendar3 } from "react-icons/bs";
import { BiPencil } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setSelectedVocabulary } from "../features/vocabulary/vocabularySlice";
import { useEffect, useState } from "react";

function VocabularyCard({
  vocabulary,
  toggleEditModal,
  toggleDelModal,
  editMode,
}) {
  const dispatch = useDispatch();
  const [showBadge, setShowBadge] = useState(false);
  const [badgeText, setBadgeText] = useState("");

  useEffect(() => {
    const isToday = () =>
      new Date(vocabulary.createdAt).toDateString() ===
      new Date().toDateString();

    const badgeData = [
      {
        val: vocabulary.isCompleted,
        text: "Hafal",
      },
      {
        val: isToday(),
        text: "Baru",
      },
    ];
    setShowBadge(
      badgeData.some((data) => {
        if (data.val) {
          setBadgeText(data.text);
        }
        return data.val;
      })
    );
  }, [vocabulary]);

  const onDelete = () => {
    dispatch(setSelectedVocabulary(vocabulary));
    toggleDelModal(vocabulary);
  };

  const onEdit = () => {
    dispatch(setSelectedVocabulary(vocabulary));
    toggleEditModal();
  };

  return (
    <div className="w-full md:w-[48%] lg:w-[31%]  h-52 bg-white p-5 rounded-md cursor-pointer hover:shadow-lg transition-shadow duration-300 relative">
      {showBadge && !editMode && (
        <div className="absolute top-1 -right-3 w-20 h-14">
          <img
            src={`/images/${badgeText}-badge.svg`}
            alt=""
            className="w-full h-full"
          />

          <p className="absolute w-full text-center top-1/2 -translate-y-1/2 text-white text-sm">
            {badgeText}
          </p>
        </div>
      )}

      {editMode && (
        <div className="absolute top-4 right-5 flex gap-3 text-gray-500">
          <button title="Edit">
            <BiPencil onClick={() => onEdit()} />
          </button>
          <button title="Hapus" onClick={() => onDelete()}>
            <BiTrash />
          </button>
        </div>
      )}

      <div className="flex items-center text-gray-400 gap-2">
        <BsCalendar3 fontSize={14} />
        <span className="text-xs">{vocabulary.createdAt.substr(0, 10)}</span>
      </div>
      <div className="flex items-center justify-center mt-8 flex-col">
        <div className="text-2xl lg:text-2xl xl:text-4xl text-primary font-bold">
          {vocabulary.english}
        </div>
        <div className="text-lg lg:text-xl xl:text-2xl  font-bold mt-4">
          {vocabulary.indonesia}
        </div>
      </div>
    </div>
  );
}

export default VocabularyCard;
