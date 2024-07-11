import { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { getData, postFormData,postData } from "./fetch";
import Model from "./modal";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const FormData = require('form-data')
export default function Offcanva(props) {
  const [authors, setAuthors] = useState();
  const [generes, setGenere] = useState();
  const [loading, setloading] = useState(false);
  const [to, setToast] = useState(false);
  const [add, setAdd] = useState("");
  const [error, setError] = useState({});
  const[upload,setUpload]=useState(false);
  const[ptype,setptype]=useState("password");
  const[admin,setAdmin]=useState({name:"",email:"",password:"",cp:""})
  const [book, setBook] = useState({ title: "", price: "", publication_date: "", book_image: "", AuthorAuthorId: "", GenreGenreId: "" })
  useEffect(() => {
    LoadData();
  }, []);
  function handleClose() {
    setToast(false);
    LoadData();
  }
  async function LoadData() {
    setloading(true);
    if (props.id > 0) {
      const b = await getData(`http://localhost:3000/books/${props.id}`, "get");
      setBook(b);
    }
    const author = await getData("http://localhost:3000/authors/", "get");
    const genere = await getData("http://localhost:3000/generes/", "get");
    setGenere(genere);
    setAuthors(author);
    setloading(false);
  }
  const [type, setType] = useState("text");
  function toggleType(){
    if(ptype==='text'){
      setptype("password")
    }
    else{
      setptype("text")
    }
  }
  async function AddBook(id) {
      let error = {};
      if (book.title === '') {
        error.title = "Book's Title Shouldnt be Empty";
      }
      else if (book.price === '') {
        error.price = "Book's Price Shouldnt be Empty";
      }
      else if (book.publication_date === '') {
        error.pd = "Book's Publication Date Shouldnt be Empty";
      }
      else if (book.AuthorAuthorId === '') {
        error.aid = "Please Select Author of the Book";
      }
      else if (book.GenreGenreId === '') {
        error.gid = "Please Select Book's Genere";
      }
      else {
        var data = new FormData();
        Object.entries(book).forEach(([key, value]) => {
          if (value !== '' && value!==null) {
            data.set(key, value);
          }
        });
        let msg;
        if(props.id>0){
          delete book.Author;
          delete book.Genre;
           msg = await postFormData(`http://localhost:3000/books/${props.id}`, "put", data);
        }
        else{
          msg = await postFormData("http://localhost:3000/books/", "post", data);
        }
        if (msg.hasOwnProperty('msg')) {
          toast.error(msg.msg, {
            onClose: () => props.onClick()
          });

        }
        else if (msg.hasOwnProperty('book_id')) {
          let message
          if(props.id>0){
            message="Book Updated Successfully";
          }
          else{
            message="Book Created Successfully";
          }
          toast.success(message, {
            onClose: () => { props.onClick(); props.onload() }
          });
        }
        else {
          toast.error("Something Went Wrong", {
            onClose: () => props.onClick()
          });

        }
      }
      setError(error);
  }
  async function AddAdmin(){
    setloading(true);
     let error={};
     if(admin.name===''){
         error.name="Admin Name should not be Empty";
     }
     else if(admin.email==='' || /\S+@\S+\.\S+/.test(admin.email)===false){
      error.email="Enter Valid Email"
     }
     else if(admin.password===''||!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/.test(admin.password))){
         error.p="Enter Valid Password,Make Sure Password contains Numbers,Letters and Symbols"
     }
     else if(admin.cp!==admin.password){
        error.cp="Confirm Passwrod should match with the Password"
     }
     else{
       delete admin.cp;
      let msg=await  postData("http://localhost:3000/login/new","post",admin);
      if (msg.hasOwnProperty('msg')) {
        toast.error(msg.msg,
        );

      }
      else if (msg.hasOwnProperty('admin_id')) {
        toast.success("Admin Added Successfully",{
          onClose: () => props.onClick()
        })
     }
  }
  setError(error);
      setloading(false)
}
  function handleChange(event) {
    if (event.target.name === 'book_image') {
      setBook({ ...book, [event.target.name]: event.target.files[0] });
    }
    else {
      if(props.id){
        setBook({ ...book, [event.target.name]: event.target.value });
      }
      else{
        setAdmin({...admin,[event.target.name]:event.target.value});
      }
      
    }
  }
  return (
    <Offcanvas show={props.show} placement="end">
      <Offcanvas.Header>
        <Offcanvas.Title>
          <h3 className="h3">{props.id ? props.id > 0 ? "Edit Book" : "Add Book" : "Add Admin"}</h3>
        </Offcanvas.Title>
        <span className="btn-close cur" style={{ float: "right !important" }} onClick={props.onClick}></span>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="container">
          <div className="row">
            {loading ?
              <div className="row">
                <div className="spinner-grow sp col-6 offset-6" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
              :
              <Form className="mt-5">
                {props.id ?
                <>
                <Form.Control name="title" placeholder="Enter Book Name" className={`mt-2 ${error.title ? "border border-danger" : "border border-secondary"}`} onChange={handleChange} value={book.title} />

                {error.title && <h1 className="text-danger mt-2 h6">{error.title}</h1>}

                <Form.Control name="price" type="number" placeholder="Enter Price of book" className={`mt-3 ${error.price ? "border border-danger" : "border border-secondary"}`} onChange={handleChange} 

                min="1" value={book.price} step="0.10"/>

                {error.price && <h1 className="text-danger mt-2 h6">{error.price}</h1>}

                <Form.Control name="publication_date" type={type} placeholder="Enter Publication Date"
                  onFocus={() => setType("date")} className={`mt-3 ${error.pd ? "border border-danger" : "border border-secondary"}`} onChange={handleChange} value={book.publication_date} />

                {error.pd && <h1 className="text-danger mt-2 h6">{error.pd}</h1>}
                {props.id>0 ?
                    (book.book_image===null  ? <h1 className="text-dark mt-2 h6">Image was not uploaded</h1> :
                    typeof book.book_image==='object' ? ""
                   : <img src={book.book_image} alt="no" height="100" width="100" className="mt-2" />):""
                }
                {props.id>0 && 
                  <Link to="#" type="btn"
                  onClick={()=>setUpload(true)} className="mt-2">Upload New Image</Link>
                }
               {(props.id===0 || upload===true) &&
                <Form.Control type="file" accept="image/*" name="book_image" placeholder="Select Image" className="mt-3 border-secondary" onChange={handleChange} />}

                <Form.Select name="AuthorAuthorId" className={`mt-3 ${error.aid ? "border border-danger" : "border border-secondary"}`} onChange={handleChange} value={book.AuthorAuthorId}>
                  <option value="">Select Author</option>
                  {authors && authors.map(e =>
                    <option value={e.author_id} key={e.author_id}>{e.name}</option>
                  )}
                </Form.Select>

                {error.aid && <h1 className="text-danger mt-2 h6">{error.aid}</h1>}

                <p className="mt-3">Couldn't find the Author You Want ? <Link to="#" type="btn"
                  onClick={() => { setToast(true); setAdd("addAuthor") }}> Click Here</Link></p>

                <Form.Select name="GenreGenreId" onChange={handleChange} value={book.GenreGenreId} className={`mt-3 ${error.gid ? "border border-danger" : "border border-secondary"}`}>
                  <option value="">Select Genere</option>
                  {generes && generes.map(e =>
                    <option value={e.genre_id} key={e.genre_id}>{e.genre_name}</option>
                  )}
                </Form.Select>

                {error.gid && <h1 className="text-danger mt-2 h6">{error.gid}</h1>}

                <p className="mt-3">Couldn't find the Genere You Want ? <Link to="#" type="btn"
                  onClick={() => { setToast(true); setAdd("genere") }}> Click Here</Link></p>

                <Button type="submit" as={Col} xs={{ span: 4, offset: 4 }} className="mt-5" onClick={() => AddBook(props.id)}>{props.id > 0 ? "Edit Book" : "Add Book"}</Button>
                </>:
                <>
                  <Form.Control name="name" placeholder="Enter Admin's Name" className={`mt-3 ${error.name ? "border border-danger" : "border border-secondary"}`} onChange={handleChange}/>
                  {error.name && <h1 className="text-danger mt-2 h6">{error.name}</h1>}   
                  <Form.Control type="email" name="email" placeholder="Enter Email Address" className={`mt-3 ${error.email ? "border border-danger" : "border border-secondary"}`} onChange={handleChange} required/>
                  {error.email && <h1 className="text-danger mt-2 h6">{error.email}</h1>}  
                  <Form.Control type={ptype} name="password" placeholder="Enter Password" className={`mt-3 ${error.p ? "border border-danger" : "border border-secondary"}`} onChange={handleChange} required/>
                  {error.p && <h1 className="text-danger mt-2 h6">{error.p}</h1>}  
                  <Form.Control type={ptype} name="cp" placeholder="Enter Email Address" className={`mt-3 ${error.cp ? "border border-danger" : "border border-secondary"}`} onChange={handleChange} required/>
                  {error.cp && <h1 className="text-danger mt-2 h6">{error.cp}</h1>}   
                  <div className="form-check col-12 mt-3">
                  <input className="form-check-input border border-secondary" type="checkbox" value="" id="flexCheckDefault" onClick={toggleType}/>
                  <label className="form-check-label ms-1" for="flexCheckDefault">
                       Show Password
                  </label>
              </div>
              <Button type="submit" as={Col} xs={{ span: 4, offset: 4 }} className="mt-5" onClick={() =>AddAdmin()}>Add Admin</Button>
                </>
                }
              </Form>}

            {to && <Model show={toast} onClick={handleClose} type={add} close={handleClose} />}
          </div>
        </div>
      </Offcanvas.Body>
      <ToastContainer position="top-center" />
    </Offcanvas>
  )
}