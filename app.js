const express = require('express')
const socket = require('socket.io')
const http = require('http')
const fs = require('fs')
const app = express()
const server = http.createServer(app)
const io = socket(server)

app.use('/css', express.static('./static/css'))
app.use('/js', express.static('./static/js'))
app.get('/', function(request, response){
    fs.readFile('./static/index.html', function(err, data){
        if(err){
            response.send('에러')
        } else {
            response.writeHead(200, {'Content-Type':'text/html'})
            response.write(data)
            response.end()
        }
    })
})

app.get('/', function(request, response){
    console.log('유저가 / 으로 접속하셨습니다!')
    response.send('Hello, Express Server ! ! !')
})

io.sockets.on('connection', function(socket){
    console.log('유저 접속 됨')

    socket.on('send', function(data){
        console.log('전달된 메시지:', data.msg)
    })
    socket.on('disconnect', function(){
        console.log('접속 종료')
    })
})

server.listen(8080, function(){
    console.log('서버 실행 중 . . . . .')
})

io.sockets.on('connection', function(socket){
    socket.on('newUser', function(name){
        console.log(name + ' 님이 접속했음.')
    socket.name = name
    io.sockets.emit('update',{type:'connect', name: 'SERVER', message: name + '님이 접속했음.'})
    })
    socket.on('message',function(data){
        data.name= socket.name
        console.log(data)
        socket.broadcast.emit('update', data);
    })

socket.on('disconnect', function(){
    console.log(socket.name + '님이 나갔음;;.')
    socket.broadcast.emit('update', {tpye: 'disconnect', name:'SERVER', message: socket.name+'님이 나갔음;;.'});
    })
})


const Web3 = require('web3')
const rpcURL = 'https://ropsten.infura.io/v3/f2d6082eec7d47fd9843b71b0651e47d' // Your RCkP URL goes here
const web3 = new Web3(rpcURL)
const address = '0x40eFF4380216d40F1D8B69415f91Fc86Bad98582' // Your account address goes here
web3.eth.getBalance(address, (err, wei) => { 
    balance = web3.utils.fromWei(wei, 'ether')
    console.log("balance : " , balance) })