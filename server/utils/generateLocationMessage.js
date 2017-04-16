var moment = require('moment');
var generateLocationMessage = function (from, latitude, longitude) {
  return {
      from: from,
      url: "https://www.google.com/maps?q="+latitude+","+longitude,
      createdAt: moment().valueOf()
  };
};

module.exports = generateLocationMessage;