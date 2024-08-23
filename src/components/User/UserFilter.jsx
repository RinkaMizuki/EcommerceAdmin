import {
  SavedQueriesList,
  FilterLiveSearch,
  FilterList,
  FilterListItem,
} from "react-admin";
import { Card, CardContent } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import CategoryIcon from "@mui/icons-material/LocalOffer";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";

export const UserFilterSidebar = () => {
  const isSelected = (value, filters) => {
    const segments = filters.segments || [];
    return segments.includes(value.segment);
  };

  const toggleFilter = (value, filters) => {
    const segments = filters.segments || [];
    return {
      ...filters,
      segments: segments.includes(value.segment)
        ? segments.filter((s) => s !== value.segment)
        : [...segments, value.segment],
    };
  };

  return (
    <Card sx={{ order: -1, mr: 2, mt: 6, width: 220 }}>
      <CardContent>
        <SavedQueriesList />
        <FilterLiveSearch />
        <FilterList label="Ban" icon={<BlockIcon />}>
          <FilterListItem
            label="Yes"
            value={{ isActive: true }}
          ></FilterListItem>
          <FilterListItem
            label="No"
            value={{ isActive: false }}
          ></FilterListItem>
        </FilterList>

        <FilterList label="Verify email" icon={<MarkEmailReadIcon />}>
          <FilterListItem
            label="Verified"
            value={{ isVerify: true }}
          ></FilterListItem>
          <FilterListItem
            label="Unverified"
            value={{ isVerify: false }}
          ></FilterListItem>
        </FilterList>

        <FilterList label="Segments" icon={<CategoryIcon />}>
          <FilterListItem
            label="Review"
            value={{ segment: "review" }}
            isSelected={isSelected}
            toggleFilter={toggleFilter}
          />
          <FilterListItem
            label="Contact"
            value={{ segment: "contact" }}
            isSelected={isSelected}
            toggleFilter={toggleFilter}
          />
          <FilterListItem
            label="Order"
            value={{ segment: "order" }}
            isSelected={isSelected}
            toggleFilter={toggleFilter}
          />
        </FilterList>
      </CardContent>
    </Card>
  );
};
