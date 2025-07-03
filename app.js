const express = require('express');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const logger = require('./middleware/logger');

const app = express();
app.use(express.json());
app.use(logger);// log requests

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));