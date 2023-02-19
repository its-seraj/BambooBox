const form = document.querySelector('form');
form.addEventListener('submit', function (event) {
    // event.preventDefault();
    const file = event.target.file.files[0];
    Papa.parse(file, {
        complete: function (results) {
            console.log(results);
        }
    });
});
