const fs = require("fs").promises;
const cloudinary = require("../../helpers/cloudinary");

const { User } = require("../../models/user");

const updateAvatar = async (req, res) => {
  const tempFilePath = req.file.path;
  const { _id } = req.user;
  try {
    const oldAvatar = await User.findById(_id);

    if (oldAvatar.cloudinary_id) {
      await cloudinary.uploader.destroy(oldAvatar.cloudinary_id);
    }

    const { secure_url, public_id } = await cloudinary.uploader.upload(
      tempFilePath,
      {
        folder: "avatars",
        resource_type: "image",
        transformation: [
          { aspect_ratio: "1.0", width: 250, crop: "fill" },
          { radius: "max" },
          { fetch_format: "auto" },
        ],
      },
    );
    await User.findByIdAndUpdate(_id, {
      profile_img: secure_url,
      cloudinary_id: public_id,
    });
    await fs.unlink(tempFilePath);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: {
          profile_img: secure_url,
          cloudinary_id: public_id,
        },
      },
    });
  } catch (error) {
    await fs.unlink(tempFilePath);
    throw error;
  }
};

module.exports = updateAvatar;
