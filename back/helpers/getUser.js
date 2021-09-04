
const getUser = (user, posts) => {
    if (!user) {
        return null;
    }
    const currentUser = {}
    currentUser.id = user.id
    currentUser.email = user.email
    currentUser.username = user.username || null
    currentUser.birthday = user.birthday || null
    currentUser.name = user.name || null
    currentUser.lastname = user.lastname || null
    currentUser.patronymic = user.patronymic || null
    currentUser.phone = user.phone || null
    currentUser.image = user.image || null
    currentUser.posts = posts?.filter(post => String(post.userId) === String(user.id))
    return currentUser;
}

module.exports = { getUser }
