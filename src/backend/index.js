const express = require('express')
const userRouter = require('./routes/user.routes')
const roleRouter = require('./routes/role.routes')

const PORT = process.env.PORT || 8081

const app = express()

app.use(express.json())
app.use('/api', userRouter)
app.use('/api', roleRouter)

app.listen(PORT, () => console.log(`server started on post ${PORT}`))