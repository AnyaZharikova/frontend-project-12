import { useSelector } from 'react-redux'
import getModalComponent from './index.js'

const Modal = () => {
  const modalType = useSelector(state => state.modalsReducer.modals.modalType)

  if (modalType === '') {
    return null
  }
  const ModalComponent = getModalComponent(modalType)
  return <ModalComponent />
}

export default Modal
