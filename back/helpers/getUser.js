
const getUser = (user) => {
    const currentUser = {}
    currentUser.id = user.id
    currentUser.email = user.email
    currentUser.username = user.username || null
    currentUser.birthday = user.birthday || null
    currentUser.name = user.name || null
    currentUser.lastname = user.lastname || null
    currentUser.patronymic = user.patronymic || null
    currentUser.phone = user.phone || null
    return currentUser;
}

module.exports = { getUser }
