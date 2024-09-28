const express = require('express');
const router = express.Router();
const Order = require('../models/orders'); // Assure-toi que le chemin est correct

// POST route to save contact data
router.post('/contact', async (req, res) => {
  const { name, email, mobile, commande } = req.body;

  if (!name || !email || !mobile || !commande) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  try {
    // Save the contact data to the database
    const newOrder = new Order({ name, email, mobile, commande });
    await newOrder.save();
    res.status(200).json({ message: 'Message envoyé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de la commande:', error);
    res.status(500).json({ error: 'Erreur lors de l\'enregistrement de la commande.' });
  }
});

router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des commandes.' });
  }
});

module.exports = router;
