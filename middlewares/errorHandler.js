const {
  INVALID_TOKEN,
  UNAUTHORIZED,
  TOKEN_DOES_NOT_EXIST,
} = require('../constants/errorConstants');

function errorHandler(err, req, res, next) {
  let error = { ...err, name: err.name };

  if (process.env.ENV === 'development') {
    console.log(error);
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
    case TOKEN_DOES_NOT_EXIST:
      return res.json({
        ok: false,
        status: 400,
        message: '로그인 토큰이 존재하지 않습니다.',
      });
  }

  res.json({
    ok: false,
    status: 500,
    message: '서버에 문제가 발생했습니다.',
  });
}

module.exports = errorHandler;
