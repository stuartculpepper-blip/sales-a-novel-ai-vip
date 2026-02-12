const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const referrer = req.headers.referer || req.headers.referrer || '';
  
  console.log('Referrer:', referrer);
  
  if (referrer.toLowerCase().includes('moltbook.com')) {
    const novelPath = path.join(__dirname, '..', 'public', 'novel.html');
    const novel = fs.readFileSync(novelPath, 'utf8');
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(novel);
  } else {
    res.redirect(301, '/');
  }
};

