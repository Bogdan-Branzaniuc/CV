import {
    successfulMessage
} from './contact-form.js'

function email() {
    const btn = document.getElementById('submit-message');

    document.getElementById('contact-form')
        .addEventListener('submit', function (event) {
            event.preventDefault();

            btn.value = 'Sending...';
            const serviceID = 'default_service';
            const templateID = 'template_ggj0q0g';
            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    btn.value = 'Send Email';
                    successfulMessage()
                }, (err) => {
                    btn.value = 'Send Email';
                    alert(JSON.stringify(err));
                });
        });
}

export {
    email
}