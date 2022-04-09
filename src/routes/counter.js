#! /usr/bin/env node

// создаем объект приложенияconst
const express = require("express");
const router = express.Router();
const Book = require("../models/Book.js");
const fileMiddleware = require("../middleware/file");

// определяем обработчик для маршрутов

const redis = require("redis");

const REDIS_URL = process.env.REDIS_URL || "redis://localhost";

const client = redis.createClient({ url: REDIS_URL });
(async () => {
  await client.connect();
})();

router.post("/:id/incr", async (req, res) => {
  const { id } = req.params;

  await client.incr(id);
  res.json("OK");
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const cnt = await client.get(id);
  res.json(cnt);
});

// начинаем прослушивать подключения на 3000 порту
module.exports = router;
