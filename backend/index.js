const express = require("express");
const app = express();
require("dotenv").config();
// Routes Config
app.use(
	express.urlencoded({
		extended: false,
	}),
); //parse incoming request body in JSON format.

app.set("view engine", "ejs");

app.use("/", require("./routes/redirect"));
app.use("/", require("./routes/url"));

//Listen for incoming requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server started, listening PORT ${PORT}`));
