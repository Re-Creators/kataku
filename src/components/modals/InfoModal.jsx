import React from "react";
import DeleteVocabularyModal from "./DeleteVocabularyModal";
import EditVocabularyModal from "./EditVocabularyModal";

function InfoModal() {
  const [showDelete, setShowDelete] = React.useState(false);

  const toggleDelete = () => setShowDelete(!showDelete);

  return (
    <>
      {showDelete ? (
        <DeleteVocabularyModal toggleDelete={toggleDelete} />
      ) : (
        <EditVocabularyModal toggleDelete={toggleDelete} />
      )}
    </>
  );
}

export default InfoModal;
