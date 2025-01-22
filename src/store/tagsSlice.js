import { createSlice } from '@reduxjs/toolkit';

const tagsSlice = createSlice({
  name: 'tags',
  initialState: {
    tags: [
      { name: 'Web Design', count: 5 },
      { name: 'Mobile Development', count: 3 },
      { name: 'E-commerce', count: 4 },
      { name: 'UI/UX Design', count: 6 },
      { name: 'Responsive Design', count: 2 },
      { name: 'Branding', count: 3 },
      { name: 'User Experience', count: 7 },
    ],
  },
  reducers: {},
});

export const tagsActions = tagsSlice.actions;

export default tagsSlice;
