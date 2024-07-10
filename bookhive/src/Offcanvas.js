import { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { getData } from "./fetch";
import Model from "./modal";
import { Link } from "react-router-dom";
export default function Offcanva(props){
    const[authors,setAuthors] = useState();
    const[generes,setGenere] = useState();
    const[loading,setloading]=useState(false);
    const[toast,setToast]=useState(false);
    const[add,setAdd]=useState("");
    useEffect(()=>{
           LoadData();
    },[]);
    function handleClose(){
        setToast(false);
        LoadData();
    }
    async function LoadData(){
        setloading(true);
        const author = await getData("http://localhost:3000/authors/", "get");
        const genere = await getData("http://localhost:3000/generes/", "get");
        setGenere(genere);
        setAuthors(author);
        setloading(false);
    }
   const[type,setType] = useState("text");
   async function AddBook(id){
    console.log(id)
   }
  return(
    <Offcanvas show={props.show} placement="end">
         <Offcanvas.Header>
            <Offcanvas.Title>
               <h3 className="h3">{props.id ? "Edit Book" : "Add Book" }</h3>
            </Offcanvas.Title>
         <span className="btn-close" style={{ float: "right !important" }} onClick={props.onClick}></span>
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
               <Form>
                 <Form.Control name="title" placeholder="Enter Book Name" className="mt-2"/>
                 <Form.Control name="price" type="number" placeholder="Enter Price of book" className="mt-3"/>
                 <Form.Control name="publication_date" type={type} placeholder="Enter Publication Date" 
                 onFocus={()=>setType("date")} className="mt-3"/>
                 <Form.Control type="file" accept="image/*" name="book_image" placeholder="Select Image" className="mt-3"/>
                 <Form.Select name="AuthorAuthorId" className="mt-3">
                    <option>Select Author</option>
                    {authors && authors.map(e=>
                        <option value={e.author_id} key={e.author_id}>{e.name}</option>
                    )}
                 </Form.Select>
                 <p className="mt-3">Couldn't find the Author You Want ? <Link to="#" type="btn" 
                 onClick={()=>{setToast(true);setAdd("addAuthor")}}> Click Here</Link></p>
                 <Form.Select name="AuthorAuthorId" className="mt-3">
                    <option>Select Genere</option>
                    {generes && generes.map(e=>
                        <option value={e.genre_id} key={e.genre_id}>{e.genre_name}</option>
                    )}
                 </Form.Select>
                 <p className="mt-3">Couldn't find the Genere You Want ? <Link to="#" type="btn" 
                 onClick={()=>{setToast(true);setAdd("genere")}}> Click Here</Link></p>
                 <Button type="submit" as={Col} xs={{ span: 4, offset: 4 }} className="mt-5" onClick={()=>AddBook(props.id)}>{props.id ? "Edit Book" : "Add Book"}</Button>
               </Form>}
               {toast && <Model show={toast} onClick={handleClose} type={add}  close={handleClose}/>}
            </div>
          </div>
        </Offcanvas.Body>
    </Offcanvas>
  )
}