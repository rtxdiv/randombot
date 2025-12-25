const botStatus = document.querySelector('#botStatus')
const addInp = document.querySelector('#addInp')
const cloneRow = document.querySelector('#cloneRow')
const list = document.querySelector('#list')
const error = document.querySelector('#error')

renderAdmins()
renderBotState()

let isBotActive

const botStatucAction = () => {
    isBotActive? stopBot() : startBot()
}

async function renderAdmins() {
    error.textContent = ''
    const resp = await fetch('/panel/getAdmins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })

    if (resp.redirected) {
        return window.location.href = resp.url
    }

    if (resp.ok) {
        const body = await resp.json()
        const admins = body.admins

        if (!admins || admins.length == 0) {
            list.style.display = 'none'

        } else {
            list.innerHTML = ''
            admins.forEach(elem => {
                const row = cloneRow.cloneNode(true)
                row.querySelector('.username').textContent = elem.username
                list.appendChild(row)
            })
            list.style.display = 'flex'
        }

    } else {
        alert('Возникла ошибка сервера при загрузке списка администраторов')
    }
}
async function renderBotState() {
    const resp = await fetch('/panel/getBotState', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })

    if (resp.redirected) {
        return window.location.href = resp.url
    }

    if (resp.ok) {
        const body = await resp.json()
        isBotActive = body.state

        if (isBotActive) {
            botStatus.classList.add('active')
        } else {
            botStatus.classList.remove('active')
        }

    } else {
        alert('Возникла ошибка сервера при загрузке состояния бота')
    }
}

const startBot = async () => {
    const resp = await fetch('/panel/startBot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })

    if (resp.redirected) {
        return window.location.href = resp.url
    }

    if (resp.ok) {
        await renderBotState()

    } else {
        const body = await resp.json()
        alert(resp.status==400? body.message[0] : 'Ошибка сервера')
        await renderBotState()
    }
}
const stopBot = async () => {
    const resp = await fetch('/panel/stopBot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })

    if (resp.redirected) {
        return window.location.href = resp.url
    }

    if (resp.ok) {
        await renderBotState()

    } else {
        const body = await resp.json()
        alert(resp.status==400? body.message[0] : 'Ошибка сервера')
        await renderBotState()
    }
}

async function addAdmin() {
    if (addInp.value) {
        const resp = await fetch('/panel/addAdmin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: addInp.value.trim() })
        })

        if (resp.redirected) {
            return window.location.href = resp.url
        }

        if (resp.ok) {
            addInp.value = ''
            await renderAdmins()

        } else {
            const body = await resp.json()
            error.textContent = resp.status==400? body.message[0] : 'Ошибка сервера'
        }
    }
}
async function deleteAdmin(elem) {
    const username = elem.parentNode.querySelector('.username').textContent
    if (username) {
        const resp = await fetch('/panel/deleteAdmin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username })
        })

        if (resp.redirected) {
            return window.location.href = resp.url
        }

        if (resp.ok) {
            await renderAdmins()

        } else {
            const body = await resp.json()
            error.textContent = resp.status==400? body.message[0] : 'Ошибка сервера'
        }
    }
}