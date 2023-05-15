const mockData = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [
      'USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE',
    ],
    expenses: [
      {
        value: '10',
        currency: 'CAD',
        method: 'Cartão de crédito',
        tag: 'Lazer',
        description: 'Despesa de teste',
        id: 0,
        exchangeRates: {
          USD: {
            code: 'USD',
            codein: 'BRL',
            name: 'Dólar Americano/Real Brasileiro',
            high: '4.9317',
            low: '4.9007',
            varBid: '-0.0066',
            pctChange: '-0.14',
            bid: '4.9126',
            ask: '4.9131',
            timestamp: '1684172626',
            create_date: '2023-05-15 14:43:46',
          },
          USDT: {
            code: 'USD',
            codein: 'BRLT',
            name: 'Dólar Americano/Real Brasileiro Turismo',
            high: '4.95',
            low: '4.905',
            varBid: '-0.01',
            pctChange: '-0.2',
            bid: '4.79',
            ask: '5.08',
            timestamp: '1684172580',
            create_date: '2023-05-15 14:43:00',
          },
          CAD: {
            code: 'CAD',
            codein: 'BRL',
            name: 'Dólar Canadense/Real Brasileiro',
            high: '3.6539',
            low: '3.6274',
            varBid: '0.0159',
            pctChange: '0.44',
            bid: '3.6445',
            ask: '3.6499',
            timestamp: '1684172597',
            create_date: '2023-05-15 14:43:17',
          },
          GBP: {
            code: 'GBP',
            codein: 'BRL',
            name: 'Libra Esterlina/Real Brasileiro',
            high: '6.1712',
            low: '6.1248',
            varBid: '0.0241',
            pctChange: '0.39',
            bid: '6.1525',
            ask: '6.1563',
            timestamp: '1684172591',
            create_date: '2023-05-15 14:43:11',
          },
          ARS: {
            code: 'ARS',
            codein: 'BRL',
            name: 'Peso Argentino/Real Brasileiro',
            high: '0.0215',
            low: '0.0213',
            varBid: '-0.0002',
            pctChange: '-0.93',
            bid: '0.0213',
            ask: '0.0213',
            timestamp: '1684172591',
            create_date: '2023-05-15 14:43:11',
          },
          BTC: {
            code: 'BTC',
            codein: 'BRL',
            name: 'Bitcoin/Real Brasileiro',
            high: '136748',
            low: '133040',
            varBid: '2001',
            pctChange: '1.49',
            bid: '135743',
            ask: '135743',
            timestamp: '1684172588',
            create_date: '2023-05-15 14:43:08',
          },
          LTC: {
            code: 'LTC',
            codein: 'BRL',
            name: 'Litecoin/Real Brasileiro',
            high: '437.43',
            low: '408.62',
            varBid: '20.57',
            pctChange: '4.98',
            bid: '433.77',
            ask: '434.48',
            timestamp: '1684172593',
            create_date: '2023-05-15 14:43:13',
          },
          EUR: {
            code: 'EUR',
            codein: 'BRL',
            name: 'Euro/Real Brasileiro',
            high: '5.3653',
            low: '5.3307',
            varBid: '0.0053',
            pctChange: '0.1',
            bid: '5.3398',
            ask: '5.3478',
            timestamp: '1684172626',
            create_date: '2023-05-15 14:43:46',
          },
          JPY: {
            code: 'JPY',
            codein: 'BRL',
            name: 'Iene Japonês/Real Brasileiro',
            high: '0.03624',
            low: '0.03596',
            varBid: '0.0001',
            pctChange: '0.28',
            bid: '0.0361',
            ask: '0.03612',
            timestamp: '1684172606',
            create_date: '2023-05-15 14:43:26',
          },
          CHF: {
            code: 'CHF',
            codein: 'BRL',
            name: 'Franco Suíço/Real Brasileiro',
            high: '5.5054',
            low: '5.4687',
            varBid: '0.0152',
            pctChange: '0.28',
            bid: '5.4888',
            ask: '5.497',
            timestamp: '1684172621',
            create_date: '2023-05-15 14:43:41',
          },
          AUD: {
            code: 'AUD',
            codein: 'BRL',
            name: 'Dólar Australiano/Real Brasileiro',
            high: '3.2976',
            low: '3.2687',
            varBid: '0.0217',
            pctChange: '0.66',
            bid: '3.2899',
            ask: '3.2948',
            timestamp: '1684172591',
            create_date: '2023-05-15 14:43:11',
          },
          CNY: {
            code: 'CNY',
            codein: 'BRL',
            name: 'Yuan Chinês/Real Brasileiro',
            high: '0.7076',
            low: '0.7053',
            varBid: '-0.0007',
            pctChange: '-0.11',
            bid: '0.7065',
            ask: '0.7068',
            timestamp: '1684172582',
            create_date: '2023-05-15 14:43:02',
          },
          ILS: {
            code: 'ILS',
            codein: 'BRL',
            name: 'Novo Shekel Israelense/Real Brasileiro',
            high: '1.3452',
            low: '1.3393',
            varBid: '0.0028',
            pctChange: '0.21',
            bid: '1.3427',
            ask: '1.3432',
            timestamp: '1684172585',
            create_date: '2023-05-15 14:43:05',
          },
          ETH: {
            code: 'ETH',
            codein: 'BRL',
            name: 'Ethereum/Real Brasileiro',
            high: '9161.1',
            low: '8889.17',
            varBid: '132.11',
            pctChange: '1.47',
            bid: '9039.49',
            ask: '9076.11',
            timestamp: '1684172623',
            create_date: '2023-05-15 14:43:43',
          },
          XRP: {
            code: 'XRP',
            codein: 'BRL',
            name: 'XRP/Real Brasileiro',
            high: '2.14',
            low: '2.1',
            varBid: '0',
            pctChange: '-0.21',
            bid: '2.1',
            ask: '2.11',
            timestamp: '1684172592',
            create_date: '2023-05-15 14:43:12',
          },
          DOGE: {
            code: 'DOGE',
            codein: 'BRL',
            name: 'Dogecoin/Real Brasileiro',
            high: '0.36189',
            low: '0.3508',
            varBid: '0.00228',
            pctChange: '0.64',
            bid: '0.35753',
            ask: '0.35753',
            timestamp: '1684172579',
            create_date: '2023-05-15 14:42:59',
          },
        },
      },
    ],
    subtotals: {
      0: '36.50',
    },
    editor: false,
    idToEdit: 0,
  },
};

