const express = require("express");
const {
  getAll,
  getById,
  create,
  remove,
  update,
} = require("../../model/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await getAll();

    return res.status(200).json({
      status: "success",
      code: 200,
      data: { contacts },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const contact = await getById(req.params.id);

    if (contact) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: { contact },
      });
    }

    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Not Found",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const contact = await create(req.body);

    return res.status(201).json({
      status: "success",
      code: 201,
      data: { contact },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const contact = await remove(req.params.id);

    if (contact) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: { contact },
      });
    }

    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Not Found",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const contact = await update(req.params.id, req.body);

    if (contact) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: { contact },
      });
    }

    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Not Found",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
