import { useState } from "react";
import Notification from "../components/Notification";
import Spinner from "../components/Spinner";
import { CSSTransition } from "react-transition-group";
import { useSelector } from "react-redux";
import { userSelector } from "../features/user/userSlice";
import { postData } from "../api";
import LanguageSelect from "../components/shared/LanguageSelect";

function NewVocab() {
  const [vocab, setVocab] = useState("");
  const { user } = useSelector(userSelector);
  const [translate, setTranslate] = useState("");
  const [language, setLanguage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const addVocabulary = async () => {
    setLoading(true);

    await postData("/vocabularies", {
      userId: user._id,
      vocab,
      translate,
      language,
    });

    setLoading(false);
    triggerNotification();
    setTranslate("");
    setVocab("");
  };

  function triggerNotification() {
    setShowNotif(true);

    setTimeout(() => {
      setShowNotif(false);
    }, 1500);
  }
  return (
    <div className="flex items-center mx-auto w-4/5 md:w-[30%]  justify-center h-screen min-h-[400px] max-h-[600px]">
      <CSSTransition
        in={showNotif}
        timeout={500}
        classNames="slideY"
        unmountOnExit
      >
        <Notification />
      </CSSTransition>
      <div className="flex flex-col w-full">
        <div className="mb-5">
          <label className="block text-2xl mb-3">Bahasa</label>
          <LanguageSelect selectHandler={(value) => setLanguage(value)} />
        </div>
        <div className="mb-5">
          <label className="block text-2xl mb-3">Kosa Kata</label>
          <input
            type="text"
            className=" bg-white outline-none border-2  focus:border-primary transition-all duration-300 w-full text-center text-xl text-primary py-2"
            value={vocab}
            onChange={(e) => setVocab(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label className="block text-2xl mb-3">Terjemahan</label>
          <input
            type="text"
            className=" bg-white outline-none border-2 py-2  focus:border-primary transition-all duration-300 w-full text-center text-xl text-primary"
            value={translate}
            onChange={(e) => setTranslate(e.target.value)}
          />
        </div>
        <button
          className="bg-primary py-2 px-10 text-white rounded-md hover:shadow-lg transition-all duration-100 disabled:opacity-75 "
          onClick={addVocabulary}
          disabled={loading || !vocab.trim().length || !translate.trim().length}
        >
          {loading ? <Spinner /> : "Tambah"}
        </button>
      </div>
    </div>
  );
}

export default NewVocab;
