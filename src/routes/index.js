const express = require('express');

const router = express.Router();

router.get('/', async (req, response, next) => {
  response.status(200).json({ hello: 'world' });
});

export default router;
