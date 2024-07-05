import { Link,useNavigate } from "react-router-dom"
import Nav from 'react-bootstrap/Nav';
import { useState, useReducer, useEffect, useRef } from "react";
import Model from "./modal";
import {getData,delData} from './fetch';
import {isMobile}from 'react-device-detect';
import { Tooltip } from "react-tooltip";
import Header from "./Header";
export default function Books() {
   
    const [toast, setToast] = useState(false);
    const [categories, setCategories] = useState({});
    const [authors, setAuthors] = useState({});
    const [books, setBooks] = useState({});
    const [loading, setloading] = useState(false);
    const [grid, setGrid] = useState(true);
    const [range, setRange] = useState(1);
    const filterData = useRef([]);
    const initialState = {};
    const msg = useRef("");
    const type = useRef("");
    const [id,setId] = useState(0);
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
    const handleOk= async (val)=> {
        if(val==='signout'){
            setToast(false);
            localStorage.removeItem("id");
            localStorage.removeItem("name");
            navigate("/");
        }
        else {
            setloading(true);
            setToast(false);
            console.log(id);
            let msg = await delData(`http://localhost:3000/books/${id}`,"delete");
            if(msg===204){
                alert("Deleted Successfully")
            }
            else{
                alert("something went wrong")
            }
           
        }
        
    }
    async function loadVal() {
        setloading(true);
        LoadBooks()
        const author = await getData("http://localhost:3000/authors/", "get");
        const genere = await getData("http://localhost:3000/generes/", "get");
        setAuthors(author);
        setCategories(genere);
        setloading(false);
    }
    async function LoadBooks() {
        setloading(true);
        const book = await getData("http://localhost:3000/books/", "get");
        setBooks(book);
        setloading(false);
        filterData.current = [];
    }
    const sortBy = async (type, val) => {
        setloading(true);
        let book = [];
        if (type === "genre") {
            filterData.current.push(categories[val - 1].genre_name)
            books.forEach(e => {
                if (e.GenreGenreId === val) {
                    book.push(e);
                }
            });
        }
        else if (type === "author") {
            filterData.current.push(authors[val - 1].name)
            books.forEach(e => {
                if (e.AuthorAuthorId === val) {
                    book.push(e);
                }
            });
        }
        else if (type === "filter") {
            filterData.current.push(`price:${val}`)
            books.forEach(e => {
                if (e.price <= val) {
                    book.push(e);
                }
            });
        }
        else if (type === 'search') {
            if (val === '') {
                LoadBooks();
            }
            else {
                books.forEach(e => {
                    if (e.title.toLowerCase().includes(val) || e.Author.name.toLowerCase().includes(val) || e.Genre.genre_name.toLowerCase().includes(val)) {
                        book.push(e);
                    }
                });
            }

        }
        else {
            books.forEach(e => {
                console.log(typeof new Date(e.publication_date))
            });
        }
        setBooks(book);
        setloading(false);
    }
    function showToast(val,id,title){
          setToast(true);
          if(val==='delete'){
            msg.current=`Are You sure you want to delete "${title}"`;
            type.current="delete";
            setId(id);
          }
         
        else{
            msg.current="Are you sure you want to signout";
            type.current="signout"
        }
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <Header onClick={() => showToast("signout",0,null)} change={sortBy} />
            </div>
            {loading ?
                <div className="row">
                    <div class="spinner-grow sp col-6 offset-6" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                :
                <div className="row">
                    <div className={`nav flex-column nav-pills ${isMobile ? 'collapse col-12' : 'col-3 '}`} id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <Nav.Link className="nav-link mt-5 btn col-12" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home"
                            role="tab" aria-controls="v-pills-home" aria-selected="true"><span className="btn btn-color text-white col-8 mb-5" onClick={LoadBooks}>ADD New Book</span>
                        </Nav.Link>
                        <hr />
                        <Nav.Link className="nav-link btn mt-5" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home"
                            role="tab" aria-controls="v-pills-home" aria-selected="true"><span className="h4 text-black col-8">FilterBy Categories</span>
                            {(state.hide && state.type === "Categories") ? <i className="fa fa-minus col-1 text-dark" aria-hidden="true" onClick={() => dispatch({ type: "Categories", hide: false })}></i>
                                : <i className="fa fa-plus col-1 text-dark" aria-hidden="true"
                                    onClick={() => dispatch({ type: "Categories", hide: true })}></i>}
                            {(state.hide && state.type === "Categories") && <ul className="col-12">
                                {categories.map(e =>
                                    <>
                                        <li key={e.genre_id} value={e.genre_id} onClick={() => sortBy("genre", e.genre_id)} className="fs-5">{e.genre_name}</li>
                                    </>
                                )}
                            </ul>}
                        </Nav.Link>
                        <hr />
                        <Nav.Link className="nav-link btn col-12 mt-5" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile"
                            role="tab" aria-controls="v-pills-profile" aria-selected="false"><span className="h4 text-black col-10">FilterBy Author</span>
                            {(state.hide && state.type === "Authors") ? <i className="fa fa-minus col-1 text-dark" aria-hidden="true" onClick={() => dispatch({ type: "Authors", hide: false })}></i>
                                : <i className="fa fa-plus col-1 text-dark" aria-hidden="true"
                                    onClick={() => dispatch({ type: "Authors", hide: true })}></i>}
                            {(state.hide && state.type === "Authors") && <ul className="col-12">
                                {authors.map(e =>
                                    <>
                                        <li key={e.author_id} value={e.author_id} onClick={() => sortBy("author", e.author_id)} className="fs-5">{e.name}</li>
                                    </>
                                )}
                            </ul>}
                        </Nav.Link>
                        <hr />
                        <Nav.Link className="nav-link btn col-12 mt-5" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages"
                            role="tab" aria-controls="v-pills-messages" aria-selected="false"><span className="h5 text-black">FilterBy Price</span>
                            <input type="range" className="col-8 mt-2 ms-2 text-dark" min="1" max="500" onChange={(event) => setRange(event.target.value)} step="1" />
                            <span className="col-1 text-dark ms-1">{range}</span>
                            <input type="button" className="btn btn-color col-8 mt-2 ms-2 text-white" onClick={() => sortBy("filter", range)} value="Filter" />
                        </Nav.Link>
                        <hr/>
                        <Nav.Link className="nav-link btn col-12 mt-5" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages"
                            role="tab" aria-controls="v-pills-messages" aria-selected="false"><span className="h5 text-black">SortBy Publication Date</span>
                              <ul className="col-12 mt-3">
                                <li className="fs-5 text-center">Sort By older</li>
                                <li className="fs-5 text-center">Sort By New</li>
                              </ul>
                        </Nav.Link>
                        <hr />
                    </div>
                    <div className="col-12 mol-md-9 col-xl-9 mt-5">
                        <span className="fs-3 col-9">showing All {books.length} books</span>
                        {!isMobile && <span className="col-2 col">
                            <i class="fa fa-th col-6 text-center btn fs-3" aria-hidden="true" onClick={() => setGrid(true)}></i>
                            <i class="fa fa-list col-6 text-center btn fs-3" onClick={() => setGrid(false)}></i>
                            <Tooltip anchorSelect=".fa-th" place="bottom" className="fs-6"> click for Grid View</Tooltip>
                            <Tooltip anchorSelect=".fa-list" place="bottom" className="fs-6"> click for List View</Tooltip>
                        </span>}
                        {filterData.current.length > 0 && <div className="col-12">
                            <span className="col-4">Books Filter For :{filterData.current.map(e => e).join(",")}</span>
                            <Link to="#" className="btn text-primary text-decoration-underline col-6" onClick={LoadBooks}>Clear Filter</Link>
                        </div>}
                        <div className="row mt-5">
                            {books.length > 0 ? books.map(e =>
                                <div className={`card col-12  ms-1 border-0 rounded-0 ${grid ? "col-md-3 col-xl-3 ms-5 mt-3" : "col-md-12 col-xl-12 mt-5 card-height"}`} key={e.book_id}>
                                    {e.book_image ? <img src={e.book_image} alt="no" height="300" className={`col-md-12 col-xl-12 ${!grid && "w-25"}`} />
                                        : <img src="/noimg.webp" alt="no" height="300" className={`col-md-12 col-xl-12 ${!grid && "w-25"}`} />}
                                    <div className={`card-body col-xl-12 col-md-12 mb-5 ${grid ? "border" : "car_body"}`}>
                                        <Link  to={`/book/${e.book_id}`}><h5 className="card-title col-12 link text-center">{e.title}</h5></Link>
                                        {/* <p class="card-text"> Author:{e.author.name}</p> */}
                                        <p className="card-text col-12 text-center"> Author:{e.Author.name}</p>
                                        <p className="card-text col-12 text-center"> Price:{e.price}</p>
                                        <p className="card-text col-12 text-center"> Genere:{e.Genre.genre_name}</p>
                                        <i class="fa fa-edit col-6 fs-5  text-center link text-secondary"></i>
                                        <i class="fa fa-trash col-6 fs-5 text-center link text-secondary" onClick={()=>showToast("delete",e.book_id,e.title)}></i>
                                        <Tooltip anchorSelect=".fa-edit" place="top">Edit Book</Tooltip>
                                        <Tooltip anchorSelect=".fa-trash" place="top">Delete Book</Tooltip>
                                    </div>
                                </div>
                            ) :
                                <span className="h2 mt-5">sorry No books to display</span>
                            }
                        </div>
                    </div>
                    {toast && <Model show={toast} msg={msg.current} onClick={handleClose} type="ok" value={()=>handleOk(type.current)} />}
                </div>
            }
        </div>
    )
}