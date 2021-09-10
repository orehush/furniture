import Modal from 'reactstrap/lib/Modal';
import {useState, useEffect} from "react";

export default function ModalWrapper({ show, onClose, children }) {
    const [isOpen, setIsOpen] = useState(show);
    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        setIsOpen(show);
    }, [show])

    return <Modal isOpen={isOpen} toggle={toggle} onClosed={onClose}>
        {children}
    </Modal>
}
