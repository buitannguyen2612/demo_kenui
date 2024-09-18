function createCookie(name: string, value: string, days: any) {
    let expires
    if (days) {
        let date: any = new Date()
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
        expires = ';expires=' + date.toGMTString()
    } else expires = ''
    document.cookie = name + '=' + value + expires + '; path=/'
}


function readCookie(name: string) {
    if (typeof document === 'undefined') return null
    let nameEQ = name + '='
    let ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) === ' ') c = c.substring(1, c.length)
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length)
        }
    }
    return null
}

function clearCookie(name: string) {
    createCookie(name, '', -1)
}

function parseToken(token: string) {
    return token ? JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()) : ''
}

function parseDiffDay(timestamp: number) {
    let expiresMilisecond = timestamp * 1000
    const expiresDate = new Date(expiresMilisecond)
    return expiresDate.toUTCString()
}



export { readCookie, createCookie, clearCookie, parseDiffDay }