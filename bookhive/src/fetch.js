
export async function postData(url,method,data){
     return await fetch(url,{
        method:method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body:JSON.stringify(data)
     }).then(
       res=>{return res.json()})
     .catch(err=>{
        console.log("something went wrong",err);
     });
}