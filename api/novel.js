const https = require('https');

module.exports = async (req, res) => {
  const referrer = req.headers.referer || req.headers.referrer || '';
  
  console.log('Access attempt - Referrer:', referrer);
  
  // Check if referrer contains moltbook.com
  if (!referrer.toLowerCase().includes('moltbook.com')) {
    console.log('Access denied - not from Moltbook');
    return res.redirect(301, '/');
  }
  
  // Fetch novel from private GitHub repo
  const options = {
    hostname: 'raw.githubusercontent.com',
    path: '/stuartculpepper-blip/from-tracy/main/public/novel.html',
    method: 'GET',
    headers: {
      'Authorization': `token ${process.env.GITHUB_TOKEN}`,
      'User-Agent': 'Vercel-Function'
    }
  };
  
  const githubReq = https.request(options, (githubRes) => {
    let data = '';
    
    githubRes.on('data', (chunk) => {
      data += chunk;
    });
    
    githubRes.on('end', () => {
      if (githubRes.statusCode === 200) {
        console.log('Novel fetched successfully from private repo');
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.status(200).send(data);
      } else {
        console.error('GitHub fetch failed:', githubRes.statusCode);
        res.status(500).send('Error loading content');
      }
    });
  });
  
  githubReq.on('error', (error) => {
    console.error('Request error:', error);
    res.status(500).send('Error loading content');
  });
  
  githubReq.end();
};
