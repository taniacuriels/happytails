import {createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
    firstTimeInstallation: boolean;
}

const initialState: AppState = {
    firstTimeInstallation: true,

};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setFirstTimeInstallation: (state, action: PayloadAction<boolean>) => {
            console.log('setFirstTimeInstallation slice');
            state.firstTimeInstallation = action.payload;
        },
    },
});

export const { setFirstTimeInstallation } = appSlice.actions;
export default appSlice.reducer;
