// GET users's repos {name:link} and programming skills array
let repos = {} , prSkills = []
$.get("https://api.github.com/users/ita27rmp100/repos",function(data){
    for(let i=0;i<Object.keys(data).length;i++){
        repos[`${data[i].name}`] = [`${data[i].html_url}`,`${data[i].language}`]
        $.get(`https://api.github.com/repos/ita27rmp100/${data[i].name}/languages`,function(res){
            for(let j=0;j<Object.keys(res).length;j++){
                if(!(prSkills.includes(Object.keys(res)[j]))){
                    prSkills.push(Object.keys(res)[j])
                }
            }
        })
    }
    console.log(repos)
    console.log(prSkills)
})
// GET user information
let user = {}
$.get("https://api.github.com/users/ita27rmp100",function(data){
    user = {
        name:data.name,
        img:data.avatar_url,
        about:data.bio,
        location:data.location
    }
    console.log(user)  
})
    // my github token : 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
// GET the social accounts
let social_accounts = {} ;
$.ajax({
    url: "https://api.github.com/graphql",
    type: "POST",
    headers: {
        "Authorization": "Bearer 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",  // Replace with your token
        "Content-Type": "application/json"
    },
    data: JSON.stringify({
        query: `
        {
          user(login: "ita27rmp100") {
            socialAccounts(first: 5) {
              nodes {
                provider
                url
              }
            }
          }
        }`
    }),
    success: function (data) {
        JSON_res = data.data.user.socialAccounts.nodes;
        for(i=0;i<JSON_res.length;i++){
            social_accounts[JSON_res[i].provider] = JSON_res[i].url
        }
    },
    error: function (err) {
        console.log("Error fetching data. Ensure your token is correct.");
    }
});