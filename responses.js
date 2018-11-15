exports.parameterMissingResponse = function (res, languageKeyPrefix, flagStatus) {
  console.log("????????????????")
  const response = {
    message: "Parameter Missing",
    status: 400,
    data: "Parameter Missing",
  };
  console.log("response ",response)
  return res.send(JSON.stringify(response));
};
exports.sendErrorWithMessage = function (res, err, flagStatus) {
  const response = {
    message: err,
    status: 400,
    data: {}
    
  };
  res.send(JSON.stringify(response));
};
exports.sendError = function (res, err, flagStatus) {
  var response = {
    message: "ERROR",
    status : 400,
    data   : {}
  };
  res.send(JSON.stringify(response));
}
