const sendgrid = require('sendgrid-email')

const apikey = process.env.SENDGRID_API_KEY

const email = async function() {

    sendgrid.configure({
        apiKey: apikey
    });

    let to = { email: 'alt.tw-3oi6rwvz@yopmail.com', name: 'Andrew Kate' };
    let from = { email: 'serajkhan@bamboobox.ai', name: 'Jill Smith '};
    let subject = 'Hello there!';
    let text = 'Sent with sendgrid!';

    await sendgrid.send({ to, from, subject, text });
};

// email();

const welcome = (email, name) => {
    sendgrid.configure({apiKey: apikey})
    sendgrid.send({
        to: email,
        from: 'serajkhan@bamboobox.ai',
        subject: 'Thanks for joining our Team',
        text: `Hey ${name}, We are very happy for you. Thanks for joining our team.`
    })
}
module.exports = welcome