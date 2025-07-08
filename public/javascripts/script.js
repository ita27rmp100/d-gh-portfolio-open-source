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
    projectsChilds+=`<section class="mt-3 w-100 d-flex justify-content-center repoMore">
                        <a href="https://github.com/${username}?tab=repositories" class="btn btn-outline-dark fw-bold"><i class="fas fa-ellipsis-h"> More</i></a>
                    </section>`
    $("#projects").html(projectsChilds)
}
// switch dark/light modes
const modes = [
    ['light','sun'],
    ['dark','moon']
]
let IndexMode = 0
$("#switch").click(function(){
    $(this).removeClass(`btn-${modes[IndexMode][0]}`) 
    $(".modeIcon").removeClass(`fa-${modes[IndexMode][1]}`)
    IndexMode = Math.abs(IndexMode-1)
    $(this).addClass(`btn-${modes[IndexMode][0]}`) 
    $(".modeIcon").addClass(`fa-${modes[IndexMode][1]}`)
    // Exclude filter bar and head nav from mode switching
    $(`.text-${modes[IndexMode][0]}`)
        .not('.bar, .bar * , .head, .head *')
        .addClass(`text-${modes[Math.abs(IndexMode-1)][0]} bg-${modes[IndexMode][0]}`)
        .removeClass(`text-${modes[IndexMode][0]} bg-${modes[Math.abs(IndexMode-1)][0]}`)
    // navbar
    $(".navbar").removeClass(`navbar-${modes[IndexMode][0]}`).addClass(`navbar-${modes[Math.abs(IndexMode-1)][0]}`)
    // switch mode for footer
    $('footer')
        .addClass(`text-${modes[IndexMode][0]} bg-${modes[Math.abs(IndexMode-1)][0]}`)
        .removeClass(`text-${modes[Math.abs(IndexMode-1)][0]} bg-${modes[IndexMode][0]}`)

    // labels & repoNames
    $("label, .RepoName, .msg").addClass('text-dark').removeClass('text-light bg-dark')
    // selection bar and 'more' button in "My projects" part
    $(".bar .filter, .repoMore .btn").each(function() {
        $(this)
            .toggleClass('btn-outline-dark', modes[IndexMode][0] === 'light')
            .toggleClass('btn-outline-light', modes[IndexMode][0] === 'dark');
    });
    // hr
    $("hr").removeClass(`bg-${modes[IndexMode][0]}`).addClass(`bg-${modes[Math.abs(IndexMode-1)][0]}`)
})