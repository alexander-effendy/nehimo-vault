import { CirclePicker, ColorResult } from 'react-color';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "@/store/store";
import styled from 'styled-components';
import { CategoryComponentProp, setCategories } from '../features/CategorySlice';

import { updateCategoryAPI } from '../api/CategoryAPI';

const StyledCirclePicker = styled(CirclePicker)`
  padding: 5px !important;
`;

const ColourPicker = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state: RootState) => state.category.selectedCategoryId);
  const selectedCategoryObject = useSelector((state: RootState) => state.category.selectedCategoryObject);

  const categories = useSelector((state: RootState) => state.category.categories);

  const updateCategoryColor = (categories: CategoryComponentProp[], selectedCategory: number, newColor: string) => {
    const updatedCategories = categories.map((category, _) => {
      if (category.id === selectedCategory) {
        return {
          ...category,
          colour: newColor,
        };
      }
      return category;
    });
    return updatedCategories;
  }

  const handleColorChange = async (newColor: ColorResult) => {
    if (!selectedCategory) return;
    // update redux
    const newCategories = updateCategoryColor(categories, selectedCategory, newColor.hex);
    dispatch(setCategories(newCategories));

    // update database from API
    await updateCategoryAPI({
      id: selectedCategoryObject?.id,
      colour: newColor.hex,
      name: selectedCategoryObject?.name,
      type: selectedCategoryObject?.type,
      icon: selectedCategoryObject?.icon,
    });
  };

  return (
    <div 
      className="z-300 bg-gray-800 absolute left-30 top-58 w-[262pxs] h-[140pxs] rounded-[10px] flex items-center justify-center p-1 border-[1px] border-gray-700"
      // style={{
      //   background: `linear-gradient(to bottom, #101010 100%)`,
      // }}
    >
      <StyledCirclePicker circleSize={15} circleSpacing={6} width={'200px'} onChangeComplete={handleColorChange} />
    </div>
  )
}

export default ColourPicker;