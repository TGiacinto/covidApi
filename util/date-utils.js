const moment = require('moment-timezone');

module.exports = {

    yesterday(date){
        return  moment(date).subtract(1, 'd').toDate();
    },
    convertDate(date,timezone,format){

        if(!timezone) timezone ='Europe/Rome';
        if(!format) format = 'YYYY-MM-DD';

        return new Date(moment.utc(date).tz(timezone).format(format));
    }
}
