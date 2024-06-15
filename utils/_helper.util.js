const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = async (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        reject(err);
      } else {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            reject(err);
          } else {
            resolve({ hash, salt });
          }
        });
      }
    });
  });
};

const comparePasswords = async (password, hashedPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const generateOtp = (num) => {
  if (num < 3) {
    return Math.floor(Math.random() * 9 * c);
  }
  return Math.floor(
    Math.pow(10, num - 1) +
      Math.random() * (Math.pow(10, num) - Math.pow(10, num - 1))
  );
};

const phoneValidation = (phoneNumber) => {
  if (!phoneNumber) return false;
  const phone = phoneNumber.trim();
  const firstChar = phone.charAt(0);
  if (firstChar === "+" && phone.length === 14) {
    return phone;
  } else if (firstChar === "0" && phone.length === 11) {
    return `+234${phone.slice(1)}`;
  } else if (firstChar === "2" && phone.length === 13) {
    return `+${phone}`;
  } else {
    return false;
  }
};

module.exports = {
  hashPassword,
  comparePasswords,
  generateOtp,
  phoneValidation,
};
