import * as React from 'react';
import { Card, CardContent } from '@mui/material';
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

const Aside = () => {
  const { data } = useGetList('categories');

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