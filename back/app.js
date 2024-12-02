const express = require("express");
const cors = require("cors");
const session = require("express-session");
const router = require("./routes/routes");
const superheroesRouter = require("./routes/superheroes");
const userRouter = require("./routes/routesUs/usersRoutes");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: "mi_secreto_seguro",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

app.use("/router", router);
app.use("/superheroes", superheroesRouter);
app.use("/users", userRouter);

app.use((req, res) => {
  res.status(404).send("Ruta no encontrada.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
