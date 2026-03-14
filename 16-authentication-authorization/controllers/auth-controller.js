const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Log in page",
    isLoggedIn: false,
    errorMessage: null,
    oldInput: {
      email: "",
    },

    userDetails: {},
  });
};
exports.postLogin = async (req, res, next) => {
  console.log("email pass", req.body);
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(422).render("auth/login", {
      pageTitle: "Log in page",
      isLoggedIn: false,
      errorMessage: "Invalid email or password",
      oldInput: {
        email,
      },

      userDetails: {},
    });
  }

  const doMatch = await bcrypt.compare(password, user.password);
  console.log("do match", doMatch);
  if (!doMatch) {
    return res.status(422).render("auth/login", {
      pageTitle: "Log in page",
      isLoggedIn: false,
      errorMessage: "Invalid  password",
      oldInput: {
        email,
      },

      userDetails: {},
    });
  }
  req.session.isLoggedIn = true;
  req.session.user = user;
  return req.session.save((err) => {
    console.log(err);
    res.redirect("/");
  });
};
exports.getSignup = (req, res, next) => {
  res.render("auth/sign-up", {
    pageTitle: "Sign up  page",
    isLoggedIn: false,
    oldInput: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      role: "",
    },
    errorMessage: [],

    userDetails: {},
  });
};
exports.postSignup = [
  check("firstName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Name should at least 2 characters")
    .matches(/^[a-zA-Z]+$/)
    .withMessage("First Name should only contain characters"),

  check("lastName")
    .matches(/^[a-zA-Z]*$/)
    .withMessage("Last Name should only contain characters"),

  check("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password should be at least 6 characters")
    .matches(/^(?=.*[A-Z])(?=.*\d).+$/)
    .withMessage(
      "Password should contain at least one uppercase letter and one number",
    ),
  check("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),

  check("phoneNumber")
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^\d{8,}$/)
    .withMessage("Phone number should be 8 digits or more"),

  check("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["user", "admin"])
    .withMessage("Role must be either user or admin"),
  check("policy").custom((value, { req }) => {
    if (value !== req.body.policy) {
      throw new Error("Your must accept the terms and conditions");
    }
    return true;
  }),
  (req, res, next) => {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phoneNumber,
      role,
    } = req.body;
    const errors = validationResult(req);

    const allErrors = errors.errors.map((error) => {
      return { errorPath: error.path, errorMessage: error.msg };
    });
    if (!errors.isEmpty()) {
      return res.status(422).render("auth/sign-up", {
        pageTitle: "Sign up  page",
        isLoggedIn: false,
        errorMessage: allErrors,
        oldInput: {
          firstName,
          lastName,
          email,
          phoneNumber,
          role,
        },

        userDetails: {},
      });
    } else {
      bcrypt.hash(password, 12).then((hashedPassword) => {
        const newUser = new User({
          firstName,
          lastName,
          email,
          password: hashedPassword,
          phoneNumber,
          userType: role,
        });
        return newUser
          .save()
          .then((result) => {
            console.log("User is created successfully", result);
            res.redirect("/login");
          })
          .catch((err) => {
            console.log("Error when creating user", err);
            res.status(422).render("auth/sign-up", {
              pageTitle: "Sign up  page",
              isLoggedIn: false,
              errorMessage: allErrors,
              oldInput: {
                firstName,
                lastName,
                email,
                phoneNumber,
                role,
              },

              userDetails: {},
            });
          });
      });
    }
  },
];
exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
