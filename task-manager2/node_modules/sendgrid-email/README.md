# sendgrid-email
Send email with SendGrid.

## Install
```sh
$ npm install sendgrid-email
```

## Usage
```javascript
const sendgrid = require('sendgrid-email');

(async function() {

    sendgrid.configure({
        apiKey: 'your-sendgrid-api-key'
    });

    let to = { email: 'jack@example.com', name: 'Jack Smith' };
    let from = { email: 'jill@example.com', name: 'Jill Smith '};
    let subject = 'Hello there!';
    let text = 'Sent with sendgrid!';

    await sendgrid.send({ to, from, subject, text });
})();
```

## License
MIT license; see [LICENSE](./LICENSE).
