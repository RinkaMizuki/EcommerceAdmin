import { Avatar } from '@mui/material';
import { useRecordContext } from 'react-admin';

export const ProductPhotoField = ({ size = '35', sx, isPreview = false }) => {
  const record = useRecordContext();
  if (!record) return null;
  return (
    <>
      <Avatar
        src={!isPreview ? record?.src || record : record.url || record.src}
        style={{ width: parseInt(size, 10), height: parseInt(size, 10), borderRadius: "0" }}
        sx={sx}
        alt={!isPreview ? record : record.image}
      />
    </>
  )
};