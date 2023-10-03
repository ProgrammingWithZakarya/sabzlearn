const express = require("express");

const userController = require("../../controllers/v1/user");
const isAdminMiddleware = require("./../../middlewares/isAdmin");
const isAuthenticated = require("./../../middlewares/authenticated");

const router = express.Router();

// router.use(authenticatedMiddleware);

router
  .route("/")
  //   .post(
  //     // multer({ storage: multerStorage }).single('cover'),
  //     authenticatedMiddleware,
  //     isAdminMiddleware,
  //     courseController.create
  //   )
  .get(isAuthenticated, isAdminMiddleware, userController.getAll);

router
  .route("/:id")
  .delete(isAuthenticated, isAdminMiddleware, userController.removeUser);

// router
//   .route("/ban/:id")
//   .put(isAuthenticated, isAdminMiddleware, userController.banUser);

// router
//   .route("/:id/sessions")
//   .post(isAdminMiddleware, courseController.createSession);

// router.route('/presell').get(courseController.getAll)
// router.route('/popular').get(courseController.getAll)

// router.route("/:shortName").post(loginUser, courseController.getOne);

// router.route("/:id/register").post(courseController.register);

// router.route('/category/:categoryName').get(courseController.getCategoryCourses)

module.exports = router;
