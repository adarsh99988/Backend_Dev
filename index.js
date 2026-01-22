const http=require("http")

const server= http.createServer((req, res)=>{
    res,writeHead(200,{"content-Type":"application/json"}) 
    res.end("reponse is closed")
    

})
server.listen(3000, ()=>{
    console.log("server is running on 3000")
})
