// filter bar of "My Github project"
let Ids = ["name","new","stars"]
function chSelectedActive(id){
    Ids.forEach(
        (e)=>{
            if(e==id) $(`#${e}`).addClass("active")
            else $(`#${e}`).removeClass("active")
        }
    )
}
function filter(id){
    chSelectedActive(id)
    switch (id) {
        case "name":
            projectData.sort((a,b)=>a.name.localeCompare(b.name))
            break;
        case "new" :
            projectData.sort(
                (a,b)=>new Date(b.created_at) - new Date(a.created_at)
            )
            break;
        case "stars" :
            projectData.sort(
                (a,b)=>b.stargazers_count - a.stargazers_count
            )
            break;
        default:
            console.log("Nothing has been changed")
            break;
    }
    let projectsChilds = ''
    for(let i=0;i<5;i++){
        projectsChilds+=`<new-repo 
                            reponame="${projectData[i].name}" 
                            lnk="${projectData[i].html_url}" 
                            lang="${String(projectData[i].language).toLowerCase()}" 
                            class="p-2">
                        </new-repo>`
    }
    projectsChilds+=`<section class="mt-3 w-100 d-flex justify-content-center">
                        <a href="https://github.com/${username}?tab=repositories" class="btn btn-outline-dark fw-bold"><i class="fas fa-ellipsis-h"> More</i></a>
                    </section>`
    $("#projects").html(projectsChilds)
}