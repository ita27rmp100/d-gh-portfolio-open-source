let repos = {}
$.get("https://api.github.com/users/ita27rmp100/repos",function(data){
    for(let i=0;i<Object.keys(data).length;i++){
        //console.log(`${data[i].name} : ${data[i].html_url} `)
        repos[`${data[i].name}`] = `${data[i].html_url}`
    }
    console.log(repos)
})
let user = {}
$.get("https://api.github.com/users/ita27rmp100",function(data){
    user = {
        name:data.name,
        img:data.avatar_url,
        about:data.bio
    }
    console.log(user)  
})