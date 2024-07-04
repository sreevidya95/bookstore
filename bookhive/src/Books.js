import { Link, NavLink, useNavigate } from "react-router-dom"
import Nav from 'react-bootstrap/Nav';
import { useState, useReducer, useEffect } from "react";
import Model from "./modal";
import { postData, getData } from './fetch'
export default function Books() {
    const [toast, setToast] = useState(false);
    const [categories, setCategories] = useState({});
    const [authors, setAuthors] = useState({});
    const [books, setBooks] = useState({});
    const [loading, setloading] = useState(false);
    const [range,setRange]=useState(1);
    const initialState = {};
    useEffect(() => {
        loadVal();
    }, [])
    function reducer(state, action) {
        switch (action.type) {
            case "All": {
                return {
                    ...state,
                    type: "All",
                }
            }
            case "Categories": {
                return {
                    ...state,
                    type: action.type,
                    hide: action.hide
                }
            }

            case "Authors":
                return {
                    ...state,
                    type: action.type,
                    hide: action.hide

                }
            default:
                return state;
        }
    };
    const [state, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();
    function handleClose() {
        setToast(false);
    }
    function handleOk() {
        setToast(false);
        localStorage.removeItem("id");
        localStorage.removeItem("name");
        navigate("/");
    }
    async function loadVal() {
        setloading(true);
        const books = await getData("http://localhost:3000/books/", "get")
        const author = await getData("http://localhost:3000/authors/", "get");
        const genere = await getData("http://localhost:3000/generes/", "get");
        setBooks(books);
        setAuthors(author);
        setCategories(genere);
        setloading(false)
    }
    async function sortBy(val) {
        console.log(val)
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <nav className='navbar navbar-expand-lg col-md-12 col-sm-12 bg'>
                    <button className='navbar-toggler col-2 border border-white bg-white' data-bs-toggle="collapse" data-bs-target="#navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <Nav.Link href="#" className='navbar-brand col-10 col-md-12 col-xl-12'>
                        <span className='col-4 col-md-4 col-xl-4 ml text-white'>Welcome Back,  {localStorage.getItem("name")}
                        </span>
                        <input type="text" placeholder="Search here...." className="col-6 col-md-4 col-xl-4 offset-md-2 offset-xl-2 rounded-3" id="search" />
                        <div className="dropdown dropstart fst-italic col-2 btn-color rounded-5 ms-5 col-md-2 col-xl-2 offset-md-1 offset-xl-1 settings text-center">
                            <button className="btn dropdown-toggle rounded-5 text-white" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className=''>{localStorage.getItem("name").charAt(0)}</span>
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><Link className="dropdown-item btn" to="#" onClick={() => setToast(true)}>Signout</Link></li>
                            </ul>
                        </div>
                    </Nav.Link>
                </nav>
            </div>
            <div className="row">
                <div className="nav flex-column nav-pills col-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <Nav.Link className="nav-link mt-5 btn col-12" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home"
                        role="tab" aria-controls="v-pills-home" aria-selected="true"><span className="h5 text-black col-8 mb-5">All <hr/></span>
                        </Nav.Link>
                    <Nav.Link className="nav-link btn" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home"
                        role="tab" aria-controls="v-pills-home" aria-selected="true"><span className="h5 text-black col-8">FilterBy Categories</span>
                        {(state.hide && state.type === "Categories") ? <i className="fa fa-minus col-1 text-dark" aria-hidden="true" onClick={() => dispatch({ type: "Categories", hide: false })}></i>
                            : <i className="fa fa-plus col-1 text-dark" aria-hidden="true"
                                onClick={() => dispatch({ type: "Categories", hide: true })}></i>}
                        {(state.hide && state.type === "Categories") && <ul className="col-12">
                            {categories.map(e =>
                                <>
                                    <li value={e.genre_id} onClick={() => sortBy(e.genre_id)}>{e.genre_name}</li>
                                </>
                            )}
                        </ul>}
                        <hr />
                    </Nav.Link>
                    <Nav.Link className="nav-link btn col-12" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile"
                        role="tab" aria-controls="v-pills-profile" aria-selected="false"><span className="h5 text-black col-10">FilterBy Author</span>
                        {(state.hide && state.type === "Authors") ? <i className="fa fa-minus col-1 text-dark" aria-hidden="true" onClick={() => dispatch({ type: "Authors", hide: false })}></i>
                            : <i className="fa fa-plus col-1 text-dark" aria-hidden="true"
                                onClick={() => dispatch({ type: "Authors", hide: true })}></i>}
                        {(state.hide && state.type === "Authors") && <ul className="col-12">
                            {authors.map(e =>
                                <>
                                    <li value={e.author_id} onClick={() => sortBy(e.author_id)}>{e.name}</li>
                                </>
                            )}
                        </ul>}
                        <hr />
                    </Nav.Link>
                    <Nav.Link className="nav-link btn col-12" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages"
                        role="tab" aria-controls="v-pills-messages" aria-selected="false"><span className="h5 text-black">FilterBy Price</span>
                        <input type="range" className="col-8 mt-2 ms-2 text-dark" min="1" max="1000" onChange={(event)=>setRange(event.target.value)} step="1"/>
                         <span className="col-1 text-dark ms-1">{range}</span>
                        <button className="btn btn-color col-8 mt-2 ms-2 text-white">Filter</button>
                        <hr />
                    </Nav.Link>
                    <Nav.Link className="nav-link btn col-12" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings"
                        role="tab" aria-controls="v-pills-settings" aria-selected="false"><span className="h5 text-black">FilterBy Publication Date</span></Nav.Link>
                        <ul className="col-12">
                            <li className="col-12 text-center h6 btn">Sort By Older</li>
                            <li className="col-12 text-center h6 btn">Sort By Newer</li>
                        </ul>
                </div>
                <div className="col-9 mt-5">
                   <span className="fs-5 col-7">showing All {books.length} books</span>
                    <span className="col-2">
                    <i className="fa-thin fa-grid-5"></i>
                    </span>
                </div>
            </div>
            {toast && <Model show={toast} msg="Are you sure you want to signout?" onClick={handleClose} type="ok" value={handleOk} />}
        </div>
    )
}