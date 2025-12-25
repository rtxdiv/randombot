const authForm = document.querySelector('#authForm')
const passInp = document.querySelector('#passInp')
const error = document.querySelector('#error')

authForm.onsubmit = async function(event) {
    event.preventDefault()

    if (!passInp.value) {
        return error.textContent = 'Введите пароль'
    }

    const resp = await fetch('/auth/tryPassword', {
        method: 'post',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ password: passInp.value }),
        credentials: 'include',
        redirect: 'follow'
    })
    if (!resp.ok) {
        const errJson = await resp.json()
        error.textContent = errJson.message[0] || 'Ошибка сервера'
    }
    if (resp.redirected) {
        window.location.href = resp.url
    }
}

function clearError() {
    error.textContent = ''
}