// GET users's repos {name:link} and programming skills array
let projectsChilds = ''

$.get("https://api.github.com/users/ita27rmp100/repos",function(data){
    for(let i=0;i<Object.keys(data).length;i++){
        console.log(data[i].name)
        projectsChilds += `<new-repo reponame="${data[i].name}" lnk="${data[i].html_url}" lang="${String(data[i].language).toLowerCase()}" class="p-2"></new-repo>`
    }
    $("#projects").html(projectsChilds)
    
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
})
    // my github token : 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
// GET the social accounts
let socialsHTML = '' ;
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
            socialsHTML += `<social-acc name="${JSON_res[i].provider}" lnk="${JSON_res[i].url}"></social-acc>`
        }
        $("#socials").html(socialsHTML)
    },
    error: function (err) {
        console.log("Error fetching data. Ensure your token is correct.");
    }
});