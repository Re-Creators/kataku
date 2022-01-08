import React from "react";
import { Link } from "react-router-dom";

function Result({ quizData, playAgain }) {
  return (
    <div>
      <div className="w-96">
        <img
          src="/images/undraw_winners.png"
          alt=""
          className="w-full h-full"
        />
      </div>
      <div className="flex flex-col items-center gap-y-5">
        <h1 className="text-6xl font-bold text-secondary text-center mt-5">
          Hasil
        </h1>
        <div className="text-3xl font-semibold">
          {quizData.current.correctCount} / {quizData.current.numQuiz}
        </div>
        <div className="flex text-white mt-10">
          <Link
            to="/quiz"
            className="mr-5 px-10 text-xl py-2 rounded-md bg-secondary"
            onClick={() => playAgain()}
          >
            Ulang
          </Link>
          <Link
            to="/vocabulary"
            className="px-10 text-xl py-2 rounded-md bg-primary"
          >
            Selesai
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Result;
