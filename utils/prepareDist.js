let package = require('../package.json');
const fs = require('fs');

console.log('Preparing package.json...');

// set package to public
package.private = false;

// set index.js to root path
let folders = package.main.split('/');
folders.shift();
package.main = folders.join('/');

// remove dev dependencies used while compiling lib
delete package.devDependencies;

// delete scripts of testing and compiling lib
delete package.scripts;

// save modified package.json
fs.writeFileSync('dist/package.json', JSON.stringify(package, null, 2));

// Copy readme.md to dist repo
if(fs.existsSync('README.md')){
    console.log('Copying readme.md...');
    fs.copyFileSync('README.md', 'dist/README.md');
}

console.log('Complete!');