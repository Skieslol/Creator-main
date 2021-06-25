const Client = require("./Client")
const Websocket = require('ws');

const wss = new Websocket.Server({ port: 90 });


wss.on("connection", ws => {
    var client = new Client(ws)
    console.log("XMPP Has A New Connection")
    ws.on("close", async(lol) => {

        if (client.sender) {
            clearInterval(client.sender)
        }
        if (xmppClients[client.id]) delete xmppClients[client.id]
        console.log("XMPP Lost Connection")
    })
})

wss.on("error", ws => {})