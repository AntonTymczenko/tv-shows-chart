import React from 'react'
import PropTypes from 'prop-types';
import Modal from 'react-modal'

Modal.setAppElement('#root')

function ModalDetailedView({open, show, close}) {
  return (
    <Modal
      isOpen={open}
      onRequestClose={close}
      contentLabel={show.title}
      className="modal"
    >
      <button
        className="modal__close-button"
        onClick={close}>Close</button>
      <div className="modal__body">
        <h3>{show.title}</h3>
        <p>{show.overview}</p>
      </div>
    </Modal>
  )
}

ModalDetailedView.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
}

export default ModalDetailedView
