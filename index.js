require('dotenv').config();
const cors = require('cors')
const express = require('express');
const app = express();
const PORT = process.env.PORT;



app.use(cors({origin: "*"}))
app.use(express.json());

const loginRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes'); 
const taskRoutes = require('./src/routes/task.route');

app.use('/auth', loginRoutes);
app.use('/user', userRoutes);
app.use('/task', taskRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}) 

// Crear usuario funciona