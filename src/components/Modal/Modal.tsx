import * as React from 'react';

type ModalProps = {
  message: string;
  visible: boolean;
  onSuccess: () => void;
  onCancel: () => void;
};

const Modal = (props: ModalProps) => {
  return (
    <div className={`modal modal--${props.visible ? 'visible' : 'hidden'}`}>
      <div className="modal__content">
        <p>{props.message}</p>
        <div className="btns">
          <button
            className="btn btn--success"
            onClick={() => props.onSuccess()}
          >
            Ok
          </button>
          <button
            className="btn btn--failure"
            onClick={() => props.onCancel()}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Modal);

