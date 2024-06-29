function generateOTP(length = 6) {
  if (length <= 0 || !Number.isInteger(length)) {
    throw new Error("Invalid OTP length: must be a positive integer");
  }

  let otp = "";
  const charSet =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charSet.length);
    otp += charSet[randomIndex];
  }

  return otp;
}

module.exports = generateOTP;
