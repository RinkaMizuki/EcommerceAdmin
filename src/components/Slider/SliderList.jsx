import { Title, ListBase } from "react-admin"
import { Box, useMediaQuery } from "@mui/material";
import SliderGrid from "./SliderGrid";


export const SliderList = () => {

  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"))

  return (
    <>
      <Title title="Sliders"></Title>
      <ListBase perPage={12} sort={{ field: 'stock', order: 'ASC' }} >
        <Box display="flex">
          <Box width={isSmall ? 'auto' : 'calc(100% - 16em)'}>
            <SliderGrid />
          </Box>
        </Box>
      </ListBase>
    </>
  )
}