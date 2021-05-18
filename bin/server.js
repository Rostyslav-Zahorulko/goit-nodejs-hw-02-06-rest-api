const app = require("../app");
const db = require("../model/db");

const PORT = process.env.PORT || 3000;

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}`);
  });
}).catch((error) => {
  console.log(`Server hasn't been started. Error: ${error.message}`);
  process.exit(1);
});
