const {saveData, getByRegion, getByProvince, getLastRecord, collections} = require('../service/db.service')
const {doCall} = require('../http/http-client');
const {yesterday, convertDate} = require('../util/date-utils')

module.exports = {
    async workData() {
        console.log("Start update data")

        let province = await doCall('GET', process.env.URL_PROVINCE);
        let regioni = await doCall('GET', process.env.URL_REGIONI);

        province.map(rs => rs.data = convertDate(rs.data));
        regioni.map(rs => rs.data = convertDate(rs.data));
        console.log("Provinces: ", province.length);
        console.log("Regions: ", regioni.length);
        await saveData(province, regioni);
        console.log("Provinces and regions saved");
    },
    async getDataProvince(province) {
        const result = await getLastRecord(collections.PROVINCES, {
            denominazione_provincia: province
        });

        console.log('############### Result PROVINCES ###############', result);

        const lastRecord = result[0];
        lastRecord.data = yesterday(lastRecord.data);

        const dataProvinceYesterday = await getByProvince({
            data: lastRecord.data,
            denominazione_provincia: province
        });
        return {
            cases_daily: dataProvinceYesterday.totale_casi - lastRecord.totale_casi,
            total_case: lastRecord.totale_casi,
            province: province
        }
    },
    async getDataRegion(region) {
        const result = await getLastRecord(collections.REGIONS, {
            denominazione_regione: region
        });


        console.log('############### Result REGIONS ###############', result);
        const lastRecord = result[0];
        lastRecord.data = yesterday(lastRecord.data);

        const dataRegionYesterday = await getByRegion({
            data: lastRecord.data,
            denominazione_regione: region
        })

        return {
            new_positive: lastRecord.nuovi_positivi,
            healed: (lastRecord.dimessi_guariti - dataRegionYesterday.dimessi_guariti),
            intensive_care: lastRecord.terapia_intensiva,
            positive_variation: lastRecord.variazione_totale_positivi
        }

    }
};
