const stream = require('stream');

const readable = new stream.Readable({
  encoding: 'utf-8',
  highWaterMark: 16000,
  objectModel: true // behave as a stream of objects rather than bytes
});

const Feed = function(channel) {
  const readable = new stream.Readable({
    encoding: 'utf-8'
  });
  const news = [
    'Big Win!',
    'Stacks Down!',
    'Actor Sad!'
  ];
  readable._read = () => {
    if (news.length) return readable.push(news.shift() + '\n');
    readable.push(null);
  }
  return readable;
}

const feed = new Feed();
feed.on('readable', () => {
  const data = feed.read();
  data && process.stdout.write(data);
});
feed.on('end', () => {
  console.log('No more news!');
});


