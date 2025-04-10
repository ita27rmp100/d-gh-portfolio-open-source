let username = document.title.slice(document.title.indexOf("|")+2)
// GET users's repos {name:link} and programming skills array
let projectsChilds = ''
$.get(`https://api.github.com/users/${username}/repos`,function(data){
    let NumOfRepo = Object.keys(data).length
    for(let i=0;i<NumOfRepo;i++){
        projectsChilds += `<new-repo reponame="${data[i].name}" lnk="${data[i].html_url}" lang="${String(data[i].language).toLowerCase()}" class="p-2"></new-repo>`
    }
    $("#projects").html(projectsChilds)
})
// GET user information
let user = {}
$.get(`https://api.github.com/users/${username}`,function(data){
    $("#subtitle").html(`@${data.name} | <i class="fa-solid fa-map"></i> ${data.location}`)
    $(".FullName").text(data.name)
    $("#avatar").attr("src",data.avatar_url)
    $("#icon").attr("href",data.avatar_url)
    $("#bio").text(data.bio)
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
          user(login: "${username}") {
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
        let JSON_res = data.data.user.socialAccounts.nodes;
        console.log(JSON_res)
        let length = JSON_res.length
        for(i=0;i<length;i++){
            socialsHTML += `<social-acc name="${JSON_res[i].provider}" lnk="${JSON_res[i].url}"></social-acc>`
        }
        $("#socials").html(socialsHTML)
    },
    error: function (err) {
        console.log("Error fetching data. Ensure your token is correct.");
    }
});