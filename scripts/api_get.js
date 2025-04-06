// GET users's repos {name:link} and programming skills array
let /*repos = {} ,*/ prSkills = [] , projectsChilds = '' , skillsList = ''
    // modules to fetch skills list
async function fetchRepoLanguages(repoName) {
    try {
        const response = await fetch(`https://api.github.com/repos/ita27rmp100/${repoName}/languages`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const res = await response.json();
        const langs = Object.keys(res);

        for (let lang of langs) {
            if (!prSkills.includes(lang)) {
                prSkills.push(lang);
                skillsList += `<new-skill class="p-2" skill="${lang.toLowerCase()}"></new-skill>`;
            }
        }
    } catch (err) {
        console.error(`Failed to fetch languages for ${repoName}:`, err);
    }
}

// Example usage for multiple repositories:
async function processRepos(data) {
    for (let i = 0; i < data.length; i++) {
        await fetchRepoLanguages(data[i].name);
    }

    // Do something with skillsList after all data is fetched
    document.getElementById('skills-container').innerHTML = skillsList;
}

$.get("https://api.github.com/users/ita27rmp100/repos",function(data){
    for(let i=0;i<Object.keys(data).length;i++){
        // repos[`${data[i].name}`] = [`${data[i].html_url}`,`${data[i].language}`]
        console.log(data[i].name)
        projectsChilds += `<new-repo reponame="${data[i].name}" lnk="${data[i].html_url}" lang="${String(data[i].language).toLowerCase()}" class="p-2"></new-repo>`
        $.get(`https://api.github.com/repos/ita27rmp100/${data[i].name}/languages`,function(res){
            let langsLength = Object.keys(res).length
            for(let j=0;j<langsLength;j++){
                if(!(prSkills.includes(Object.keys(res)[j]))){
                    prSkills.push(Object.keys(res)[j])
                    skillsList += `<new-skill class="p-2" skill="${Object.keys(res)[j].toLowerCase()}"></new-skill>`
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
let /*social_accounts = {}*/ socialsHTML = '' ;
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
            socialAccounts(first: 6) {
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
            // social_accounts[JSON_res[i].provider] = JSON_res[i].url
            // console.log(JSON_res[i].provider)
            socialsHTML += `<social-acc name="${JSON_res[i].provider}" lnk="${JSON_res[i].url}"></social-acc>`
        }
        $("#socials").html(socialsHTML)
    },
    error: function (err) {
        console.log("Error fetching data. Ensure your token is correct.");
    }
});