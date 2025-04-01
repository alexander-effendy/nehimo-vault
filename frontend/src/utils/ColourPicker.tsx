import { CirclePicker, ColorResult } from 'react-color';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "@/store/store";
import styled from 'styled-components';
import { CategoryComponentProp, setCategories } from '../features/category/CategorySlice';

const StyledCirclePicker = styled(CirclePicker)`
  width: 100% !important;
  height: 100% !important;
  display: flex !important;
`;

const ColourPicker = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state: RootState) => state.category.selectedCategoryId);
  const categories = useSelector((state: RootState) => state.category.categories);

  const updateCategoryColor = (categories: CategoryComponentProp[], selectedCategory: number, newColor: string) => {
    const updatedCategories = categories.map((category, index) => {
      if (selectedCategory - 1 === index) {
        return {
          ...category,
          colour: newColor,
        };
      }
      return category;
    });
    console.log(newColor)
    return updatedCategories;
  }

  const handleColorChange = (newColor: ColorResult) => {
    if (!selectedCategory) return;
    // call the api
    console.log('selected category id is: ' + selectedCategory);
    console.log('so we should change the category component this:');
    const newCategories = updateCategoryColor(categories, selectedCategory, newColor.hex);
    console.log(newCategories);
    dispatch(setCategories(newCategories));
  }

  return (
    <div 
      className="z-300 absolute left-37 top-59 w-[262px] h-[140px] rounded-[10px] flex items-center justify-center p-1 border-[1px] border-gray-700"
      style={{ 
        background: `linear-gradient(to bottom, #636363 20%, #101010 100%)`,
      }}
    >
      <StyledCirclePicker onChangeComplete={handleColorChange} />
    </div>
  )
}

export default ColourPicker;