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
// use the fetched data from backend
if(window.vars.isHireable == 'false'){
    $("#hireable").remove()
}
const company = window.vars.company
if(!company){
    $("#company").remove()
}else{
    $("#company").html(`<i class="fa-solid fa-building text-info" title="Company"></i> ${company}`)
}