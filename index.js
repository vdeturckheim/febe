'use stirct';
const app = require('./lib/app').app;

const PORT = process.env.PORT || 8080;
app.listen(PORT, (err) => {

    if (err) {
        throw err;
    }
    console.log(`Application listening on port ${PORT}`);
});
