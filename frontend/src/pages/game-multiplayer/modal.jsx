import Modal from "react-bootstrap/Modal";
import styles from "./style.module.css";

const Modal = ({ title, bodyText, props }) => {
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{bodyText}</p>
        <div className={styles.container}>
          <div className={styles.snipetContainer}>
            <div className={styles.ldsRipple1}>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Modal;
