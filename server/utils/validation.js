/**
 * Created by sriram on 16/04/17.
 */
var isRealString = function(str){
  return typeof str == 'string' && str.trim().length > 0;
};

module.exports = isRealString;