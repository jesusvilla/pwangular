var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('./webpack.prod.conf')
var app           = express()
var DIST_DIR = path.join(__dirname, "dist")
var HTML_FILE     = path.join(DIST_DIR, "index.html")
var DEFAULT_PORT  = 4445
var compiler = webpack(config)

app.set("port", process.env.PORT || DEFAULT_PORT)
app.use(express.static(DIST_DIR))
app.get("*", (req, res) => res.sendFile(HTML_FILE))
app.listen(app.get("port"))