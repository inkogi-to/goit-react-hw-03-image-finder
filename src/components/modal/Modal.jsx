import {createPortal} from "react-dom";
import {Component} from "react";
import PropTypes from "prop-types";

import {ModalOverlay, ModalContainer, Img} from './Modal.styled';


const modalRoot = document.getElementById("modal-root");


class Modal extends Component {


  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  }
  handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  }


  render() {
    const {selectedImage, tags} = this.props;

    return createPortal(<ModalOverlay onClick={this.handleBackdropClick}>
      <ModalContainer>
        <Img src={selectedImage} alt={tags}/>
      </ModalContainer>
    </ModalOverlay>, modalRoot);

  }

}

export default Modal;

Modal.propTypes = {
  selectedImage: PropTypes.string,
  tags: PropTypes.string,
  onClose: PropTypes.func,
}
