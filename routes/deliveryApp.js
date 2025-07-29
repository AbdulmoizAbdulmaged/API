const Router = require('express').Router();
const DeliveryApp = require('../models/deliveryApp');

//create
Router.post('/', async (req, res) => {
  const newDeliveryApp = new DeliveryApp(req.body);
  try {
    const savedDeliveryApp = await newDeliveryApp.save();
    res.status(200).json(savedDeliveryApp);
  } catch (err) {
    res.status(500).json(err);
  }
});
//update
Router.put('/:id', async (req, res) => {
  try {
    const updatedDeliveryApp = await DeliveryApp.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true } // Return the updated document
    );  
    res.status(200).json(updatedDeliveryApp);
  } catch (err) {
    res.status(500).json(err);
  }
}
);
//delete
Router.delete('/:id', async (req, res) => {
  try {
    await DeliveryApp.findByIdAndDelete(req.params.id);
    res.status(200).json("DeliveryApp has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});
//get DeliveryApp
Router.get('/find/:name', async (req, res) => {
  try {
    const deliveryApp = await DeliveryApp.find({ name: req.params.name });
    res.status(200).json(deliveryApp);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get all DeliveryApps
Router.get('/', async (req, res) => {
  try {
    const deliveryApps = await DeliveryApp.find();
    res.status(200).json(deliveryApps);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = Router;