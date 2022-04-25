import { useContext } from "react"
import { BsCalendar3 } from "react-icons/bs"
import VocabularyContext from "../context/VocabularyContext"

import useBadge from "../hooks/useBadge"

function VocabularyCard({ vocabulary }) {
  const { showBadge, badgeText } = useBadge(vocabulary)
  const { showModal } = useContext(VocabularyContext)

  return (
    <div
      className="mb-5 md:mb-0 h-52 bg-white p-5 rounded-md cursor-pointer hover:shadow-lg transition-shadow duration-300 relative"
      onClick={() => showModal(vocabulary)}
    >
      {showBadge && (
        <div className="absolute top-1 -right-3 w-20 h-14">
          <img src={`/images/${badgeText}-badge.svg`} alt="" className="w-full h-full" />

          <p className="absolute w-full text-center top-1/2 -translate-y-1/2 text-white text-sm">
            {badgeText}
          </p>
        </div>
      )}

      <div className="flex items-center text-gray-400 gap-2">
        <BsCalendar3 fontSize={14} />
        <span className="text-xs">{vocabulary.createdAt.substr(0, 10)}</span>
      </div>
      <div className="flex items-center justify-center mt-5 flex-col">
        <div className="w-full py-2 line-clamp-1 text-center text-2xl lg:text-2xl xl:text-4xl text-primary font-bold capitalize">
          {vocabulary.vocab}
        </div>
        <div className="text-lg lg:text-xl xl:text-2xl  font-bold mt-4 capitalize line-clamp-2">
          {vocabulary.translate}
        </div>
      </div>
    </div>
  )
}

export default VocabularyCard
