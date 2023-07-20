const { createSlice } = require("@reduxjs/toolkit");

const flagSlice = createSlice({
    name: "flag",
    initialState: { flag: false, textData: [] },
    reducers: {
        flagTrue(state, action)
        {
            const { payload } = action;
            return { flag: true, textData: [...state.textData, payload] };
        },
        flagFalse(state, action)
        {

            return { flag: false };
        },
    },
});

export const { flagTrue, flagFalse } = flagSlice.actions;
export default flagSlice.reducer;
