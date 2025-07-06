let username = document.title.slice(document.title.indexOf("|")+2) || "ita27rmp100"
let api = window.vars.api;
if (!api) {
    console.error("GitHub API token is missing. Please set window.vars.api before making requests.");
}
// GET users's repos {name:link} and programming skills array
let projectsChilds = ''
let projectData
$.get(`https://api.github.com/users/${username}/repos?per_page=100`,function(data){
    projectData = data
    filter("name")
})
// GET user information
let user = {}
$.get(`https://api.github.com/users/${username}`,function(data){
    $("#subtitle").html(`@${data.name} | <i class="fa-solid fa-map"></i> ${data.location}`)
    $(".FullName").text(data.name)
    $("#avatar").attr("src",data.avatar_url)
    $("#icon").attr("href",data.avatar_url)
    $("#bio").text(data.bio)
    if(data.bio == null) $(".description").remove()
})
// GET the social accounts
let socialsHTML = '' ;
$.ajax({
    url: "https://api.github.com/graphql",
    type: "POST",
    headers: {
        "Authorization": `Bearer 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`,  // Replace with your token
        "Content-Type": "application/json"
    },
    data: JSON.stringify({
        query: `
        {
            user(login: "${username}") {
            email
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