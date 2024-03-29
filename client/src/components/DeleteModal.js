import React, { useState } from 'react'
import { Modal, Button } from "@material-ui/core";

function DeleteModal() {
    const [show, setshow] = useState(false);
    const handleClose = () => {
        console.log("ABCD");
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
          </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
          </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteModal
