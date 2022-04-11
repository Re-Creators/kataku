import React, { useContext } from "react";
import { BsCalendar3 } from "react-icons/bs";
import VocabularyContext from "../../context/VocabularyContext";
import useBadge from "../../hooks/useBadge";

function ListCard({ vocabulary }) {
  const { showBadge, badgeText } = useBadge(vocabulary);
  const { showModal } = useContext(VocabularyContext);

  return (
    <div className="mt-5 flex flex-col hover:shadow-lg transition-shadow duration-300 relative cursor-pointer">
      {showBadge && (
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

      <div
        className="bg-white shadow-md rounded-md p-5"
        onClick={() => showModal(vocabulary)}
      >
        <div className="flex items-center text-gray-400 gap-2">
          <BsCalendar3 fontSize={14} />
          <span className="text-xs">{vocabulary.createdAt.substr(0, 10)}</span>
        </div>
        <div className="flex-col mt-2">
          <div className="text-primary font-bold capitalize text-lg">
            {vocabulary.vocab}
          </div>
          <div className="font-bold text-sm capitalize">
            {vocabulary.translate}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListCard;
