import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

function DeleteToast(props) {
    async function deleteEvent(){
        const settings = {
            method: 'DELETE'
        };
        const urlStr = `api/${props.controller.prefix}/Delete/${props.state.record[`${props.controller.prefix}Id`]}`
        try {
            const fetchResponse = await fetch(urlStr, settings);
            props.toggle()
            window.location.reload()
        } catch (e) {
            return e;
        }    
    }

    return(
        <Modal isOpen={props.state.isVisisble}>
            <ModalHeader>Delete Customer</ModalHeader>
            <ModalBody>
                Are you sure?
          </ModalBody>
            <ModalFooter>
                <Button className="btn btn-dark" onClick = {() => props.toggle(props.state.actionId)}>Cancel</Button>
                <Button className="btn btn-danger" onClick = {deleteEvent}>Delete{' '}<i className = "fas fa-times"></i></Button>
            </ModalFooter>
        </Modal>
    )
}
export default DeleteToast