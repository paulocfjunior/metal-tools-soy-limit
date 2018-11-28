const soy = require('metal-tools-soy');

const soyDeps = ['node_modules/metal*/src/**/*.soy'];
const src = ['./src/**/*.soy'];
const dest = ['./soy'];

// Just a flag to check if the promise has resolved or rejected
let action = 0;

// define the promise to handle soy compile process
// this is the same function used in magnet-plugin-metal:1.3.1 on src/build-soy.js line 3
// the same version used by DXP Cloud Console
const buildSoyFiles = (src, dest, soyDeps) => 
  new Promise((resolve, reject) => {
    const handleError = error => reject(error);
    soy({src, dest, soyDeps, handleError}).on('end', () => resolve());
  });

// Define a function to check if there was some action before exit Node process
process.on('exit', (code) => {
  // If the flag was not modified, so the promise has neither reject or resolved
  if(action === 0) {
    console.error('>> Node process exited with no resolution (the promise has neither rejected nor resolved)\n');
  } else {
    console.log(`>> Node process has resolved. Actions: ${action}\n`);
  }
});

// Call buildSoyFiles as in magnet-plugin-metal > buildSoy.js
buildSoyFiles(src, dest, soyDeps).then(() => {
  // If resolved, increments action flag
  action++;
  console.log('Promise resolved\n');
}).catch(e => {
  // If rejected, increments action flag
  action++;
  console.error(`Promise rejected: ${e}\n`);
});
