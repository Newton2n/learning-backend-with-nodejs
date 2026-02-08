const http = require("http")


const server = http.createServer((req,res)=>{
    console.log(req.url,req.headers)
    console.log("Method",req.method)
})
const PORT =3002
server.listen(PORT,()=>{
    console.log(PORT)
})