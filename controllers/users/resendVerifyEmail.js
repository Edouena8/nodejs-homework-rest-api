const nodemailer = require("nodemailer");
const { ctrlWrapper, HttpError } = require("../../helpers");
const { User } = require("../../models/user");

const resendVerifyEmail = async (req, res) => {
  const { BASE_URL, META_PASSWORD } = process.env;
  const { email } = req.body;
  if (!email) {
    throw HttpError(400, "missing required field email");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email not found");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
      user: "yaroslava.pl@meta.ua",
      pass: META_PASSWORD,
    },
  };

  const transport = nodemailer.createTransport(nodemailerConfig);

  const verifyEmail = {
    to: email,
    from: "yaroslava.pl@meta.ua",
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">Click verify email</a>`,
  };

  await transport.sendMail(verifyEmail);

  res.json({
    message: "Verification email sent",
  });
};

module.exports = ctrlWrapper(resendVerifyEmail);
