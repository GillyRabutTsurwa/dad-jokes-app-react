import axios from "axios";
// TODO: research reduxjs/toolkit
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
  jokes: [],
};

// TODO: research createAsyncThunk()
export const fetchJokes = createAsyncThunk("jokes/fetchJokes", async () => {
  const response = await axios.get(`https://icanhazdadjoke.com/search`, {
    headers: {
      Accept: "application/json",
    },
  });

  const data = response.data;

  const rigolos = data.results.map((currentRigolo) => {
    return {
      ...currentRigolo,
      votes: 0,
    };
  });

  return rigolos;
});

// NOTE: code i want to execute on clicking vote button
const handleVote = (jokesArr, id, delta) => {
  const jokesWithVotes = jokesArr.map((currentJoke) => {
    return currentJoke.id === id ? { ...currentJoke, votes: currentJoke.votes + delta } : currentJoke;
  });
  return jokesWithVotes; // this return value will update our state via our vote reducer
};

// TODO: research createSlice()
const jokesSlice = createSlice({
  name: "jokes",
  initialState: initialState,
  reducers: {
    vote: (state = initialState, action) => {
      // NOTE: currentJoke is our jokeObject
      // but we needed to pass an extra parametre whilst keeping the payload usable
      // this is because the payload of a reducer can only be one parametre
      // so now payload is an object containing our joke object
      // and a delta number which is 1 or -1 (look @ Jokes.jsx)
      // to use them in our handle votes function, i am simply destructuring them from the action.payload object
      // and since currentJoke is a payload containing our joke (of which we need the id for the handleVote())...
      // ... we can destructure currentJoke once again to extract our id
      const { currentJoke, delta } = action.payload;
      const { id } = currentJoke;
      console.log(action.payload);
      console.log(id, delta);

      /**
       * IMPORTANTNOTE:
       * in Redux (unlike in Vuex), state is immutable
       * so to make modify the state, we return a copy of the original state (using the spread operator)
       * ... in addition to the data within the state, we'd like to modify
       *
       * so our state is an object
       * what we are doing is returning a new object
       * in which the loading and error properties will stay as is,
       * but it is the jokes property (which is our array of jokes) that will be modified
       *
       * this is how you modify state in React. Very different from Vuex.
       */
      return {
        ...state,
        jokes: handleVote(state.jokes, id, delta),
      };
    },
  },
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

export const { vote } = jokesSlice.actions;

export default jokesSlice.reducer;

// PASS: j'arrive à le faire enfin marcher
