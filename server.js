const express = require('express');
const axios = require('axios');
const parser = require('body-parser');
const { users } = require('./endpoints')
const app = express();

const port = 3000;


app.use(parser.urlencoded({ extended: false }))

app.use(parser.json())

const usersHandlers = users({ axios })

app.get('/', usersHandlers.get )
app.post('/', usersHandlers.post)
app.put('/:id', usersHandlers.put)
app.delete('/:id', usersHandlers.delete)

app.listen(port, () => console.log(`Listening on port ${port}...`))
