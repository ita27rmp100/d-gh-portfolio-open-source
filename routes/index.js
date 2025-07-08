require("dotenv").config();
const api = process.env.GITHUB_TOKEN;
var express = require('express');
const axios = require('axios');
const fs = require("fs")
var router = express.Router();

/* GET home page. */
router.get('/:username?', function(req, res, next) {
  const username = req.params.username || 'ita27rmp100';
  // fs.writeFile(
  //   `${userDir}/${username}.json`, '{}',
  //   (err) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log("Create file");
  //     }
  //   }
  // );
  const userDir = __dirname +'/users'
  if(!fs.existsSync(userDir)){
    fs.mkdirSync(userDir,{recursive:true})
  }
  fs.writeFile(
    `${userDir}/${username}.json`,'{}',
    (err)=>{
      if(err){
        console.log(err)
      };
  })
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
