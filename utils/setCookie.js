const ms = require('ms');

function setCookie(res, name, value, expire) {
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: ms(expire)
  };

  res.cookie(name, value, options);
}

module.exports = setCookie;