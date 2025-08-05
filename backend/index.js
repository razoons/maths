const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' })
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server running on port ${port}`))
