const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); //req.body
// app.use(cors());

app.get('/', (req, res) => {
    let a = "asdfa;"
    console.log("asdfa;foj");
  res.send('Hello, World!');
});

// Register and login routes //
app.use("/auth",require("./routes/jwtAuth"));


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
