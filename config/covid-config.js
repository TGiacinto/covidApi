const {connect} = require('../service/db.service');
const {scheduleData} = require('../scheduler/covid-scheduler');

module.exports = {

    config() {
        connect();
        scheduleData();
    },
};
