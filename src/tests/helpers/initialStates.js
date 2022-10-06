const INITIAL_STATE = {
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
        id: 0,
        value: '10',
        description: 'teste 1',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: {
          USD: {
            code: 'USD',
            name: 'Dólar Americano/Real Brasileiro',
            ask: '5.1971',
          },
          CAD: {
            code: 'CAD',
            name: 'Dólar Canadense/Real Brasileiro',
            ask: '3.82',
          },
          GBP: {
            code: 'GBP',
            name: 'Libra Esterlina/Real Brasileiro',
            ask: '5.8946',
          },
          ARS: {
            code: 'ARS',
            name: 'Peso Argentino/Real Brasileiro',
            ask: '0.0349',
          },
          BTC: {
            code: 'BTC',
            name: 'Bitcoin/Real Brasileiro',
            ask: '105.227',
          },
          LTC: {
            code: 'LTC',
            name: 'Litecoin/Real Brasileiro',
            ask: '284.83',
          },
          EUR: {
            code: 'EUR',
            name: 'Euro/Real Brasileiro',
            ask: '5.1456',
          },
          JPY: {
            code: 'JPY',
            name: 'Iene Japonês/Real Brasileiro',
            ask: '0.03598',
          },
          CHF: {
            code: 'CHF',
            name: 'Franco Suíço/Real Brasileiro',
            ask: '5.2929',
          },
          AUD: {
            code: 'AUD',
            name: 'Dólar Australiano/Real Brasileiro',
            ask: '3.3823',
          },
          CNY: {
            code: 'CNY',
            name: 'Yuan Chinês/Real Brasileiro',
            ask: '0.7303',
          },
          ILS: {
            code: 'ILS',
            name: 'Novo Shekel Israelense/Real Brasileiro',
            ask: '1.4729',
          },
          ETH: {
            code: 'ETH',
            name: 'Ethereum/Real Brasileiro',
            ask: '7.0613',
          },
          XRP: {
            code: 'XRP',
            name: 'XRP/Real Brasileiro',
            ask: '2.55',
          },
          DOGE: {
            code: 'DOGE',
            name: 'Dogecoin/Real Brasileiro',
            ask: '0.337281',
          },
        },
      },
    ],
    editor: false,
    idToEdit: '',
    error: '',
  },
};

const stateWithoutExpenses = {
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
    expenses: [],
    editor: false,
    idToEdit: '',
    error: '',
  },
};

export { INITIAL_STATE, stateWithoutExpenses };
