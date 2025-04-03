// GET users's repos {name:link} and programming skills array
let /*repos = {} , prSkills = []*/ , projectsChilds = '' , skillsList = ''
$.get("https://api.github.com/users/ita27rmp100/repos",function(data){
    for(let i=0;i<Object.keys(data).length;i++){
        // repos[`${data[i].name}`] = [`${data[i].html_url}`,`${data[i].language}`]
        console.log(data[i].name)
        projectsChilds += `<new-repo reponame="${data[i].name}" lnk="${data[i].html_url}" lang="${data[i].language}"></new-repo>`
        $.get(`https://api.github.com/repos/ita27rmp100/${data[i].name}/languages`,function(res){
            for(let j=0;j<Object.keys(res).length;j++){
                if(!(prSkills.includes(Object.keys(res)[j]))){
                    // prSkills.push(Object.keys(res)[j])
                    skillsList += `<new-skill skill="${Object.keys(res)[j]}"></new-skill>`
                }
            }
        })
    }
    console.log(prSkills)
    $("#projects").html(projectsChilds)
    $("#skills").html(skillsList)
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
    $("#subtitle").html(`@${document.title.slice(document.title.indexOf("|")+2)} | <i class="fa-solid fa-map"></i> ${user.location}`)
    $(".FullName").text(user.name)
    $("#avatar").attr("src",user.img)
    $("#bio").text(user.about)
    console.log(user)  
})
    // my github token : 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
// GET the social accounts
let /*social_accounts = {}*/ , socialsHTML = '' ;
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
            console.log(JSON_res[i].provider)
            socialsHTML += `<social-acc name="${JSON_res[i].provider}" lnk="${JSON_res[i].url}"></social-acc>`
        }
        $("#socials").html(socialsHTML)
    },
    error: function (err) {
        console.log("Error fetching data. Ensure your token is correct.");
    }
});