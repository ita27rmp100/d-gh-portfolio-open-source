require("dotenv").config();
const api = process.env.GITHUB_TOKEN;
var express = require('express');
const axios = require('axios');
const fs = require("fs")
var router = express.Router();

/* GET home page. */
router.get('/:username?', function(req, res, next) {
  const username = req.params.username || 'ita27rmp100';
  // add username to session
  req.session.username = username
  // create the json file
  const usersDir = `${__dirname}/users`;
  const fileName =  `${usersDir}/${username}.json`;
  if (!fs.existsSync(usersDir)) {
    fs.mkdirSync(usersDir, { recursive: true });
  }
  if (!fs.existsSync(fileName)) {
    fs.writeFile(
      fileName, '{}',
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }
  if (!fs.existsSync(`${__dirname}/users/favicon.ico.json`)) {
    fs.unlink(`${__dirname}/users/favicon.ico.json`,(err)=>{
      if(err) return
    })
  }
  let socialsHTML = '';
  const query = `
  {
    user(login: "${username}") {
      company
      isHireable
      socialAccounts(first: 6) {
        nodes {
          provider
          url
        }
      }
    }
  }`;

  axios.post(
    'https://api.github.com/graphql',
    { query },
    {
      headers: {
        Authorization: `Bearer ${api}`,
        'Content-Type': 'application/json'
      }
    }
  ).then(response => {
    const user = response.data.data.user;
    const socials = user.socialAccounts.nodes;
    socials.forEach(acc => {
      socialsHTML += `<social-acc name="${acc.provider}" lnk="${acc.url}"></social-acc>`;
    });

    res.render('index', {
      username,
      socialsHTML,
      isHireable: user.isHireable,
      company: user.company
    });
  }).catch(err => {
    console.error("Error fetching data. Ensure your token is correct.", err);
    res.render('index', {
      username,
      socialsHTML: '',
      isHireable: null,
      company: null
    });
  });
});

module.exports = router;
