import { useEffect, useRef, useState } from "react";
import Header from "./Header"
import { getData } from "./fetch";
import { Link,useNavigate } from "react-router-dom";
import Model from "./modal";
import { delData } from "./fetch";
import { Tooltip } from "react-tooltip";
import Footer from "./Footer";
import { isMobile } from 'react-device-detect';
import { ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Authors() {
    const [loading, setloading] = useState(false);
    const [to, setToast] = useState(false);
    const [alert, setAlert] = useState(false);
    const [authors, setAuthors] = useState([]);
    let msg = useRef("");
    let id = useRef(0);
    let type = useRef("");
    const naviage = useNavigate();
    function showToast(val, identity, title) {
        setToast(true);
        if (val === 'delete') {
            msg.current = `Are You sure you want to delete "${title}"`;
            type.current = "delete";
            id.current = identity;
        }

        else {
            msg.current = "Are you sure you want to signout";
            type.current = "signout"
        }
    }
    const sortBy = async (type, val) => {
        setloading(true);
        let author = [];
        if (val === '') {
            loadAuthor()
        }
        else {
            authors.forEach(e => {
                if (e.name.toLowerCase().includes(val)) {
                    author.push(e);
                }
            });
        }
        setAuthors(author);
        setloading(false);
    }
    useEffect(() => {
        loadAuthor();
    }, []);
    async function editAuthor(method, id) {
        setloading(true);
        setToast(false);
        if (method === 'delete') {
            let m = await delData(`http://localhost:3000/authors/${id}`, method);
            if (m === 204) {
               toast.success("Deleted Successfully");
            }
            else {
                toast.error("something went wrong");
                
            }
            setloading(false);
        }
        else{
            localStorage.removeItem("id");
            localStorage.removeItem("name");
            naviage("/")
            
        }
    }
    function handleClose() {
        setToast(false);
        setAlert(false);
    }
    async function loadAuthor() {
        setloading(true)
        let author = await getData("http://localhost:3000/authors/", "get");
        setAuthors(author);
        setloading(false);
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <Header onClick={() => showToast("signout", 0, null)} change={sortBy} />
            </div>
            {loading ?
                <div className="row mt-5">
                    <div className="spinner-grow sp col-6 offset-6" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
                : <div className="row mt-5 ms-5 cur">
                    <span className={`col-1 text-right fs-1 bg text-secondary rounded-5  ${isMobile ? 'offset-10' : 'offset-11'}`}>
                        <i className="fa fa-plus link" onClick={()=>setAlert(true)}></i>
                    </span>
                    <Tooltip anchorSelect=".fa-plus" place="top">Add New Author</Tooltip>
                    {(authors.length > 0) ?
                        authors.map((e) =>
                            <div className="card col-12 col-md-3 col-xl-3 author mt-5 border border-white rounded-5" key={e.author_id}>
                                {e.author_image ? <img src={e.author_image} alt="no" className="card-img" height="500" width="300" />
                                    : <img src="/user.jpg" alt='no' className="card-img" height="500" width='300' />}
                                <div className="card-body card-img-overlay text-white  text-center">
                                    <div className="op rounded-5 cur">
                                        <span className="col-1 text-dark"> <i className="fa fa-edit fs-5  text-center link mt-5" onClick={() => console.log("update")}></i></span>
                                        <span className="col-1 offset-1 text-dark"> <i className="fa fa-trash fs-5 text-center link mt-5 mb-5"
                                            onClick={() => showToast("delete", e.author_id, e.name)}></i></span>
                                        <div className="row">
                                            <Link to={`/author/${e.author_id}`} className="card-title h1 mt-5 text-dark">
                                                {e.name}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                        : <div className="row mt-5">
                            <span className="fs-1 text-center">No Authors found to display</span>
                        </div>
                    }
                     <Tooltip anchorSelect=".fa-edit" place="top">Edit Author</Tooltip>
                     <Tooltip anchorSelect=".fa-trash" place="top">Delete Author</Tooltip>
                     {to && <Model show={to} msg={msg.current} onClick={handleClose} type="ok" value={() => editAuthor(type.current, id.current)} />}
                     {alert && <Model show={alert} type="addAuthor" close={handleClose} />}
                     <ToastContainer position="top-center"/>
                </div>
            }
            <footer className='mt-5'>
                <Footer></Footer>
            </footer>
        </div>
    )
}