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
}