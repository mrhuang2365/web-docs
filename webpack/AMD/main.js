
// require.config({
//   baseUrl: '',
//   paths: {
//     jquery: 'jquery'
//   }
// })

require(['jquery', 'math', 'a'], function($, math, a) {
  let num = 0;
  math.init();
  if (false) {
    a.init();
  }
  $('.app').click(() => {
    console.log('xxxxxxxxxxx');
    console.log(math.add(num++,1))
  })
})