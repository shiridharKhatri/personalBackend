const nodemailer = require("nodemailer");

const sendMessage = async (email, message) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL,
      subject: "Message",
      html: `<b>From : ${email}</b><br><p>${message}</p>`,
    });

    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Failed to send email"); // Rethrow the error or handle it accordingly
  }
};

module.exports = sendMessage;
