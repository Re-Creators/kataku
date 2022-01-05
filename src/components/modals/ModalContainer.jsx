import { CSSTransition } from "react-transition-group";
import { createPortal } from "react-dom";
import { useEffect } from "react";

function ModalContainer({ isModalOpen, transitionName, onCLose, children }) {
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isModalOpen]);
  return createPortal(
    <>
      <CSSTransition
        in={isModalOpen}
        timeout={300}
        classNames={transitionName}
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
          className="fixed z-10 inset-0 bg-[rgba(0,0,0,0.6)]"
          onClick={() => onCLose()}
        ></div>
      </CSSTransition>
    </>,
    document.getElementById("portal")
  );
}

export default ModalContainer;
