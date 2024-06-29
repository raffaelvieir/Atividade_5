const express = require('express');
const router = express.Router();
const Food = require('../models/foodModel');


router.get('/', async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/:id', getFood, (req, res) => {
  res.json(res.food);
});

router.post('/', async (req, res) => {
  const food = new Food({
    name: req.body.name,
    category: req.body.category,
    quantity: req.body.quantity,
    expirationDate: req.body.expirationDate,
    price: req.body.price,
  });

  try {
    const newFood = await food.save();
    res.status(201).json(newFood);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', getFood, async (req, res) => {
  if (req.body.name != null) {
    res.food.name = req.body.name;
  }
  if (req.body.category != null) {
    res.food.category = req.body.category;
  }
  if (req.body.quantity != null) {
    res.food.quantity = req.body.quantity;
  }
  if (req.body.expirationDate != null) {
    res.food.expirationDate = req.body.expirationDate;
  }
  if (req.body.price != null) {
    res.food.price = req.body.price;
  }

  try {
    const updatedFood = await res.food.save();
    res.json(updatedFood);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', getFood, async (req, res) => {
  try {
    await res.food.remove();
    res.json({ message: 'Deleted Food' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getFood(req, res, next) {
  let food;
  try {
    food = await Food.findById(req.params.id);
    if (food == null) {
      return res.status(404).json({ message: 'Cannot find food' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.food = food;
  next();
}

module.exports = router;
