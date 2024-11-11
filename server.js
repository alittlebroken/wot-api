const config = require('./src/config/config');
const app = require('./src/app');

const PORT = config.APP_PROT || 3005;

app.listen(PORT, (err) => {
    if(err){
        console.error(err);
    };

    console.log(`Server listening on port ${PORT}`);
})