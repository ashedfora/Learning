const express = require('express')
const app = express()
const port = 3000

app.get('/info', (req, res) => {
  res.send(typeof req.params.id);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})