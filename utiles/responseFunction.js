const responseFunction = (res, status, message, data, ok) => {
  return res.status(status).json({
        message,
        data,
        ok
    })
}

module.exports = responseFunction;