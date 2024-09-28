const express = require('express');
const articleAPI = require('./routes/routeArticle');
const userAPI = require('./routes/routeUser');
const cors = require('cors'); // Pour les requêtes cross-origin
const contactRoutes = require('./routes/contact');
require('./config/connect'); // Pour se connecter à MongoDB

const app = express();

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Middleware pour les requêtes cross-origin
app.use(cors());

// Middleware pour les formulaires encodés
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/article', articleAPI);
app.use('/user', userAPI);
app.use('/api', contactRoutes);

// Serveur de fichiers statiques pour les uploads
app.use('/getimage', express.static('./uploads'));

// Démarrage du serveur
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
