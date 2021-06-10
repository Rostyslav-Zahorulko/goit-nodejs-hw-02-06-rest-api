const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const createNotExistedFolder = require("../helpers/create-dir");

class AvatarLocalUpload {
  constructor(USERS_AVATARS) {
    this.USERS_AVATARS = USERS_AVATARS;
  }

  async saveAvatarToStatic({ userId, filePath, fileName, oldFile }) {
    await this.transformAvatar(filePath);
    const userAvatarsFolder = path.join("public", this.USERS_AVATARS, userId);
    await createNotExistedFolder(userAvatarsFolder);
    await fs.rename(filePath, path.join(userAvatarsFolder, fileName));
    await this.deleteOldAvatar(
      path.join(process.cwd(), "public", this.USERS_AVATARS, oldFile)
    );
    const avatarUrl = path.normalize(path.join(userId, fileName));

    return avatarUrl;
  }

  async transformAvatar(filePath) {
    const file = await Jimp.read(filePath);
    await file
      .autocrop()
      .cover(
        250,
        250,
        Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(filePath);
  }

  async deleteOldAvatar(filePath) {
    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = AvatarLocalUpload;
