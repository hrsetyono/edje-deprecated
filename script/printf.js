// Concatenate string with variables
// printf('I'm {age} years old!', { age: 29 });
var printf = function (str, params) {
  return str.replace(/{([^{}]*)}/g,
    function (a, b) {
      var r = params[b];
      return typeof r === 'string' || typeof r === 'number' ? r : a;
    }
  );
};


module.exports = printf;
