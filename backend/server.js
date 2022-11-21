const { connectDatabase } = require("./configs/database");
const app = require("./app");

connectDatabase();

const PORT = process.env.PORT;
console.log(PORT);
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
