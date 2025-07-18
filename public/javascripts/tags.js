function go(lnk){
    window.location = lnk 
}
class GH_REPO extends HTMLElement{
    connectedCallback(){
        this.innerHTML=`<div class="card repo" onclick="go('${this.getAttribute("lnk")}')">
                            <div class="card-body d-flex justify-content-between align-items-center">
                                <h5 class="text-dark mb-0 RepoName">${this.getAttribute("reponame").slice(0,20)}</h5>
                                <i class="devicon-${this.getAttribute("lang")}-plain colored p-0 fs-3" ></i>
                            </div>
                        </div>`
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
                            <i class="${class_strct}"></i>
                        </section>`
    }
}
class Message extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `<div class="card w-100">
                            <div class="card-header">
                                <h5 class="card-title mb-0">${this.getAttribute('name')}</h5>
                                <small class="card-subtitle mb-2 text-muted">${this.getAttribute('email')}</small>
                            </div>
                            <div class="card-body">
                                <p class="card-text">${this.getAttribute('message')}</p>
                                <div class="d-flex justify-content-end">
                                    <a class="btn btn-success" href="mailto:${this.getAttribute('email')}">Reply</a>
                                </div>
                            </div>
                        </div>`
    }
}
const tags = {
    "new-repo":GH_REPO,
    "social-acc":Social,
    "new-msg":Message
}
for(tag in tags){
    customElements.define(tag,tags[tag])
}