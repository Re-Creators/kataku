import { BsCalendar3 } from "react-icons/bs";

import { useContext } from "react";
import VocabularyContext from "../context/VocabularyContext";
import useBadge from "../hooks/useBadge";
import EditOption from "./shared/EditOption";

function VocabularyCard({ vocabulary }) {
  const { showBadge, badgeText } = useBadge(vocabulary);
  const { editMode } = useContext(VocabularyContext);

  return (
    <div className="mb-5 md:mb-0 h-52 bg-white p-5 rounded-md cursor-pointer hover:shadow-lg transition-shadow duration-300 relative">
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

      {editMode && <EditOption vocabulary={vocabulary} />}

      <div className="flex items-center text-gray-400 gap-2">
        <BsCalendar3 fontSize={14} />
        <span className="text-xs">{vocabulary.createdAt.substr(0, 10)}</span>
      </div>
      <div className="flex items-center justify-center mt-8 flex-col">
        <div className="text-2xl lg:text-2xl xl:text-4xl text-primary font-bold capitalize">
          {vocabulary.english}
        </div>
        <div className="text-lg lg:text-xl xl:text-2xl  font-bold mt-4 capitalize">
          {vocabulary.indonesia}
        </div>
      </div>
    </div>
  );
}

export default VocabularyCard;
