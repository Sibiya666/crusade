const KEYS =  require('../keys');

module.exports = function(to, token) {
    return {
        to,
        from: 'sc2tvsibiya@gmail.com',
        subject: 'Reset password',
        html: `
            <p>If you dont reset pasword, ignored this email.</p>
            <a href="${KEYS.BASE_URL}login/reset/${token}">Reset password.</a>
        `
    }
}