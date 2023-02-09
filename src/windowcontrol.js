const { ipcRenderer} = require('electron')
const maximizeBtn = document.getElementById('maximizeBtn');

const ipc = ipcRenderer


function changeMaxmizebtn(isMaximizedApp)
{
    if(isMaximizedApp)
    {
        maximizeBtn.title = 'Restore'
        maximizeBtn.children[0].children[1].classList.add("hidden");
        maximizeBtn.children[0].children[2].classList.remove("hidden");
    }
    else
    {
        maximizeBtn.title = 'Maximize'
        maximizeBtn.children[0].children[1].classList.remove("hidden");
        maximizeBtn.children[0].children[2].classList.add("hidden");
    }
}

ipc.on('isMaximized', ()=>{ changeMaxmizebtn(true)})

ipc.on('isRestored', ()=>{ changeMaxmizebtn(false)})

closeBtn.addEventListener('click', ()=>{ipc.send('closeApp')})

minimizeBtn.addEventListener('click', ()=>{ipc.send('minimizeApp')})

maximizeBtn.addEventListener('click', ()=>{ipc.send('maximizeApp')})