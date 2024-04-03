import { ImageInput, useRecordContext } from "react-admin";
import { SliderImageField } from "../Field/SliderImageField";
import { useState } from "react";


const SlideImageInput = () => {
  const [isChange, setIsChange] = useState(false)
  const record = useRecordContext()

  const handleAvatarChange = (e) => {
    setIsChange(true);
  }

  return (
    <>
      {isChange ? <ImageInput
        source="url"
        label="Slide Show"
        accept="image/png,image/svg+xml,image/jpg,image/jpeg"
        maxSize={300000} >
        <SliderImageField data={record} size="220" />
      </ImageInput> : <ImageInput
        source="url"
        label="Slide Show"
        accept="image/png,image/svg+xml,image/jpg,image/jpeg"
        onChange={handleAvatarChange} >
        <SliderImageField data={record} size="220" />
      </ImageInput>}
    </>
  )
};

export default SlideImageInput;
