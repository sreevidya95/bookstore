import { useEffect, useState } from "react";
import { getData } from "./fetch";
import { useParams } from "react-router-dom";
import { isMobile } from "react-device-detect";
export default function BookDetails(){
    const[loading,setloading]=useState(false);
    let {id} = useParams();
    const[book,setBook]= useState({});
    async function getBook(){
        setloading(true);
       
            let b = await getData(`http://localhost:3000/books/${id}`,"get");
            setBook(b);
            setloading(false);
        
    }
    useEffect(()=>{
        setloading(true);
        getBook();
    },[id]);
    return(
       <div className="container">
        {book && loading ?
                <div className="row">
                    <div className="spinner-grow sp col-6 offset-6" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>:
        <div className="row">
            <div className="col-12 col-md-6 col-xl-6 mt-5 book">
                {book.book_image ? <img src={book.book_image} alt="no" width={!isMobile && "500"}/> : <img src="/noimg.webp" alt="no" width={!isMobile && "500"}/>}
            </div>
            <div className="col-12 col-md-6 col-xl-6 mt-5 auth">
            {book.Author && <h6 className="fs-2 text-secondary col-12 arsenal-sc-regular">By {book.Author.name}</h6>}
                <h1 className="display-4 arsenal-sc-regular">{book.title}</h1>
                <div className="col-mt-3 fs-1 col-12 arsenal-sc-regular">${book.price}</div>
                <p className="col-12 fs-6 text-secondary">{book.title} Dive into a captivating narrative where compelling characters navigate a world fraught with 
                    challenges and discoveries. This tale weaves together elements of suspense, adventure, 
                    and poignant reflections, inviting readers on a journey that explores themes of identity,
                     courage, and the intricacies of human relationships. With vivid prose and masterful storytelling, 
                    {book.Author && book.Author.name} crafts a rich tapestry that will leave readers eagerly turning each page, eager to uncover the secrets that lie beneath 
                     the surface</p>
                     {book.Genre && <h6 className="fs-3 text-dark col-12 arsenal-sc-regular">Category: {book.Genre.genre_name}</h6>}
                     <hr/>
                     {book.Author && 
                     <div className="row">
                         <div className="col-3 mt-5 book">
                         {book.Author ? <img src={book.Author.author_image} alt="no" width="100"  height= "100" className="auth_img"/> : 
                         <img src="/noimg.webp" alt="no" width="100" className="auth_img"/>}
                        </div>
                        <div className="col-6 mt-5">
                        {book.Author && <h6 className="fs-2 col-12 arsenal-sc-regular text-dark">{book.Author.name}</h6>}
                        {book.Author && <h6 className="fs-5 text-secondary col-12">{book.Author.biography}</h6>}
                            </div>
                        </div>
                        }
            </div>
        </div>}
       </div>
    );
}