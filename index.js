const express = require('express')
const WebSocket = require('ws')
const app = express()

app.use(express.json())

app.post('/api/image', function (req, res) {
  const body = req.body
  const ws = new WebSocket("wss://google-sdxl.hf.space/queue/join?__theme=light")
  ws.on("open", function () {
      ws.send(JSON.stringify({"fn_index":3,"session_hash":"ykecz8am1l"}))
      ws.send(JSON.stringify({"data":[body.prompt,"",7.5,body.style],"event_data":null,"fn_index":3,"session_hash":"ykecz8am1l"}))
  })
  ws.on("message", function (data) {
      ws_res = JSON.parse(data)
      if (ws_res.msg == "process_completed") {
        res.json({
          "data": ws_res.output.data[0][1]
        })
         
      }
  })
})

app.listen(3000, function() {
  console.log('Server has started!')
})