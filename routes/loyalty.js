const { verifyToken,verifyTokenAndAutherization,verifyTokenAndAdmin } = require('./verifyToken');

const router = require('express').Router();

const Loyalty = require('../models/loyalty');

// Save a new loyalty record
router.post('/', async (req, res) => {
  try {
    const newLoyalty = new Loyalty(req.body);
    const savedLoyalty = await newLoyalty.save();
    res.status(200).json(savedLoyalty);
    return;
    
  } catch (err) {
    res.status(500).json(err);
    return; // Prevents further execution
  }
});
// Update loyalty points
router.put('/:userId', async (req, res) => {
  try {
    const updatedLoyalty = await Loyalty.findOneAndUpdate(
      { userId: req.params.userId },
      {
        $inc: {
          points: req.body.points,
          discount: req.body.discount,
          transactions: req.body.transactions,
          
           
          
        },
        $set: {
            // add 7 days to the old validation period
            validationPeriod: new Date(new Date(req.body.validationPeriod).getTime() + 7 * 24 * 60 * 60 * 1000),

        },
      },
     { runValidators: true, new: true } // Ensures the update is validated and returns the updated document
    );
    res.status(200).json(updatedLoyalty);
    return; // Prevents further execution
  } catch (err) {
    res.status(500).json(err);
    return; // Prevents further execution
  }
});
// Get loyalty points for a user
router.get('/find/:userId', async (req, res) => {
  try {
    const loyalty = await Loyalty.findOne({ userId: req.params.userId });
    if (!loyalty) {
      return res.status(404).json('Loyalty record not found');
    }
    res.status(200).json(loyalty);
    return; // Prevents further execution
  } catch (err) {
    res.status(500).json(err);
    return; // Prevents further execution
  }
});

module.exports = router;