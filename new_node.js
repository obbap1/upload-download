const http= require('http');
const port=3000;
const server = http.createServer((request,response) => {
    if(request.url === '/upload'){
        console.log('the server is with you');
        response.end('thank you');
    }
})
server.listen(port,function(){
    console.log('i am listening!!!!');
});