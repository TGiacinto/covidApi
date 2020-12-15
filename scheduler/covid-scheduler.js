const cron = require('node-cron');
const {workData} = require('../service/covid.service')

module.exports = {
    //https://crontab.cronhub.io/
    scheduleData() {
        cron.schedule('0 18 * * *', async () => {
            await workData();
            console.log('Dati caricati correttamente');
        });
        console.log("Scheduler configurato correttamente");
    }
};
