var fs = require('fs');

fs.writeFile('temp.txt', 'Create new temp.txt file ', function (err) {
  if (err) return console.log(err);
  console.log('create txt file');
});

 console.log(process.argv);