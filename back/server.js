const express = require('express');
const config = require('config')
const mongoose = require('mongoose')
const fileupload = require('express-fileupload')
const cors = require('cors')
const app = express();


app.use(cors())
// без него body будет undefined
app.use(express.json({ extended: true }))

app.use(fileupload())

// use modules
app.use('/api/auth', require('./routes/auth_routes'))

app.use('/api/profile', require('./routes/profile_routes'))

app.use('/api/posts', require('./routes/posts_routes'))

// start web server
const PORT = config.get('port') || 5000;
async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    app.listen(PORT, () => console.log(`start port ${PORT}`))
  } catch (err) {
    console.log('Server error:', err.message);
    process.exit(1);
  }
}

start()

