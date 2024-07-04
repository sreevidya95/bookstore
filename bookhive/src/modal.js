import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
export default function Model(props) {
  return (
    <Modal show={props.show} onHide={props.onClick}>
      <Modal.Header>
        <Modal.Title><button className="btn-close" onClick={props.onClick} style={{ float: "right !important" }}></button>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.msg}</Modal.Body>
      <Modal.Footer>
        {props.type && <Button variant="primary" onClick={props.value}>
          Ok
        </Button>}
        <Button variant="secondary" onClick={props.onClick}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}