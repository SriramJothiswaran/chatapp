var moment = require('moment');

var generateMessage = function(from,text){
    return{
        from: from,
        text: text,
        createdAt: moment().valueOf()
    };
};

module.exports = generateMessage;