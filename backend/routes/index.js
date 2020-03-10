'use strict';

const express = require('express');
const router = express.Router();
const BaseDates = require('../models/BaseDates.js');

router.get('/actuaciones', async (req, res, next) => {
  try {
    const listaActuaciones = await BaseDates.find();
    res.status(200).json({ listaActuaciones });
  } catch (error) {
    next(error);
  }
});

router.post('/actuaciones/new', async (req, res, next) => {
  const nuevaActuacion = req.body;
  try {
    const crearActuacion = await BaseDates.create(nuevaActuacion);
    res.status(200).json(crearActuacion);
  } catch (error) {
    next(error);
  }
});

router.get('/actuaciones/:id/details', async (req, res, next) => {
  const { id } = req.params;
  try {
    const detail = await BaseDates.findById(id);
    res.status(200).json(detail);
  } catch (error) {
    next(error);
  }
});

router.put('/actuaciones/:id/update', async (req, res, next) => {
  const { id } = req.params;
  const modificar = req.body;
  try {
    const modificarActuacion = await BaseDates.findByIdAndUpdate(id, modificar, { new: true });
    res.status(200).json(modificarActuacion);
  } catch (error) {
    next(error);
  }
});

router.delete('/actuaciones/:id/delete', async (req, res, next) => {
  const { id } = req.params;
  try {
    await BaseDates.findByIdAndDelete(id);
    res.status(200).json({ message: 'Acuación Eliminada' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
