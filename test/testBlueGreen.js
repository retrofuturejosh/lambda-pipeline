const exec = require('child_process').exec;

let counter = 1;

while (counter < 25) {
  setTimeout(() => {
    exec(
      `npm run test-api`,
      (error, stdout, stderr) => {
        if (error) {
          throw new Error(error);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
      }
    );
  }, counter * 30000);
  counter++;
}
