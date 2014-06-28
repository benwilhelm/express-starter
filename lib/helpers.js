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