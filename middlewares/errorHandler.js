const { INVALID_TOKEN, UNAUTHORIZED } = require('../constants/errorConstants');

function errorHandler(err, req, res, next) {
  let error = { ...err, name: err.name, message: err.message };

  if (process.env.ENV === 'development') {
    console.log(err);
  }

  switch (error.name) {
    case INVALID_TOKEN:
      return res.json({
        ok: false,
        status: 400,
        message: '유효하지 않은 토큰입니다.',
      });
    case UNAUTHORIZED:
      return res.json({
        ok: false,
        status: 400,
        message: '인증되지 않은 사용자입니다.',
      });
  }

  res.json({
    ok: false,
    status: 500,
    message: '서버에 문제가 발생했습니다.',
  });
}

module.exports = errorHandler;
