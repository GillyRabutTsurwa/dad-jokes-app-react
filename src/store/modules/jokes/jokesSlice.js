import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
  jokes: [],
};

export const fetchJokes = createAsyncThunk("FETCH_JOKES", async () => {
  const response = await axios.get(`https://icanhazdadjoke.com/search`, {
    headers: {
      Accept: "application/json",
    },
  });

  console.log(response);
  const data = response.data;

  const rigolos = data.results.map((currentRigolo) => {
    return {
      ...currentRigolo,
      votes: 0,
    };
  });

  return rigolos;
});

const jokesSlice = createSlice({
  name: "jokes",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchJokes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchJokes.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.jokes = action.payload;
    });
    builder.addCase(fetchJokes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.jokes = [];
    });
  },
});

export default jokesSlice.reducer;
