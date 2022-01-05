import { CSSTransition } from "react-transition-group";
import { createPortal } from "react-dom";
import { selectModal } from "../../features/modal/modalSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../features/modal/modalSlice";

function ModalContainer({ show, onClose, children }) {
  const isModalOpen = useSelector(selectModal);
  const dispatch = useDispatch();

  return createPortal(
    <>
      <CSSTransition
        in={isModalOpen}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        {children}
      </CSSTransition>
      <CSSTransition
        in={isModalOpen}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <div
          className="absolute z-10 inset-0 bg-[rgba(0,0,0,0.6)]"
          onClick={() => dispatch(toggleModal())}
        ></div>
      </CSSTransition>
      ;
    </>,
    document.getElementById("portal")
  );
}

export default ModalContainer;
