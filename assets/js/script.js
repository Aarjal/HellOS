const apps = document.querySelector("#os-apps")
var menu = document.querySelector("#os-menu")
const os_window = document.querySelector(".os-window")
const brand_window = document.querySelector(".brand")
const app_main = document.querySelector("#app-main")
const maximise = document.querySelector("#maximize")
const shorter = document.querySelector("#shorter")
const cross = document.querySelector("#cross")
const taskbar = document.querySelector("#taskbar")

close(os_window)

create_app("File manager", "assets/images/apps/file-manager.png", "file-manager")
create_app("Recycle Bin", "assets/images/apps/recycle-bin.png", "recycle-bin")
create_app("Settings", "assets/images/apps/settings.png", "settings")
create_app("System Info", "assets/images/apps/system-information.png", "system-information")

function create_app(name, image, id){
    let app = document.createElement("div")
    app.classList.add("app")
    app.id = id
    app.setAttribute("onclick", "window_open('" + id + "')")
    app.oncontextmenu = e => {
        open_menu(e)
    }
    let img = document.createElement("img")
    img.src = image
    img.setAttribute("alt", name)
    let p = document.createElement("p")
    p.innerText = name
    app.appendChild(img)
    app.appendChild(p)
    apps.appendChild(app)
}

function open (tag) {
    tag.style.display = "block"
}

function close  (tag) {
    tag.style.display = "none"
}