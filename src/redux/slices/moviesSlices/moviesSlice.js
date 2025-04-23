import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getMovies = createAsyncThunk(
  "/movies",
  async(i,{rejectWithValue})=>{
    try {
      const config= {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxM2VmMWM1YTc3NjUzNzEyMzU3OTVhMzNjZDY2YWY4MCIsIm5iZiI6MTc0NTM2MDA5NS40Mywic3ViIjoiNjgwODE0ZGYxNWExZDVhNjE0YWE5OGM5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.VWb6k0xb3Hgx6N5I3qEZZFCFs97i4C0IWzb1-9KC5Xg'
        }
                }
      const req = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',config)
      const res = await req.json()
      return res
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)
const initialState = {
  movies : [] , 
  moviesLoading : true,
  errMsg : "" 
}


const moviesSlice = createSlice({
name: "movies",
initialState ,
extraReducers : (builder)=>{
builder.addCase(getMovies.pending, (state)=>{
state.moviesLoading = true
console.log(state.moviesLoading);
},

)
builder.addCase(getMovies.fulfilled, (state,action)=>{
  state.moviesLoading = false
  state.movies = action.payload.results
  console.log(state.movies);
  
})
builder.addCase(getMovies.rejected, (state,action)=>{
state.moviesLoading = false
state.errMsg = action.error.message
console.log(state.errMsg);

})
}
})
export const movies = moviesSlice.reducer
