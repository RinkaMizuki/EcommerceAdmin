import { Box, Card, CardContent, Slider } from '@mui/material';
import {
  FilterList,
  FilterListItem,
  FilterLiveSearch,
  SavedQueriesList,
  useGetList,
} from 'react-admin';
import LocalOfferIcon from '@mui/icons-material/LocalOfferOutlined';
import BarChartIcon from '@mui/icons-material/BarChart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useState } from 'react';

const minDistance = 10;
let priceDistance = 1000000;

const Aside = () => {

  const [value, setValue] = useState([0, 100]);
  const [price, setPrice] = useState({
    priceLeft: value[0] * priceDistance,
    priceRight: value[1] * priceDistance,
  })

  const { data } = useGetList('categories', {
    filter: { all_category: true }
  });

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue([clamped, clamped + minDistance]);
        setPrice({
          priceLeft: clamped * priceDistance,
          priceRight: (clamped + minDistance) * priceDistance,
        })
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);
        setPrice({
          priceLeft: (clamped - minDistance) * priceDistance,
          priceRight: clamped * priceDistance,
        })
      }
    } else {
      setPrice({
        priceLeft: newValue[0] * priceDistance,
        priceRight: newValue[1] * priceDistance,
      })
      setValue(newValue);
    }
  };

  return (
    <Card sx={{ order: -1, mr: 2, width: 220 }}>
      <CardContent>
        <SavedQueriesList />
        <FilterLiveSearch />
        <FilterList
          label="Sales"
          icon={<AttachMoneyIcon />}
        >
          <FilterListItem
            label="Hot"
            value={{ sale: "hot" }}
          >
          </FilterListItem>
          <FilterListItem
            label="Flash sale"
            value={{ sale: "flashSale" }}
          >
          </FilterListItem>
          <FilterListItem
            label="Up coming"
            value={{ sale: "upComing" }}
          />
          <FilterListItem
            label="Price"
            value={{
              priceRange: [price.priceLeft, price.priceRight]
            }}
          />
          <Slider
            getAriaLabel={() => 'Minimum distance shift'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            disableSwap
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              "> span": {
                fontSize: "14px"
              },
              justifyContent: "space-between"
            }}
          >
            <span>{price.priceLeft.toLocaleString('it-IT', { style: 'decimal', currency: 'VND' })}đ</span>
            <span> - </span>
            <span>{price.priceRight.toLocaleString('it-IT', { style: 'decimal', currency: 'VND' })}đ</span>
          </Box>
        </FilterList>
        <FilterList
          icon={<BarChartIcon />}
          label="Stock"
        >
          <FilterListItem
            label="Out of stock"
            value={{ stockRange: [0, 0] }}
          />
          <FilterListItem
            label="1 - 9 items"
            value={{ stockRange: [1, 9] }}
          />
          <FilterListItem
            label="10 - 49 items"
            value={{ stockRange: [10, 49] }}
          />
          <FilterListItem
            label="50 items & more"
            value={{ stockRange: [50, -50] }}
          />
        </FilterList>
        <FilterList
          icon={<LocalOfferIcon />}
          label="Categories"
        >
          {data?.map(cate => (
            <FilterListItem
              key={cate.id}
              label={cate.title}
              value={{ category: cate.id }}
            />
          ))}
        </FilterList>
      </CardContent>
    </Card>
  );
};

export default Aside;