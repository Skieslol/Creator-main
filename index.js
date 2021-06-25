const express = require('express')
const app = express()
const fs = require('fs')
const Port = process.env.PORT || 9080
const http = require('http')
const server = http.createServer(app)
const mongoose = require('mongoose')
const User = require(`${__dirname}/files/models/User`)

const path = require('path')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const prompt = require('prompt')
const { Console } = require('console')
global.exchangeCodes = {}
global.clientTokens = []
global.accessTokens = []
global.xmppClients = {}
global.parties = []
global.invites = []
global.pings = []
global.SERVER = server
global.Server_User = null
global.Server_version = fs.readFileSync(`${__dirname}/files/server_version/server.txt`).toString()

app.use(require('body-parser').json())
app.use(require('body-parser').urlencoded({ extended: true }))
app.use(require("./services/index"))

mongoose.connect("mongodb://localhost:27017", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true }, async e => {
    if (e) throw e
    console.log('Connected To MongoDB')
})
require("./services/party/index")
require("./services/xmpp/index")
server.listen(Port, () => {
    console.log(`Servers Online (Version: ${Server_version}, Port: ${Port})`)
})