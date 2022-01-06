import React, { useCallback, useState } from "react";
import axios from "../axios";
import Notification from "../components/Notification";
import Spinner from "../components/Spinner";
import { CSSTransition } from "react-transition-group";
import { useSelector } from "react-redux";
import { userSelector } from "../features/user/userSlice";

function NewVocab() {
  const [english, setEnglish] = useState("");
  const { user } = useSelector(userSelector);
  const [indonesia, setIndonesia] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const addVocabulary = useCallback(async () => {
    if (indonesia !== "" && english !== "") {
      try {
        setLoading(true);
        await axios.post("/vocabularies", {
          userId: user._id,
          english,
          indonesia,
        });
        setLoading(false);
        triggerNotification();
        setIndonesia("");
        setEnglish("");
      } catch (err) {
        console.log(err);
      }
    }
  }, [indonesia, english]);

  function triggerNotification() {
    setShowNotif(true);

    setTimeout(() => {
      setShowNotif(false);
    }, 1500);
  }
  return (
    <div className="flex items-center mx-auto w-[30%]  justify-center h-screen min-h-[400px] max-h-[600px]">
      <CSSTransition
        in={showNotif}
        timeout={500}
        classNames="slideY"
        unmountOnExit
      >
        <Notification />
      </CSSTransition>
      <div className="flex flex-col w-full">
        <div className="mb-10">
          <label className="block text-2xl mb-6">Inggris</label>
          <input
            type="text"
            className=" bg-transparent outline-none border-b-2 border-gray-400 focus:border-primary transition-all duration-300 w-full text-center text-xl text-primary"
            value={english}
            onChange={(e) => setEnglish(e.target.value)}
          />
        </div>
        <div className="mb-10">
          <label className="block text-2xl mb-6">Indonesia</label>
          <input
            type="text"
            className=" bg-transparent outline-none border-b-2 border-gray-400 focus:border-primary transition-all duration-300 w-full text-center text-xl text-primary"
            value={indonesia}
            onChange={(e) => setIndonesia(e.target.value)}
          />
        </div>
        <button
          className="bg-primary py-3 px-10 text-white rounded-md hover:shadow-lg transition-all duration-100 disabled:opacity-75 "
          onClick={() => addVocabulary()}
          disabled={loading}
        >
          {loading ? <Spinner /> : "Tambah"}
        </button>
      </div>
    </div>
  );
}

export default NewVocab;
