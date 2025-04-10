let username = document.title.slice(document.title.indexOf("|")+2) || "ita27rmp100"
// GET users's repos {name:link} and programming skills array
let projectsChilds = ''
$.get(`https://api.github.com/users/${username}/repos`,function(data){
    data = data.sort((a,b)=>new Date(b.created_at) - new Date(a.created_at))
    for(let i=0;i<10;i++){
        projectsChilds += `<new-repo reponame="${data[i].name}" lnk="${data[i].html_url}" lang="${String(data[i].language).toLowerCase()}" class="p-2"></new-repo>`
    }
    projectsChilds+=`<section class="mt-3 w-100 d-flex justify-content-center">
                        <a href="https://github.com/${username}?tab=repositories" class="btn btn-outline-light fw-bold"><i class="fas fa-ellipsis-h"> More</i></a>
                    </section>`
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