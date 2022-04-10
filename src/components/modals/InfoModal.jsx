import React from "react";
import DeleteVocabularyModal from "./DeleteVocabularyModal";
import EditVocabularyModal from "./EditVocabularyModal";

function InfoModal({ onCLose }) {
  const [showDelete, setShowDelete] = React.useState(false);

  const toggleDelete = () => setShowDelete(!showDelete);

  return (
    <>
      {showDelete ? (
        <DeleteVocabularyModal
          toggleDelete={toggleDelete}
          closeModal={onCLose}
        />
      ) : (
        <EditVocabularyModal toggleDelete={toggleDelete} onCLose={onCLose} />
      )}
    </>
  );
}

export default InfoModal;
