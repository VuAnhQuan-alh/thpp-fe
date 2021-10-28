import { EXP_MINUTE } from 'constants/configConstants';
import { List } from 'interfaces';

export const convertToFormSelect = (
  list: List<any> | any = [],
  fieldForLabel: string | number | undefined = undefined,
  fieldForValue: string | number | undefined = undefined,
  noneOption: boolean | undefined = false,
) => {
  if (!fieldForLabel || !fieldForValue) {
    return [
      ...list.reduce((arr: any, el: any) => {
        return [...arr, { label: el, value: el }];
      }, []),
    ];
  }
  if (typeof list === 'object' && list) {
    const listReturn = [
      ...list.reduce((arr: any, el: any) => {
        return [
          ...arr,
          {
            ...el,
            label: el[fieldForLabel] ?? 'None',
            value: el[fieldForValue] ?? '',
          },
        ];
      }, []),
    ];

    if (noneOption) {
      return [{ label: 'None', value: '' }, ...listReturn];
    }
    return listReturn;
  }
  return [{ label: 'None', value: '' }, ...list];
};

export const convertNumberToMoney = (amount: string, locale: string = 'vi', currency: string = 'vnd') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  }).format(parseInt(amount));
}

export const queryParamsToJsonObject = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlParams);
  return params;
}

export const getExpDate = (): Date => {
  let now = new Date();
  return new Date(now.getTime() + (EXP_MINUTE * 60 * 1000));
}

/**
  match:
    http://www.foufos.gr
    https://www.foufos.gr
    http://foufos.gr
    http://www.foufos.gr/kino
    http://werer.gr
    www.foufos.gr
    www.mp3.com
    www.t.co
    http://t.co
    http://www.t.co
    https://www.t.co
    www.aa.com
    http://aa.com
    http://www.aa.com
    https://www.aa.com

  NOT match:
    www.foufos
    www.foufos-.gr
    www.-foufos.gr
    foufos.gr
    http://www.foufos
    http://foufos
    www.mp3#.com
 * 
 */


export const validateURL = (url: string) => {
  var expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
  return expression.test(url);
}

export const toCallbackQueryParams = (vnp_ResponseCode: string, transactionId: string = '', description: string = '') => {
  const params = {
    "vnp_ResponseCode": vnp_ResponseCode,
    "transactionId": transactionId,
    "description": description
  };

  return new URLSearchParams(params).toString();
}