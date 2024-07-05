import { Nav } from "react-bootstrap";
export default function Header(props){
    return(
        <nav className='navbar navbar-expand-lg col-md-12 col-sm-12 bg header'>
                    <button className='navbar-toggler col-2 border border-white bg-white' data-bs-toggle="collapse" data-bs-target="#v-pills-tab">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <Nav.Link href="#" className='navbar-brand col-10 col-md-12 col-xl-12'>
                        <span className='col-4 col-md-4 col-xl-4 ml  fs-4 cur-def'>Welcome Back,  {localStorage.getItem("name")}
                        </span>
                        <input type="text" placeholder="Search here...." className="col-6 col-md-4 col-xl-4 offset-md-2 offset-xl-2 border border-secondary" id="search" onChange={(e)=>props.change("search",e.target.value)}/>
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
    );
}