seajs.use(['./math.js', './a.js'], function(math, a) {
  console.log('---------------', math, a);
})

seajs.use(['./dist/jquery.js'], function($) {
  console.log('--$', $);
  // $('.app').click(() => {
  //   console.log('xxxxxxxxxxx');
  //   console.log(math.add(num++,1))
  // })
})