// const mockData = {
//   USD: {
//     code: 'USDd',
//     codein: 'BRL',
//     name: 'Dólar Americano/Real Brasileiro',
//     high: '4.7558',
//     low: '4.6908',
//     varBid: '0.0234',
//     pctChange: '0.49',
//     bid: '4.7526',
//     ask: '4.7531',
//     timestamp: '1653943661',
//     create_date: '2022-05-30 17:47:41',
//   },
//   USDT: {
//     code: 'USDd',
//     codein: 'BRLT',
//     name: 'Dólar Americano/Real Brasileiro Turismo',
//     high: '4.775',
//     low: '4.705',
//     varBid: '0.015',
//     pctChange: '0.32',
//     bid: '4.63',
//     ask: '4.92',
//     timestamp: '1653938040',
//     create_date: '2022-05-30 16:14:00',
//   },
//   CAD: {
//     code: 'CAD',
//     codein: 'BRL',
//     name: 'Dólar Canadense/Real Brasileiro',
//     high: '3.7575',
//     low: '3.699',
//     varBid: '0.0394',
//     pctChange: '1.06',
//     bid: '3.7552',
//     ask: '3.7559',
//     timestamp: '1653943661',
//     create_date: '2022-05-30 17:47:42',
//   },
//   EUR: {
//     code: 'EUR',
//     codein: 'BRL',
//     name: 'Euro/Real Brasileiro',
//     high: '5.1278',
//     low: '5.0451',
//     varBid: '0.0514',
//     pctChange: '1.01',
//     bid: '5.1225',
//     ask: '5.1268',
//     timestamp: '1653943663',
//     create_date: '2022-05-30 17:47:43',
//   },
//   GBP: {
//     code: 'GBP',
//     codein: 'BRL',
//     name: 'Libra Esterlina/Real Brasileiro',
//     high: '6.0195',
//     low: '5.9272',
//     varBid: '0.0485',
//     pctChange: '0.81',
//     bid: '6.013',
//     ask: '6.0174',
//     timestamp: '1653943664',
//     create_date: '2022-05-30 17:47:44',
//   },
//   ARS: {
//     code: 'ARS',
//     codein: 'BRL',
//     name: 'Peso Argentino/Real Brasileiro',
//     high: '0.0396',
//     low: '0.0391',
//     varBid: '0',
//     pctChange: '0',
//     bid: '0.0396',
//     ask: '0.0396',
//     timestamp: '1653943661',
//     create_date: '2022-05-30 17:47:45',
//   },
//   BTC: {
//     code: 'BTC',
//     codein: 'BRL',
//     name: 'Bitcoin/Real Brasileiro',
//     high: '147.253',
//     low: '137',
//     varBid: '8523',
//     pctChange: '6.14',
//     bid: '146.994',
//     ask: '147.235',
//     timestamp: '1653942059',
//     create_date: '2022-05-30 17:20:59',
//   },
//   LTC: {
//     code: 'LTC',
//     codein: 'BRL',
//     name: 'Litecoin/Real Brasileiro',
//     high: '321.9',
//     low: '299.02',
//     varBid: '21.5',
//     pctChange: '7.2',
//     bid: '320.89',
//     ask: '323.04',
//     timestamp: '1653942031',
//     create_date: '2022-05-30 17:20:31',
//   },
//   JPY: {
//     code: 'JPY',
//     codein: 'BRL',
//     name: 'Iene Japonês/Real Brasileiro',
//     high: '0.03729',
//     low: '0.03671',
//     varBid: '0',
//     pctChange: '0',
//     bid: '0.03725',
//     ask: '0.03727',
//     timestamp: '1653943661',
//     create_date: '2022-05-30 17:47:46',
//   },
//   CHF: {
//     code: 'CHF',
//     codein: 'BRL',
//     name: 'Franco Suíço/Real Brasileiro',
//     high: '4.9667',
//     low: '4.8847',
//     varBid: '0.0241',
//     pctChange: '0.49',
//     bid: '4.9641',
//     ask: '4.9651',
//     timestamp: '1653943661',
//     create_date: '2022-05-30 17:47:47',
//   },
//   AUD: {
//     code: 'AUD',
//     codein: 'BRL',
//     name: 'Dólar Australiano/Real Brasileiro',
//     high: '3.4232',
//     low: '3.3658',
//     varBid: '0.0448',
//     pctChange: '1.33',
//     bid: '3.4195',
//     ask: '3.4218',
//     timestamp: '1653943664',
//     create_date: '2022-05-30 17:47:44',
//   },
//   CNY: {
//     code: 'CNY',
//     codein: 'BRL',
//     name: 'Yuan Chinês/Real Brasileiro',
//     high: '0.714',
//     low: '0.7037',
//     varBid: '0.0072',
//     pctChange: '1.01',
//     bid: '0.7134',
//     ask: '0.7137',
//     timestamp: '1653943622',
//     create_date: '2022-05-30 17:47:02',
//   },
//   ILS: {
//     code: 'ILS',
//     codein: 'BRL',
//     name: 'Novo Shekel Israelense/Real Brasileiro',
//     high: '1.4274',
//     low: '1.4118',
//     varBid: '0.0102',
//     pctChange: '0.72',
//     bid: '1.4235',
//     ask: '1.4237',
//     timestamp: '1653943563',
//     create_date: '2022-05-30 17:46:03',
//   },
//   ETH: {
//     code: 'ETH',
//     codein: 'BRL',
//     name: 'Ethereum/Real Brasileiro',
//     high: '9.26732',
//     low: '6',
//     varBid: '697.24',
//     pctChange: '8.14',
//     bid: '9.22226',
//     ask: '9.2621',
//     timestamp: '1653942032',
//     create_date: '2022-05-30 17:20:32',
//   },
//   XRP: {
//     code: 'XRP',
//     codein: 'BRL',
//     name: 'XRP/Real Brasileiro',
//     high: '1.93',
//     low: '1.84',
//     varBid: '0.09',
//     pctChange: '4.73',
//     bid: '1.92',
//     ask: '1.93',
//     timestamp: '1653942033',
//     create_date: '2022-05-30 17:20:33',
//   },
//   DOGE: {
//     code: 'DOGE',
//     codein: 'BRL',
//     name: 'Dogecoin/Real Brasileiro',
//     high: '0.412416',
//     low: '0.388597',
//     varBid: '0.02336',
//     pctChange: '6.01',
//     bid: '0.412194',
//     ask: '0.412194',
//     timestamp: '1653943636',
//     create_date: '2022-05-30 17:47:16',
//   },
// };

export default mockData;
