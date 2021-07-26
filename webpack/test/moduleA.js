(function(window) {
  var name = 'milo';
  function tell() {
    console.log('my name is', name)
  }
  window.moduleA = { tell }
})(window)