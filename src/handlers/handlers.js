import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const optimizeSum = (value) => (value ? value : 0);

export const productsObj = (productsNames) => ({
  [productsNames[2]]: '',
  [productsNames[0]]: 'product1',
  [productsNames[1]]: 'product2',
});

export const factoryId = (key, factories) => {
  switch (key) {
    case factories[0]:
      return 1;
    case factories[1]:
      return 2;
    default:
      return null;
  }
};

export const preparedDataForChart = (arr, factories) =>
  arr?.map(({ factory1: value1, factory2: value2, ...rest }) => ({
    [factories[0]]: value1,
    [factories[1]]: value2,
    ...rest,
  }));

export const chooseTypeOfSum = (key, arg1, arg2) => {
  switch (key) {
    case '':
      return arg1 + arg2;
    case 'product1':
      return arg1;

    case 'product2':
      return arg2;

    default:
      return null;
  }
};

export const sumPerMonth = (
  arr,
  collection,
  monthsNames,
  optimizeSum,
  chooseTypeOfSum,
  selectedProduct,
) =>
  collection(arr)?.reduce((acc, cur) => {
    acc.push({
      name: monthsNames[cur.date],
      [`factory${cur.factory_id}`]: chooseTypeOfSum(
        selectedProduct,
        optimizeSum(cur.product1),
        optimizeSum(cur.product2)
      ),
    });
    return acc;
  }, []);

export const resultSumByFactories = (arr, optimizeSum) =>
  arr &&
  Object.values(
    arr?.reduce((acc, { name, factory1, factory2 }) => {
      acc[name] = {
        name,
        factory1: (acc[name] ? acc[name].factory1 : 0) + optimizeSum(factory1),
        factory2: (acc[name] ? acc[name].factory2 : 0) + optimizeSum(factory2),
      };
      return acc;
    }, {})
  );

export const collection = (arr) =>
  arr
    ?.filter(({ date, product1, product2 }) => date || product1 || product2)
    ?.map((x) => ({
      ...x,
      date: x.date && dayjs(x.date, 'D/M/YYYY').get('month'),
    }))
    .sort((a, b) => parseFloat(a.date) - parseFloat(b.date));

export const sum = (inputs, factoryId, monthNumber) => {
  const result = {};
  inputs
    ?.filter(({ factory_id }) => factory_id === factoryId)
    ?.forEach((input) => {
      const key = `${input.date}`;
      if (key in result) {
        result[key].product1 += input.product1;
        result[key].product2 += input.product2;
      } else {
        result[key] = { ...input };
      }
    });
  return Object.values(result)?.filter(({ date }) => date === monthNumber - 1);
};

export const dataPieChart = (obj, productsNames) =>
  Object.keys(obj)?.reduce((acc, key) => {
    if (key === 'product1') {
      acc.push({
        name: productsNames[0],
        value: obj[key],
      });
    }
    if (key === 'product2') {
      acc.push({
        name: productsNames[1],
        value: obj[key],
      });
    }
    return acc;
  }, []);
