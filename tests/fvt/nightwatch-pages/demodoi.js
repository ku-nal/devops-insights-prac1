
module.exports = {
  url: process.env.APP_URL,
  elements: {
    inputText: {
        selector: 'input[type=text]'
    },
    table: {
        selector: '.table-info.table-hover'
    },
    cityNotFound: {
        selector: '.col-sm-8 .text-danger'
    },
    invalidCity: {
        selector: '.pl-3.row .text-danger'
    }
  },
  sections: {
    cityName: {
        selector: '.table-info.table-hover',
        elements: {
        firstApp: 'tbody > tr:nth-child(1) > td:nth-child(2)'
        }
    }
  }
};
