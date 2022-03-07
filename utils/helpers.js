// const moment = require('moment');

module.exports = {
    format_date: date => {
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }
    // timeAgo: (time) => {
    //     return moment(time).startOf('hour').fromNow();
        // return moment(time).calendar();
    // },
    // calendar: (time) => {
    //     return moment(time).calendar();
    // },
    // march: (time) => {
    //     return moment(time).format('L');
    // }
};