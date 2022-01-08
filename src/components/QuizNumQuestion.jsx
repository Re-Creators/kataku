import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getQuestions } from "../features/question/questionSlice";
import axios from "../axios";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

function QuizNumQuestion({ startQuiz, setNumQuestion }) {
  const dispatch = useDispatch();
  const [numQuiz, setNumQuiz] = useState(1);
  const [maxQuiz, setMaxQuiz] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get("/questions/max-question");
      setMaxQuiz(data.maxQuestion);
      return;
    }
    fetchData();
  }, []);
  function onQuizStart() {
    setNumQuestion(numQuiz);
    dispatch(getQuestions(numQuiz));
    startQuiz();
  }
  if (maxQuiz === null)
    return (
      <div className="w-full mt-10 flex items-center justify-center">
        <Spinner classSize="w-10 h-10" />
      </div>
    );
  return (
    <div className="flex flex-col items-center w-full md:w-2/5">
      {maxQuiz > 5 ? (
        <>
          <div className="text-center">
            <h1 className="text-3xl font-bold">Jumlah Soal ?</h1>
            <span className="text-sm">(max : {maxQuiz})</span>
          </div>
          <div className="my-10 w-1/2">
            <input
              type="number"
              max={maxQuiz}
              min={1}
              value={numQuiz}
              onChange={(e) => setNumQuiz(e.target.value)}
              className=" bg-transparent outline-none border-b-2 border-gray-400 focus:border-primary transition-all duration-300 w-full text-center text-xl text-primary"
            />
          </div>
          <button
            className=" w-1/2 bg-primary py-3 px-10 text-white rounded-md hover:shadow-lg transition-all duration-100"
            onClick={onQuizStart}
          >
            Mulai
          </button>
        </>
      ) : (
        <>
          <p className="text-xl w-4/5">
            Tidak dapat melakukan kuis, karena daftar kosakata anda kurang dari
            5.
          </p>

          <Link
            to="/"
            className="mt-10 px-5 py-2 bg-primary rounded-md text-white"
          >
            Tambah Kosakata
          </Link>
        </>
      )}
    </div>
  );
}

export default QuizNumQuestion;
