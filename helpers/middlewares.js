
function checkFieldsPost(req, res, next) {
    const { firstName, lastName } = req.body
    if (firstName && lastName) {
        next()
    } else {
        res.status(400).json({ message: 'fields are not good' })
    }
}
module.exports = {
    checkFieldsPost
}