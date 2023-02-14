const fetch = require('fetchout');

let bearerToken = null;

function configure(options) {
    bearerToken = options.apiKey;
}

async function send(email) {

    let { to, from, subject, text } = email;

    let payload = {
        personalizations: [ { to: [ { email: to.email, name: to.name } ] } ],
        subject: subject,
        content: [ { type: 'text/plain', value: text } ],
        from: { email: from.email, name: from.name }
    };

    let response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    let content = await response.text();

    if (response.status !== 202) {
        throw new Error(`failed to send email, status: ${response.status} body: ${content}`);
    }
}

exports.configure = configure;
exports.send = send;
