const http= require ("http");
const url=require("url");

const server=http.createServer((req,res)=>{
    //res.writeHead(200,{"content-Type": "text/html"});
    //console.log(req)
    //res.end("server is running")

    const parsedUrl=url.parse(req.url,true);
    console.log(parsedUrl)
    const name=parsedUrl.query.name
    

    switch(req.url){
        case "/":
            res.end("welcome to home page")
            break;
        case "/about-us":
            res.end("welcome to about-us ")
    default:
        res.writeHead(404,{"content-type":"text/html"})
        res.end("page not found")

    }
})

server.listen(8000,()=>{
    console.log("server is running on port 8000")
})