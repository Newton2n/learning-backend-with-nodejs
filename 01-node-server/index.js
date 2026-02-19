const http = require("http");

const server =http.createServer((req,res)=>{
 console.log(req)
 process.exit() // stop server
})
const PORT =3001;

server.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`)
})