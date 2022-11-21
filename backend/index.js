const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

const DB =
  "mongodb+srv://saswath:saswath@cluster0.lh3d4kb.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(DB)
  .then(() => {
    console.log("connected to database succesully");
  })
  .catch((err) => {
    console.log("connection failed");
  });

const registrationSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const user = mongoose.model("user", registrationSchema);

app.post("/register", async (request, response) => {
  const { email, password } = request.body;
  const userLogin = await user.findOne({ email: email });
  if (userLogin) {
    response.status = 400;
    response.send("User already exists");
  } else {
    const hashedPassword = await bcrypt.hash(request.body.password, 10);
    const newuser = new user({ email: email, password: hashedPassword });
    newuser.save();
    response.send(email);
  }
});

const authenticateToken = (request, response, next) => {
  const token = request.cookies.access_token;
  if (!token) {
    response.status(400);
  }
  try {
    const data = jwt.verify(token, "MY_SECRET_TOKEN");
    request.email = data.email;
    next();
  } catch {
    response.status(400);
  }
};

app.get("/jwt", authenticateToken, async (request, response) => {
  response.send({ user: { email: request.email } });
});

app.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(422).json({ error: "enter all fields" });
    }
    const userLogin = await user.findOne({ email: email });

    if (userLogin) {
      const isPasswordMatched = await bcrypt.compare(
        password,
        userLogin.password
      );
      if (isPasswordMatched === false) {
        response.status(400).json({ error: "wrong password" });
      } else {
        const payload = {
          email: email,
        };
        const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN");
        // response.send({ jwtToken });
        response
          .cookie("access_token", jwtToken, {
            httpOnly: true,
          })
          .status(200)
          .json({ message: "Logged in successfully 😊 👌" });
      }
    } else {
      response.status(400).json({ error: "error!" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(4000, () => {
  console.log("Server Running at http://localhost:4000/");
});
