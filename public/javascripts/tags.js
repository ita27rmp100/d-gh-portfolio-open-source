function go(lnk){
    window.location = lnk 
}
class GH_REPO extends HTMLElement{
    connectedCallback(){
        this.innerHTML=`<div class="card repo" onclick="go('${this.getAttribute("lnk")}')">
                            <div class="card-body d-flex justify-content-between align-items-center">
                                <h5 class="text-dark mb-0">${this.getAttribute("reponame").slice(0,20)}</h5>
                                <i class="devicon-${this.getAttribute("lang")}-plain colored p-0 fs-3" ></i>
                            </div>
                        </div>`
    }
}
class Skills extends HTMLElement{
    connectedCallback(){
        this.innerHTML=`<i class="devicon-${this.getAttribute("skill")}-plain colored p-0 fs-3"></i>`
    }
}
class Social extends HTMLElement{
    connectedCallback(){
        let social_name = this.getAttribute("name")
        let class_strct
        if(social_name.toLowerCase()=="gmail"){
            class_strct = "fa-solid fa-envelope"
        }
        else{
            class_strct = `fa-brands fa-${social_name.toLocaleLowerCase()}`
        }
        this.innerHTML=`<section class="lnk" onclick="go('${this.getAttribute("lnk")}')">
                            <i class="${class_strct} text-light">&nbsp; ${social_name}</i>
                        </section>`
    }
}

const tags = {
    "new-repo":GH_REPO,
    "new-skill":Skills,
    "social-acc":Social
}
for(tag in tags){
    customElements.define(tag,tags[tag])
}