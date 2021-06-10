const path = require("path");
const app = require("../app");
const db = require("../model/db");
const createNotExistedFolder = require("../helpers/create-dir");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const UPLOAD_DIR = process.env.UPLOAD_DIR;
const USERS_AVATARS = process.env.USERS_AVATARS;

db.then(() => {
  app.listen(PORT, async () => {
    const avatarsFolder = path.join("public", USERS_AVATARS);

    await createNotExistedFolder(UPLOAD_DIR);
    await createNotExistedFolder(avatarsFolder);

    console.log(`Server has been started on port ${PORT}`);
  });
}).catch((error) => {
  console.log(`Server hasn't been started. Error: ${error.message}`);
  process.exit(1);
});
