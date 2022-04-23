import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { getVocabularies, vocabularySelector } from "../../features/vocabulary/vocabularySlice"
import axios from "../../axios"
import { BiTrash } from "react-icons/bi"
import Spinner from "../Spinner"
import SubmitButton from "../shared/SubmitButton"

function EditVocabularyModal({ onCLose, toggleDelete }) {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { selectedVocabulary } = useSelector(vocabularySelector)
  const [translate, setTranslate] = useState(selectedVocabulary.translate)
  const [vocab, setVocab] = useState(selectedVocabulary.vocab)
  const [isCompleted, setIsCompleted] = useState(selectedVocabulary.isCompleted)

  const onUpdate = async () => {
    try {
      setLoading(true)
      await axios.put(`/vocabularies/${selectedVocabulary._id}`, {
        vocab,
        translate,
        isCompleted,
        ...(selectedVocabulary.isCompleted && !isCompleted && { correctCount: 0 }),
      })

      setLoading(false)
      dispatch(getVocabularies())
      onCLose()
    } catch (err) {
      console.log(err)
    }
  }

  const diffCheck = () => {
    if (
      selectedVocabulary.translate !== translate ||
      selectedVocabulary.vocab !== vocab ||
      selectedVocabulary.isCompleted !== isCompleted
    ) {
      return false
    }
    return true
  }

  return (
    <div className="modal p-10">
      <div className="absolute top-5 right-5">
        <button onClick={toggleDelete}>
          <BiTrash className="text-xl text-red-500" />
        </button>
      </div>
      <div className="mb-5">
        <label>Bahasa</label>
        <div className="flex mt-2 items-center">
          <img
            src={`/images/flags/${selectedVocabulary.language}.png`}
            alt="Flag Languages"
            className="w-8 h-8"
          />
          <span className="ml-2">{selectedVocabulary.language}</span>
        </div>
      </div>
      <div className="mb-5">
        <label>Kosa Kata</label>
        <input
          type="text"
          className="w-full border-2 border-transparent mt-2 p-2 outline-none focus:border-primary"
          value={vocab}
          onChange={(e) => setVocab(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label>Terjemahan</label>
        <input
          type="text"
          className="w-full border-2 border-transparent mt-2 p-2 outline-none focus:border-primary"
          value={translate}
          onChange={(e) => setTranslate(e.target.value)}
        />
      </div>
      <div className="mb-5 flex items-center gap-1">
        <input
          type="checkbox"
          className="border-2 outline-none focus:border-primary"
          checked={isCompleted}
          onChange={() => setIsCompleted(!isCompleted)}
          id="isCompleted"
        />
        <label className="text-sm" htmlFor="isCompleted">
          Sudah hafal
        </label>
      </div>
      <div className="mb-5">
        <SubmitButton
          handleClick={onUpdate}
          loading={loading}
          disabled={diffCheck() || loading}
          text="Simpan Perubahan"
          extraClassName="w-full"
        />
      </div>
    </div>
  )
}

export default EditVocabularyModal
