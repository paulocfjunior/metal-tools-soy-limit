# metal-tools-soy (test for a bug)

This project intends to demonstrate a bug related to metal-tools-soy package, when trying to compile a specific amount of files in a specific structure.

In this project, you could test two situations:

First of all, run `npm install` in order to get the `metal-tools-soy` library and all its dependencies.

1. Success case: `npm run success`
    This example tries to compile **82** files inside the folder `src/child/`, and it finish successfuly.

2. Fail case: `npm run success`
    This example tries to compile **83** files inside the folder `src/child/`, and in this case the promise neither reject nor resolve, the process just dies and returns 0, this is the bug.

The piece of code which process the Soy files is:
```javascript
const buildSoyFiles = (src, dest, soyDeps) => 
  new Promise((resolve, reject) => {
    const handleError = error => reject(error);
    soy({src, dest, soyDeps, handleError}).on('end', () => resolve());
  });
```