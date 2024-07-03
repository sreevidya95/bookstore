import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { useParams } from "react-router-dom";
import { postData } from "./fetch";
import Model from "./modal";
export default function AdminLogin(){
    const[passwordType,setPasswordType]=useState(true);
    const[toast,setToast]= useState(false);
    const[modal,setModal] = useState(false);
    const[fp,setfp]=useState(false);
    const[loading,setLoading] = useState(false);
    const cp = useParams();
    let val = useRef();
    useEffect(()=>{
        if(cp.hasOwnProperty('cp') && cp.cp==='true'){
            setToast(true)
            setfp(true);
        }
    },[])
    const [forgotEmail,setForgotEmail]=useState();
     function forgotPassword(){
       setToast(true);
       setfp(false);
    }
    function Login(){
        console.log("login")
    }
    async function sendMail(){
        setLoading(true);
      const message = await  postData("http://localhost:3000/login/fp","Post",{email:forgotEmail,url:window.location.href});
       if(message.hasOwnProperty('msg')){
        setLoading(false);
        val.current = message.msg;
        setToast(false);
        setModal(true)
          
       }
    }
    function updatePassword(){
        console.log("login")
    }
    function handleClose(){
        setModal(false);
       }  
    return(
       <div className="container">
        {loading ? 
          <div className="row">
            <div class="spinner-grow sp col-6 offset-6" role="status">
                <span class="sr-only">Loading...</span>
                </div>
            </div>
       :
       <>
        <div className="row mt-5">
                <img className="col-md-4 col-xl-4 col-12 img" src="./logo.png" alt="no" height="600"/>
            <div className="col-md-5 col-xl-5 col-12 border border-secondary mt">
                <h3 className="h1 text-center col-12 margin arsenal-sc-regular">Admin Login</h3>
                <form className="col-12" onSubmit={Login}>
                    <input type="email" className="col-5 offset-3 form-control-sm mt-5" placeholder="Enter  Email Id " id="email" required/>
                    <div className="input-group  mt-4">
                    <input type={passwordType ? "password" : "text"} className="form-control-sm col-5 offset-3" placeholder="Enter Password" id="password"/>
                    {passwordType ? <span><i class="fa fa-eye-slash col-1" aria-hidden="true" onClick={()=>setPasswordType(false)}></i></span> :<span><i class="fa fa-eye col-1" aria-hidden="true"  onClick={()=>setPasswordType(true)}></i></span> }
                    </div>
                   <Link className="btn col-6 offset-4 mt-3 text-primary text-decoration-underline" onClick={forgotPassword}>Forgot password?</Link>
                   <input type="submit" className="btn btn-color col-3 offset-4 mt-5 text-white" value="Login"/>
                </form>
            </div>
        </div>
        {modal && <Model show={modal} msg={val.current} onClick={handleClose}/>}
        <Modal show={toast}>
        <Modal.Header>
        <Modal.Title>
            <h5>{fp ? "Update Password" : "Forgot Password"}</h5>
         </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {fp ? (
             <>
            <input type="password" placeholder="New Password" className="col-8"/><br/>
            <input type="password" placeholder="Confirm New Password" className="col-8 form-control-sm  mt-2"/>
            </>
        ):
          
               <input type="email" placeholder="Enter your Email" className="col-8" name="forgot_email" onChange={(e)=>setForgotEmail(e.target.value)} required/>
        }
        </Modal.Body>
        <Modal.Footer>
        {fp ?(
          <Button variant="primary" onClick={updatePassword}>
          Submit
        </Button>
        ):
        <Button variant="primary" onClick={sendMail}>
              Send Email
          </Button>
        }
          <Button variant="secondary" onClick={()=>setToast(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </>}
       </div>
    )
}