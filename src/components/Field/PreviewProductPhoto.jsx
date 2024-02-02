import { useState } from "react"
import { ImageField, ImageInput, useRecordContext } from "react-admin";
import { ProductPhotoField } from "./ProductPhotoField";

const PreviewProductPhoto = () => {
  const [isChanage, setIsChange] = useState(false)
  const record = useRecordContext()
  const handleAvatarChange = (e) => {
    setIsChange(true);
  }

  return (
    <>
      {isChanage ? <ImageInput
        source="productImages"
        label="Photos"
        accept="image/png,image/svg+xml,image/jpg,image/jpeg"
        maxSize={300000}
        multiple
        sx={{
          "& .previews": {
            display: "flex",
            flexWrap: "wrap",
            gap: "30px",
          }
        }}
      >
        <>
          <ProductPhotoField data={record.productImages} size="220" isPreview={true} />
        </>
      </ImageInput > : <ImageInput
        source="productImages"
        label="Photos"
        accept="image/png,image/svg+xml,image/jpg,image/jpeg"
        onChange={handleAvatarChange}
        multiple
        sx={{
          "& .previews": {
            display: "flex",
            gap: "20px"
          }
        }}
      >
        <ProductPhotoField data={record.productImages} size="220" isPreview={true} />
      </ImageInput>
      }
    </>
  )
};

export default PreviewProductPhoto;
