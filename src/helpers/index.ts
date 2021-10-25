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