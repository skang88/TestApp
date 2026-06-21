const express = require('express');
const app = express();
const port = 5000;
const gameRoutes = require('./routes/gameRoutes');

app.use(express.json());
app.use('/api', gameRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
