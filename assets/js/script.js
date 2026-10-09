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

const appContents = {
    "file-manager": `
        <div class="app-content">
            <p>Browse your files and folders.</p>
            <div class="file-grid">
                <div class="file-item">📁 Documents</div>
                <div class="file-item">⬇ Downloads</div>
                <div class="file-item">🎴 Pictures</div>
                <div class="file-item">🎵 Music</div>
            </div>
        </div>
    `,

    "recycle-bin": `
        <div class="app-content">
            <p>Your Recycle Bin is currently empty.</p>
        </div>
    `,

    "settings": `
        <div class="app-content">
            <p>Customize your Hell-OS experience.<br>(but only after a while..
             please bear with just the show for now (┬┬﹏┬┬))</p>

            <div class="setting-item">
                <span>Dark theme</span>
                <input type="checkbox" checked>
            </div>

            <div class="setting-item">
                <span>Show desktop icons</span>
                <input type="checkbox" checked>
            </div>

            <div class="setting-item">
                <span>System notifications</span>
                <input type="checkbox">
            </div>
        </div>
    `,

    "system-information": `
        <div class="app-content">
            <p><strong>Operating System:</strong> HELL_OS</p>
            <p><strong>Version:</strong> 0.1.0</p>
            <p><strong>Environment:</strong> Web Browser</p>
            <p><strong>Status:</strong> In Development</p>
        </div>
    `
}

function window_open(id) {
    brand_window.innerHTML = ""
    app_main.innerHTML = ""
    init_window()

    let main = document.querySelector("#" + id)

    let img = document.createElement("img")
    img.src = main.children[0].src
    img.alt = main.children[0].alt

    let p = document.createElement("p")
    p.innerText = main.children[1].innerText

    brand_window.appendChild(img)
    brand_window.appendChild(p)

    app_main.innerHTML = appContents[id] || `
        <div class="app-content">
            <h2>Application</h2>
            <p>No content available.</p>
        </div>
    `

    open(os_window)
}

function init_window() {
    close(shorter)
    maximise.onclick = e => {
        // click.play()
        maximise_window()
    }
    shorter.onclick = e => {
        // click.play()
        shorter_window()
    }
    cross.onclick = e => {
        // click.play()
        close(os_window)
    }
}

function maximise_window () {
    open(shorter)
    close(maximise)
    window.restoreX = os_window.style.left
    window.restoreY = os_window.style.top
    os_window.style.top = 0
    os_window.style.left = 0
    os_window.style.width = "100%"
    os_window.style.height = "100vh"
}

function shorter_window () {
    open(maximise)
    close(shorter)
    os_window.style.top = window.restoreY
    os_window.style.left = window.restoreX
    os_window.style.width = "60%"
    os_window.style.height = "60vh"
}

function open_menu (e, id) {
    e.preventDefault()
    menu.classList.add("active")
    menu.style.top = e.pageY + 5 + "px"
    menu.style.left = e.pageX + 5 + "px"
    return false
}

window.onclick = e => {
    if (menu.classList.contains ("active")) {
        menu.classList.remove("active")
    }
}

// os_window.ondragend = e => {
//     let go_top = e.pageY
//     let go_left = e.pageX
//     if(go_top < 0) {
//         go_top= e
//     }
//     if(go_left < 0) {
//         go_left = 0
//     }
//     os_window.style.top = go_top + "px"
//     os_window.style.left = go_left + "px"
// }

let isDragging = false
let offsetX = 0
let offsetY = 0

const windowBar = document.querySelector(".window-bar")

windowBar.addEventListener("mousedown", e => {
    // Don't start dragging when clicking a window button
    if (e.target.closest("button")) return

    isDragging = true

    const rect = os_window.getBoundingClientRect()

    offsetX = e.clientX - rect.left
    offsetY = e.clientY - rect.top

    windowBar.style.cursor = "grabbing"
})

document.addEventListener("mousemove", e => {
    if (!isDragging) return

    let left = e.clientX - offsetX
    let top = e.clientY - offsetY

    // To keep the window inside the viewport
    const maxLeft = window.innerWidth - os_window.offsetWidth
    const maxTop = window.innerHeight - os_window.offsetHeight

    left = Math.max(0, Math.min(left, maxLeft))
    top = Math.max(0, Math.min(top, maxTop))

    os_window.style.left = left + "px"
    os_window.style.top = top + "px"
})

document.addEventListener("mouseup", () => {
    if (!isDragging) return

    isDragging = false
    windowBar.style.cursor = "grab"
})

