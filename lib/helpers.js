module.exports = {
  normalResponse: function(obj) {
    return {
      error: null,
      errorMsg: null,
      payload: obj
    };
  },
  
  errorResponse: function(msg) {
    return {
      error: true,
      errorMsg: msg,
      payload: null
    };
  }
};


/**
 * Function prototype enhancements
 */

Function.prototype.method = function(name, func){
  if (!this.prototype[name]) {
    this.prototype[name] = func;
  }
};


/**
 * String prototype enhancements
 */

String.method('format', function(){
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number) { 
    return (typeof args[number] != 'undefined') ? args[number] : match;
  });
});