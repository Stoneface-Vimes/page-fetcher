const request = require('request');
const input = process.argv.slice(2);
const fs = require('fs');

request(input[0], (error, response, body) => {
  console.log('error', error);
  console.log('statusCode', response && response.statusCode);
  if (response.statusCode !== 200) {
    console.log(`Recived non-200 response code (response code = ${response}), process will now exit`);
    process.exit()
  }
  fs.access(input[1], fs.constants.R_OK, (err) => {
    if (!err) {
      fs.writeFile(input[1], body, (err) => {
        if (err) throw err;
        console.log('The file has been saved');
        fs.stat(input[1], (err, stats) => {
          if (err) throw err;
          console.log(`Downloaded and saved ${stats.size} bytes to ./index.html`);
        })
      })
    } else {
      console.log(`${err} is invalid. Please double check your file path.`)
    }
  });
});