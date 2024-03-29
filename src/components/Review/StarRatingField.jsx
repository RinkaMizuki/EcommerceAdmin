import { Box } from '@mui/material';
import Icon from '@mui/icons-material/Stars';

import { useRecordContext } from 'react-admin';

const StarRatingField = ({ size = 'large' }) => {
  const record = useRecordContext();
  if (!record) return null;
  return (
    <Box
      component="span"
      display="flex"
      sx={{
        opacity: 0.87,
        whiteSpace: 'nowrap',
      }}
    >
      {Array(record.star)
        .fill(true)
        .map((_, i) => (
          <Icon
            key={i}
            sx={{
              width: size === 'large' ? 20 : 15,
              height: size === 'large' ? 20 : 15,
            }}
          />
        ))}
    </Box>
  );
};

export default StarRatingField;