const config = require('./Config/config')
const app = require('./app')
const port = config.port

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
