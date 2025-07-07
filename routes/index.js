require("dotenv").config();
const api = process.env.GITHUB_TOKEN;
var express = require('express');
const axios = require('axios');
var router = express.Router();

console.log("Loaded token:", api);

/* GET home page. */
router.get('/:username?', function(req, res, next) {

  const username = req.params.username || 'ita27rmp100';
  let socialsHTML = '';
  console.log(api)
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
