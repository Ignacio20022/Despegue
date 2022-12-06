const app = require("./source/app.js");
const db = require("./source/db.js");

app.listen(process.env.PORT || 3001, () => {
  console.log("listening on port 3001");
  db();
});