import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
export default function Model(props){
    return(
        <Modal show={props.show} onHide={props.onClick}>
        <Modal.Header>
          <Modal.Title><button className="btn-close" onClick={props.onClick} style={{float:"right !important"}}></button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Your Enquiry is submitted successfully</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onClick}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
}