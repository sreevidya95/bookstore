import { useEffect, useRef, useState } from "react";
import { Nav } from "react-bootstrap";
import { Link, NavLink, useParams } from "react-router-dom";
import { getData, delData } from "./fetch";
import { Tooltip } from "react-tooltip";
import Model from "./modal";
import Offcanva from "./Offcanvas";
export default function Header(props) {
    const [messages, setMessages] = useState([]);
    const [loading, setloading] = useState(false);
    const [to, setToast] = useState(false);
    const [alert, setAlert] = useState(false);
    const[genere,setGenere]=useState();
    const[offcanvas,setOffcanvas]=useState(false);
    const { id } = useParams();
    let msg = useRef('');
    useEffect(() => {
        getMessage();
    },[]);
    async function getMessage() {
        setloading(true);
        let message = await getData("http://localhost:3000/enquiry/", "get");
        let generes = await getData("http://localhost:3000/generes/", "get");
        setMessages(message);
        setGenere(generes)
        setloading(false);
    }
    async function editMessage(method, id) {
        setloading(true);
        if (method === 'put') {
            let m = await getData(`http://localhost:3000/enquiry/${id}`, method);
            if (m.isRead === true) {
                msg.current = "Updated Successfully";
            }
            else {
                msg.current = "something went wrong";
            }
            setToast(true);
            setloading(false);
        }
        else {
            let m = await delData(`http://localhost:3000/enquiry/${id}`, method);
            if (m === 204) {
                msg.current = "Deleted Succsessfully";
            }
            else {
                msg.current = "Something went wrong";
            }
            setToast(true);
        }
    }
    function handleClose() {
        setToast(false);
        setAlert(false);
        setOffcanvas(false)
        getMessage();
    }
    return (
        <>
            <nav className='navbar navbar-expand-lg col-md-12 col-sm-12 bg header'>
                {window.location.pathname !== '/authors' && <button className='navbar-toggler col-2 border border-white bg-white' data-bs-toggle="collapse" data-bs-target="#v-pills-tab">
                    <span className="navbar-toggler-icon"></span>
                </button>}
                <Nav.Link href="#" className='navbar-brand col-10 col-md-12 col-xl-12'>
                    <span className='col-4  ml  fs-4 cur-def'>
                        <img className="me-2" src="/logo.png" alt="no" height="50" />
                        Welcome Back,  {localStorage.getItem("name")}
                    </span>
                    {typeof id === 'undefined' && <input type="text" placeholder="Search here....🔍" className="col-6 col-md-4 col-xl-4 offset-md-1 offset-xl-1 border border-secondary" id="search" onChange={(e) => props.change("search", e.target.value)} />}
                    <div className="dropdown dropstart fst-italic col-2 btn-color rounded-5 ms-5 col-md-2 col-xl-2 offset-md-1 offset-xl-1 settings text-center">
                        <button className="btn dropdown-toggle rounded-5 text-white" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            <span>{localStorage.getItem("name").charAt(0)}</span>
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li className="dropdown-item btn" onClick={props.onClick}>Signout</li>
                        </ul>
                    </div>
                </Nav.Link>
            </nav>
            <nav className='row background mt-3'>
                <NavLink to="/books" className={`col-6 col-md-2 offset-md-1 text-center arsenal-sc-regular fs-3 text-decoration-none link mb-2 ${window.location.pathname === '/books' ? 'linkactive' : 'text-dark'}`}>Books</NavLink>
                <NavLink to="/authors" className={`col-6 col-md-2 arsenal-sc-regular fs-3 text-decoration-none text-center link mb-2 ${window.location.pathname === '/authors' ? 'linkactive' : "text-dark"}`}>authors</NavLink>
                <NavLink className="nav-link dropdown-toggle col-6 col-md-2 text-dark arsenal-sc-regular fs-3 text-decoration-none text-center mb-2" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fa-regular fa-message"></i>
                    <Tooltip anchorSelect=".fa-message" place="bottom" className="fs-6">Messages From Users</Tooltip>
                </NavLink>
                <NavLink className="nav-link col-6 col-md-2 text-white fs-3 text-decoration-none text-center mb-2"
                    href="#">
                    <div className="dropdown">
                        <button className="dropdown-toggle text-dark border border-white bg-white arsenal-sc-regular fs-3" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Genere
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <Link className="dropdown-item btn col-12" href="#" onClick={() => setAlert(true)}>Add Genere</Link>
                            <Link className="dropdown-item btn col-12" href="#" id="view">View Generes
                            </Link>
                            <span className="g">{genere && genere.map(e=>
                                   <>
                                    <span className="h6 col-12 ms-5" key={e.genre_id}>{e.genre_name}</span><br/></>
                                )}</span>
                        </div>
                    </div>
                </NavLink>
                <span className="nav-link col-6 col-md-2 fs-3 text-center mb-2 btn"><i class="fa-solid fa-user-plus link" onClick={()=>setOffcanvas(true)}></i></span>
                <Tooltip anchorSelect=".fa-user-plus" place="bottom" className="fs-6"> Add New Admin</Tooltip>
                <div className="dropdown-menu col-12 col-md-6 col-xl-6 drop" aria-labelledby="navbarDropdown">
                    {loading ?
                        <div className="row">
                            <div className="spinner-grow sp col-6 offset-6" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                        :
                        <>
                            <NavLink className="dropdown-item fs-3 text-decoration-none text-center bg-white text-dark" href="#">Messages</NavLink>
                            <div className="dropdown-divider"></div>
                            <NavLink className="dropdown-item text-dark bg-light text-center" href="#">
                                {messages && messages.map(e =>
                                    <div className="row" key={e.enq_id}>
                                        <span className="col-12 fs-6 text-dark bg-light mt-2">From: {e.user_email}</span>
                                        <span className={`col-12 fs-6 bg-light mt-2 ${e.isRead ? "text-success" : "text-dark"}`}>Message:{e.message}</span>
                                        <span className="col-1 text-dark bg-light fs-6 text-center offset-5 mt-2"><i className="fa fa-reply btn link" onClick={() => window.location = `mailto:${e.user_email}`} aria-hidden="true"></i></span>
                                        <span className="col-1 text-dark bg-light fs-6 text-center mt-2 mb-2"><i className="fa fa-trash btn link" aria-hidden="true" onClick={() => editMessage("delete", e.enq_id)}></i></span>
                                        {!e.isRead && <span className="col-1 text-dark bg-light fs-6 text-center mt-2 mb-2"><i className="fa fa-check btn link" aria-hidden="true" onClick={() => editMessage("put", e.enq_id)}></i></span>}
                                        <hr />
                                    </div>
                                )}
                                <Tooltip anchorSelect=".fa-check" place="bottom" className="fs-6"> Mark as Read</Tooltip>
                                <Tooltip anchorSelect=".fa-trash" place="bottom" className="fs-6">Delete Message</Tooltip>
                                <Tooltip anchorSelect=".fa-reply" place="bottom" className="fs-6">Reply</Tooltip>
                            </NavLink>
                        </>}
                </div>
            </nav>
            {to && <Model show={to} msg={msg.current} onClick={handleClose}/>}
            {alert && <Model show={alert} onClick={handleClose} type="genere" close={handleClose} />}
            {offcanvas && <Offcanva show={offcanvas} onClick={handleClose}/>}
        </>
    );
}