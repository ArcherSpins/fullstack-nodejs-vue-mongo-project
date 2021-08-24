export function checkEmail(email) {
    // eslint-disable-next-line
    return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)
}

export function checkPassword(password) {
    return password.length >= 6;
}