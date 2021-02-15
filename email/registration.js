module.exports = function(to) {
    return {
        to,
        from: 'sc2tvsibiya@gmail.com',
        subject: 'Тема письма',
        text: 'SomeText',
        html: `
            <h1> Accaunt created </h1>
        `,
    }
}