import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NewVocab from "./pages/NewVocab";
import { fetchUser } from "./features/user/userSlice";
import { useDispatch } from "react-redux";
import VocabularyList from "./pages/VocabularyList";
import Quiz from "./pages/Quiz";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PublicLayout from "./layouts/PublicLayout";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("kataku_token")) {
      dispatch(fetchUser());
    }
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="new-vocabulary" element={<NewVocab />} />
          <Route path="vocabulary" element={<VocabularyList />} />
          <Route path="quiz" element={<Quiz />} />
        </Route>
        <Route
          path="/login"
          element={
            <PublicLayout>
              <Login />
            </PublicLayout>
          }
        />
        <Route
          path="/register"
          element={
            <PublicLayout>
              <Register />
            </PublicLayout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
