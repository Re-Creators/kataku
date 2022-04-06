import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { useDispatch } from "react-redux";
import { getVocabularies } from "../features/vocabulary/vocabularySlice";
import { vocabularySelector } from "../features/vocabulary/vocabularySlice";
import { useSelector } from "react-redux";
import ModalContainer from "../components/modals/ModalContainer";
import EditVocabularyModal from "../components/modals/EditVocabularyModal";
import DeleteVocabularyModal from "../components/modals/DeleteVocabularyModal";
import Filter from "../components/Filter";
import GridView from "../components/vocabulary-list/GridView";
import VocabularyContext from "../context/VocabularyContext";
import { MdGridView } from "react-icons/md";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import ListView from "../components/vocabulary-list/ListView";
import ReactPaginate from "react-paginate";
import EditToggle from "../components/vocabulary-list/EditToggle";

const VIEW = {
  GRID: "grid",
  LIST: "list",
};

function VocabularyList() {
  const dispatch = useDispatch();
  const {
    data: vocabularies,
    isFetching,
    pageInfo,
  } = useSelector(vocabularySelector);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [view, setView] = useState(VIEW.GRID);

  const handlePageClick = (event) => {
    dispatch(getVocabularies({ page: event.selected + 1 }));
  };

  useEffect(() => {
    dispatch(getVocabularies());
  }, [dispatch]);

  return (
    <div className="mt-10 w-4/5 mx-auto pb-10">
      <ModalContainer
        transitionName="fade"
        isModalOpen={showEditModal}
        onCLose={() => setShowEditModal(false)}
      >
        <EditVocabularyModal onCLose={() => setShowEditModal(false)} />
      </ModalContainer>
      <ModalContainer
        transitionName="fade"
        isModalOpen={showDelModal}
        onCLose={() => setShowDelModal(false)}
      >
        <DeleteVocabularyModal onClose={() => setShowDelModal(false)} />
      </ModalContainer>

      <h1 className="text-3xl">Daftar Kosakata</h1>
      <div className="flex flex-col">
        <div className="flex flex-col-reverse md:flex-row justify-between mt-5 ">
          <EditToggle
            editMode={editMode}
            toggleHandler={() => setEditMode(!editMode)}
          />
          <div className="flex">
            <Filter />
            <div className="flex">
              <button
                className={`p-3 rounded-md ${
                  view === VIEW.LIST ? "bg-primary text-white" : ""
                }`}
                onClick={() => setView(VIEW.LIST)}
              >
                <MdOutlineFormatListBulleted />
              </button>
              <button
                className={`p-3 rounded-md ${
                  view === VIEW.GRID ? "bg-primary text-white" : ""
                }`}
                onClick={() => setView(VIEW.GRID)}
              >
                <MdGridView />
              </button>
            </div>
          </div>
        </div>

        {isFetching ? (
          <div className="w-full mt-10 flex items-center justify-center">
            <Spinner classSize="w-10 h-10" />
          </div>
        ) : (
          <VocabularyContext.Provider
            value={{
              vocabularies,
              editMode,
              toggleEditModal: () => setShowEditModal(true),
              toggleDelModal: () => setShowDelModal(true),
            }}
          >
            {view === VIEW.GRID ? (
              <GridView vocabularies={vocabularies} />
            ) : (
              <ListView vocabularies={vocabularies} />
            )}
          </VocabularyContext.Provider>
        )}
      </div>
      {pageInfo?.totalPage > 1 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel="&raquo;"
          pageRangeDisplayed={5}
          forcePage={pageInfo.currentPage - 1}
          pageCount={pageInfo?.totalPage}
          onPageChange={handlePageClick}
          previousLabel="&laquo;"
          containerClassName="pagination"
          pageClassName="pagination__page"
          activeClassName="pagination__page--active"
          previousClassName="pagination__page--prev"
          nextClassName="pagination__page--next"
          breakClassName="pagination__page--break"
          disabledClassName="pagination__page--disabled"
          disabledLinkClassName="pagination__page--disabled-link"
          renderOnZeroPageCount={null}
        />
      )}
    </div>
  );
}

export default VocabularyList;
