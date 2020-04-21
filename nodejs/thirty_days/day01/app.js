const fs = require('fs');
const path = require('path');

/* how to read a file asynchronously */
fs.readFile(path.join(__dirname, 'public') + '/foo.txt', (err, data) => {
	if (err) { console.log(err); return ; }
	console.log(data);
});

/* how to read a file syncronously */
const data = fs.readFileSync(path.join(__dirname, 'public') + '/foo.txt');
console.log(data);

/* how to write data to a file asyncronously */
const dataToWrite = 'foo';
fs.writeFile(path.join(__dirname, 'public') + '/async.txt', dataToWrite, (err) => {
	if (err) { console.log(err); return ; }
	console.log('data has been successfully written');
});

/* how to write data to a file synchronously */
fs.writeFileSync(path.join(__dirname, 'public') + '/sync.txt', dataToWrite);

/* how to append data to a file asyncronously */
const dataToAppend = ',baz';
fs.appendFile(path.join(__dirname, 'public') + '/async.txt', dataToAppend, (err) => {
	if (err) { console.log(err); return ; }
	console.log('data appended successfully');
});

/* how to append data to a file synchronously */
fs.appendFileSync(path.join(__dirname, 'public') + '/sync.txt', dataToAppend);

/* how to rename a file asynchronously */
fs.rename(path.join(__dirname, 'public') + '/Async.txt',
			  path.join(__dirname, 'public') + '/async.txt', (err) => {
				  if (err) { console.log(err); return ; }
				  console.log('file has been renamed');
			  });

/* how to rename a file syncronously */
fs.renameSync('./public/Sync.txt', './public/sync.txt');

/* how to remove a file asyncronously */
fs.unlink('./public/async.txt', (err) => {
	if (err) { console.log(err); return ; }
	console.log('file has been removed');
});

/* how to remove a file syncronously */
fs.unlinkSync('./public/sync.txt');
