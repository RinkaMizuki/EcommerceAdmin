import { useState } from "react"
import { ImageField, ImageInput, useRecordContext } from "react-admin";
import { ProductPhotoField } from "./ProductPhotoField";

const ThumbnailProductInput = () => {
  const [isChanage, setIsChange] = useState(false)
  const record = useRecordContext()

  const handleAvatarChange = (e) => {
    setIsChange(true);
  }

  return (
    <>
      {isChanage ? <ImageInput
        source="url"
        label="Thumbnail"
        accept="image/png,image/svg+xml,image/jpg,image/jpeg"
        maxSize={300000} >
        <ProductPhotoField data={record} size="220" />
      </ImageInput> : <ImageInput
        source="url"
        label="Thumbnail"
        accept="image/png,image/svg+xml,image/jpg,image/jpeg"
        onChange={handleAvatarChange} >
        <ProductPhotoField data={record} size="220" />
      </ImageInput>}
    </>
  )
};

export default ThumbnailProductInput;
