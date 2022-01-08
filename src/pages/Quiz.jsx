import QuizNumQuestion from "../components/quiz/QuizNumQuestion";
import { useRef, useState } from "react";
import Question from "../components/quiz/Question";
import Result from "../components/quiz/Result";
import { selectQuestions } from "../features/question/questionSlice";
import { useSelector } from "react-redux";
import { selectLoading } from "../features/question/questionSlice";
import Spinner from "../components/Spinner";

function Quiz() {
  const quizData = useRef({
    correctCount: 0,
    numQuiz: 0,
  });
  const questions = useSelector(selectQuestions);
  const loading = useSelector(selectLoading);
  const [isStart, setIsStart] = useState(false);
  const [currentQuizNum, setCurrentQuizNum] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  function nextQuestion() {
    if (currentQuizNum === questions.length - 1) {
      setIsFinished(true);
      return;
    }

    setCurrentQuizNum((oldVal) => oldVal + 1);
  }

  function playAgain() {
    setCurrentQuizNum(0);
    quizData.current = {
      correctCount: 0,
      numQuiz: 0,
    };
    setIsFinished(false);
    setIsStart(false);
  }

  if (loading)
    return (
      <div className="w-full mt-10 flex items-center justify-center">
        <Spinner classSize="w-10 h-10" />
      </div>
    );
  return (
    <div className="flex items-center mx-auto w-full  justify-center h-screen min-h-[400px] max-h-[600px]">
      {!isFinished ? (
        isStart && questions.length > 0 ? (
          <Question
            nextQuestion={nextQuestion}
            question={questions[currentQuizNum]}
            answerCorrect={() => quizData.current.correctCount++}
          />
        ) : (
          <QuizNumQuestion
            startQuiz={() => setIsStart(true)}
            setNumQuestion={(numQuiz) => (quizData.current.numQuiz = numQuiz)}
          />
        )
      ) : (
        <Result quizData={quizData} playAgain={playAgain} />
      )}
    </div>
  );
}

export default Quiz;
