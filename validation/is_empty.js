// @Params
// Value -> the value you need to check if it's not empty
// @returns
// true if empty, otherwise false
// Contributor : Mahmoud Ali
const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

module.exports = isEmpty;
