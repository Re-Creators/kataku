import React, { useState } from "react";
import axios from "../axios";

function Questions({ nextQuestion, question, answerCorrect }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  function onChooseAnswer(answer) {
    if (!isAnswered) {
      if (answer === question.answer) {
        try {
          axios.post(`/questions/correct/${question.id}`);
        } catch (err) {
          console.log(err);
        }
        answerCorrect();
      }

      setSelectedAnswer(answer);
      setIsAnswered(true);
    }
  }

  function onNextQuestion() {
    setIsAnswered(false);
    setSelectedAnswer(null);
    nextQuestion();
  }

  function optionClass(option) {
    if (isAnswered) {
      if (question.answer === option) {
        return "bg-secondary text-white ";
      } else if (
        selectedAnswer !== question.answer &&
        selectedAnswer === option
      ) {
        return "bg-red-500 text-white";
      }
      return "bg-white ";
    }
    return "bg-white hover:bg-secondary hover:text-white";
  }
  return (
    <div className="w-4/5 md:w-[30%] flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center">{question.question}</h1>
      <div className="w-full flex flex-wrap justify-between my-10 gap-5">
        {question.options.map((option, index) => (
          <div
            className={`${optionClass(
              option
            )} px-3 py-5 rounded-lg cursor-pointer w-full text-center transition-all duration-300`}
            key={index}
            onClick={() => onChooseAnswer(option)}
          >
            {option}
          </div>
        ))}
      </div>
      <button
        className="w-1/2 bg-primary py-3 px-10 text-white rounded-md hover:shadow-lg transition-all duration-100"
        onClick={() => onNextQuestion()}
      >
        Selanjutnya
      </button>
    </div>
  );
}

export default Questions;
