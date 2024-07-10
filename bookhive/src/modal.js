import Modal from "react-bootstrap/Modal"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { postData } from "./fetch";
import { ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Model(props) {
  const [genere, setGenere] = useState("");
  const [author, setAuthor] = useState({ name: "", biography: "", author_image: "" })
  const [error, setError] = useState({});
  function handleData(event) {
    if (props.type === 'genere') {
      setGenere(event.target.value);
    }
    else {
      setAuthor({ ...author, [event.target.name]: event.target.value });
    }
  }
  async function addData() {
    if (props.type === 'genere') {
      if (genere === '' || genere === null || typeof genere === 'undefined') {
        let error = {};
        error.name = "Genere name should not be empty";
        setError(error);
      }
      else {
        let msg = await postData("http://localhost:3000/generes/", "post", { genre_name: genere });
        if (msg.hasOwnProperty('msg')) {
          toast.error(msg.msg);
         
        }
        else if (msg.hasOwnProperty('genre_id')) {
          toast.success("Added Successfully");
          props.close();
        }
        else {
         
         toast.error("something went wrong")
        }
      }
    }
    else {
      toast.success("add");
      console.log(author);
    }
  }
  return (
    <>
    <Modal show={props.show} onHide={props.onClick}>
      <Modal.Header>
        {props.close && <Modal.Title><h1 className="h3">{props.type === 'genere' ? "Add Genere" : "ADD Author"}</h1></Modal.Title>}
        <span className="btn-close" style={{ float: "right !important" }} onClick={props.onClick}></span>
      </Modal.Header>
      <Modal.Body>{props.msg ? props.msg :
        <Form>
          <Form.Control name={props.type === 'genere' ? "genre_name" : "name"} placeholder={props.type === 'genere' ? "Enter Genere Name" : "Enter Author's Name"} className="mt-2" onChange={handleData} />
          {error.name && <h1 className="text-danger mt-1 h6">{error.name}</h1>}
          {props.type !== 'genere' &&
            <>
              <Form.Control name="biography" as="textarea" placeholder="Enter Author's biography" className="mt-3" onChange={handleData} />
              <Form.Control type="file" accept="image/*" name="author_image" placeholder="Select Image" className="mt-3" onChange={handleData} /></>}
        </Form>


      }</Modal.Body>
      <Modal.Footer>
        {props.type && <Button variant="primary" onClick={props.value ? props.value : addData}>
          Ok
        </Button>}
        <Button variant="secondary" onClick={props.onClick}>
          Close
        </Button>
      </Modal.Footer>
      <ToastContainer position="top-center"/>
    </Modal>
    
     </>
  )
}