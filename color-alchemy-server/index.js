const express = require("express");

const app = express();

const port = 9876;

const getRandomInt = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const calcDelta = (target) => {
  const distance = Math.sqrt(
    target[0] ** 2 +
    target[1] ** 2 +
    target[2] ** 2
  );
  const delta = (distance / Math.sqrt(3) / 255) * 100;
  return delta;
};

//generate random target color until delta is greater than or equal 10
const getTarget = () => {
  let target = [getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255)];
  while (calcDelta(target) < 10) {
    target = [getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255)];
  }
  return target;
};

const getGameInfo = (userId) => {
  if (!userId) {
    userId = Math.random().toString(16).slice(2, 8);
  }

  return {
    userId,
    width: getRandomInt(10, 20),
    height: getRandomInt(4, 10),
    maxMoves: getRandomInt(8, 20),
    target: getTarget(), // [r, g, b]
  };
};

app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/init", (_, res) => {
  return res.json(getGameInfo());
});

app.get("/init/user/:id", (req, res) => {
  return res.json(getGameInfo(req.params.id));
});

app.listen(port, () => {
  console.log(`Start color-alchemy-server at ${port}`);
});
