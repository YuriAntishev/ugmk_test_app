import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProducts, selectProductsList } from '../rs/slices/productsSlice';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { monthsNames, factories, productsNames } from '../helpers/helpers';
import {
  optimizeSum,
  factoryId,
  collection,
  preparedDataForChart,
  chooseTypeOfSum,
  resultSumByFactories,
  productsObj,
  sumPerMonth,
} from '../handlers/handlers';
import {
  StyledResponsiveContainer,
  SelectСontainer,
  StyledSelect,
  СenteredСontainerSelect,
  СenteredСontainerChart,
  COLORS,
} from '../styles';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const valueFromLocalStorage = localStorage.getItem('selectedValue');

  const [selectedProduct, setSelectedProduct] = useState(valueFromLocalStorage ? valueFromLocalStorage : '');

  

  console.log("selectedValue777", localStorage.getItem('selectedValue'));

  // localStorage.setItem('selectedValue', 'Tom');

  const products = useSelector(selectProductsList);

  const navigateHandler = (v) => {
    navigate(
      `/details/${factoryId(v?.tooltipPayload?.[0]?.dataKey, factories)}/${
        monthsNames.indexOf(v?.tooltipPayload?.[0]?.payload?.name) + 1
      }`
    );
  };

  const chartData = preparedDataForChart(
    resultSumByFactories(
      sumPerMonth(
        products,
        collection,
        monthsNames,
        optimizeSum,
        chooseTypeOfSum,
        selectedProduct
      ),
      optimizeSum
    ),
    factories
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('selectedValue', selectedProduct);
  }, [selectedProduct]);

  return (
    <>
      <СenteredСontainerSelect>
        <StyledResponsiveContainer width="80%" aspect={3}>
          <SelectСontainer>
            Фильтр по типу продукции
            <StyledSelect
              name="products"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              {Object.entries(productsObj(productsNames))?.map((c, id) => (
                <option key={id} value={c[1]}>
                  {c[0]}
                </option>
              ))}
            </StyledSelect>
          </SelectСontainer>
        </StyledResponsiveContainer>
      </СenteredСontainerSelect>

      <СenteredСontainerChart>
        <StyledResponsiveContainer width="80%" aspect={3}>
          <BarChart
            width={700}
            height={300}
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey={factories[0]}
              fill={COLORS[2]}
              onClick={navigateHandler}
            />
            <Bar
              dataKey={factories[1]}
              fill={COLORS[3]}
              onClick={navigateHandler}
            />
          </BarChart>
        </StyledResponsiveContainer>
      </СenteredСontainerChart>
    </>
  );
};

export default Home;
