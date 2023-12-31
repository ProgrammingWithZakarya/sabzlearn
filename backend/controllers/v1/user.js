const userModel = require("../../models/user");

// exports.create = async (req, res) => {
//   const { name, description, shortName, categoryID, price } = req.body;

//   const course = await courseModel.create({
//     name,
//     description,
//     shortName,
//     creator: req.user._id,
//     categoryID,
//     price,
//     isComplete: 0,
//     support: "گروه تلگرامی",
//     cover: "/images/courses/fareelancer.png",
//   });

//   const populatedCourse = await courseModel
//     .findById(course._id)
//     .populate("creator", "-password");

//   return res.status(201).json(populatedCourse);
// };

exports.getAll = async (req, res) => {
  const users = await userModel.find();

  const allUsers = [];
  for (const userItem of users) {
    if (userItem.role !== "ADMIN") {
      allUsers.push(userItem);
    }
  }
  return res.json(allUsers);
};

exports.removeUser = async (req, res) => {
  const deletedUser = await userModel.findOneAndRemove({ _id: req.params.id });

  if (!deletedUser) {
    return res.status(404).json("There is not user");
  }

  return res.status(200).json("User Deleted Successfully");
};

// exports.banUser = async (req, res) => {
//     const mainUser = await userModel.find({ _id: req.params.id })

//     console.log(mainUser);
// };

// exports.getOne = async (req, res) => {
//   const course = await courseModel
//     .findOne({ shortName: req.params.shortName })
//     .populate("categoryID", "-password")
//     .populate("creator", "-password")
//     .lean();

//   const sessions = await sessionModel.find({ course: course._id }).lean();
//   const comments = await commentModel
//     .find({ course: course._id })
//     .populate("creator")
//     .lean();

//   const courseStudentsCount = await courseUserModel
//     .find({
//       course: course._id,
//     })
//     .count();
//   let isUserRegisteredToThisCourse = null;
//   if (req.user) {
//     isUserRegisteredToThisCourse = !!(await courseUserModel.findOne({
//       user: req.user._id,
//       course: course._id,
//     }));
//   } else {
//     isUserRegisteredToThisCourse = false;
//   }

//   return res.json({
//     ...course,
//     courseStudentsCount,
//     sessions,
//     comments,
//     isUserRegisteredToThisCourse,
//   });
// };

// exports.createSession = async (req, res) => {
//   const { title, time } = req.body;

//   const session = await sessionModel.create({
//     title,
//     time,
//     course: req.params.id,
//   });

//   return res.status(201).json(session);
// };

// exports.register = async (req, res) => {
//   const isUserAlreadyRegistered = await courseUserModel
//     .findOne({ user: req.user._id, course: req.params.id })
//     .lean();

//   if (isUserAlreadyRegistered) {
//     return res
//       .status(409)
//       .json({ message: "you are already registered to this course." });
//   }

//   await courseUserModel.create({
//     user: req.user._id,
//     course: req.params.id,
//   });

//   return res.status(201).json({ message: "you are registered successfully." });
// };

// exports.getCategoryCourses = async (req, res) => {
//   const { categoryName } = req.params;
//   const category = await categoryModel.find({ name: categoryName })
//   if(category.length) {
//     const categoryCourses = await courseModel.find({ categoryID: category[0]._id })
//     res.json(categoryCourses)
//   } else {
//     res.json([])
//   }
// };
