import Modal from "react-bootstrap/Modal"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { postData, postFormData } from "./fetch";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const FormData = require('form-data')
export default function Model(props) {
  const [genere, setGenere] = useState("");
  const [author, setAuthor] = useState({ name: "", biography: "", author_image: "" })
  const [error, setError] = useState({});
  function handleData(event) {
    if (props.type === 'genere') {
      setGenere(event.target.value);
    }
    else {
      if (event.target.name === 'author_image') {
        // console.log(event.target.files[0]);
        setAuthor({ ...author, [event.target.name]: event.target.files[0] })
      }
      else {
        setAuthor({ ...author, [event.target.name]: event.target.value });
      }
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
          toast.error(msg.msg, {
            onClose: () => props.close()
          });


        }
        else if (msg.hasOwnProperty('genre_id')) {
          toast.success("Added Successfully", {
            onClose: () => props.close()
          });
        }
        else {

          toast.error("something went wrong", {
            onClose: () => props.close()
          })
        }
      }
    }
    else {
      let error = {};
      if (author.name === '' || author.name === null || typeof author.name === 'undefined') {
        error.name = "Author's name should not be empty";
      }
      else if (author.biography === '' || author.biography === null || typeof author.biography === 'undefined') {
        error.biography = "Biography should not be Empty"
      }
      else {
        var data = new FormData();
        Object.entries(author).forEach(([key, value]) => {
          if (value !== '') {
            data.append(key, value);
          }
        });
        if (author.author_image !== null && author.author_image !== '') {
          data.set('author_image', author.author_image)
        }
        let msg = await postFormData("http://localhost:3000/authors/", "post", data);
        if (msg.hasOwnProperty('msg')) {
          toast.error(msg.msg, {
            onClose: () => props.close()
          });

        }
        else if (msg.hasOwnProperty('author_id')) {
          toast.success("Author Created Successfully", {
            onClose: () => props.close()
          });
        }
        else {
          toast.error("Something Went Wrong", {
            onClose: () => props.close()
          });

        }
      }
      setError(error);
    }
  }
  return (
    <>
      <Modal show={props.show} onHide={props.onClick}>
        <Modal.Header>
          {props.close && <Modal.Title><h1 className="h3">{props.type === 'genere' ? "Add Genere" : "ADD Author"}</h1></Modal.Title>}
          <span className="btn-close" style={{ float: "right !important" }} onClick={props.onClick ? props.onClick : props.close}></span>
        </Modal.Header>
        <Modal.Body>{props.msg ? props.msg :
          <Form>
            <Form.Control name={props.type === 'genere' ? "genre_name" : "name"} placeholder={props.type === 'genere' ? "Enter Genere Name" : "Enter Author's Name"} className="mt-2" onChange={handleData} />
            {error.name && <h1 className="text-danger mt-1 h6">{error.name}</h1>}
            {props.type !== 'genere' &&
              <>
                <Form.Control name="biography" as="textarea" placeholder="Enter Author's biography" className="mt-3" onChange={handleData} />
                {error.biography && <h1 className="text-danger mt-1 h6">{error.biography}</h1>}
                <Form.Control type="file" accept="image/*" name="author_image" placeholder="Select Image" className="mt-3" onChange={handleData} /></>}
          </Form>


        }</Modal.Body>
        <Modal.Footer>
          {props.type && <Button variant="primary" onClick={props.value ? props.value : addData}>
            Ok
          </Button>}
          <Button variant="secondary" onClick={props.onClick ? props.onClick : props.close}>
            Close
          </Button>
        </Modal.Footer>
        <ToastContainer position="top-center" />
      </Modal>

    </>
  )
}