const router = require("express").Router();

const {
  getAllChirps,
  getChirpById,
  createChrip,
  updateChirp,
  deleteChirp,
} = require("../../controller/chirpController");

// Set up GET all and POST at /api/Chirp
router.route("/").get(getAllChirp).post(createChirp);

// Set up GET one, PUT, and DELETE at /api/Chirp/:id
router
  .route("/:id")
  .get(getChirpById)
  .put(updateChirp)
  .delete(deleteChirp);

module.exports = router;