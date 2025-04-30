import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// all movies data
export const getMovies = createAsyncThunk(
  "/movies",
  async(pageNum,{rejectWithValue})=>{
    try {
      const config= {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxM2VmMWM1YTc3NjUzNzEyMzU3OTVhMzNjZDY2YWY4MCIsIm5iZiI6MTc0NTM2MDA5NS40Mywic3ViIjoiNjgwODE0ZGYxNWExZDVhNjE0YWE5OGM5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.VWb6k0xb3Hgx6N5I3qEZZFCFs97i4C0IWzb1-9KC5Xg'
        }
                }
      const req = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageNum}`,config)
      const res = await req.json()
      return res
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)





// movie details
export const getOneMovieDetails= createAsyncThunk('/movies/movieId',async(id,{rejectWithValue})=>{
  try {
    const config = {
      method :'get',
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxM2VmMWM1YTc3NjUzNzEyMzU3OTVhMzNjZDY2YWY4MCIsIm5iZiI6MTc0NTM2MDA5NS40Mywic3ViIjoiNjgwODE0ZGYxNWExZDVhNjE0YWE5OGM5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.VWb6k0xb3Hgx6N5I3qEZZFCFs97i4C0IWzb1-9KC5Xg'


      }
    }
   const  req= await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`,config)
   const res = await req.json()
   return res
  } catch (err) {
    return rejectWithValue(err)
  }
})




// cast data 

export const getCastData = createAsyncThunk('/cast',async(i,{rejectWithValue})=>{
  try {
    const config = {
      method: 'get',
      headers:{
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxM2VmMWM1YTc3NjUzNzEyMzU3OTVhMzNjZDY2YWY4MCIsIm5iZiI6MTc0NTM2MDA5NS40Mywic3ViIjoiNjgwODE0ZGYxNWExZDVhNjE0YWE5OGM5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.VWb6k0xb3Hgx6N5I3qEZZFCFs97i4C0IWzb1-9KC5Xg'

      }

    }
    const req = await fetch(`https://api.themoviedb.org/3/movie/15184/credits?language=en-US`,config)
    const res = await req.json()
    return res
  } catch (err) {
    return rejectWithValue(err)
    
  }
})








const initialState = {
  movies : [] , 
  moviesLoading : true,
  errMsg : "" ,

  //movie details
  oneMovieDetails : [],
  oneMovieDetailsLoading: true,
  oneMovieErrMsg :'',

  //cast
  castData:[],
  castLoading:true,
  castErrMsg:''
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





// oneMovieDetails

})
builder.addCase(getOneMovieDetails.pending, (state)=>{
  state.oneMovieDetailsLoading = true
  console.log('hi');
  
  })
  builder.addCase(getOneMovieDetails.fulfilled, (state,action)=>{
    state.oneMovieDetailsLoading = false
  state.oneMovieDetails = action.payload
  console.log(state.oneMovieDetails,1);
  
  })
  builder.addCase(getOneMovieDetails.rejected, (state,action)=>{
    state.oneMovieDetailsLoading = false
    state.oneMovieErrMsg = action.error.message
    console.log(state.oneMovieErrMsg,2);
    
  
  })



  //cast
  builder.addCase(getCastData.pending, (state)=>{
    state.castLoading = true
    console.log('castL');
    
    })
    builder.addCase(getCastData.fulfilled, (state,action)=>{
      state.castLoading = false
    state.castData = action.payload
    console.log(state.castData,1);
    
    })
    builder.addCase(getCastData.rejected, (state,action)=>{
      state.castLoading = false
      state.castErrMsg= action.error.message
      console.log(state.castErrMsg,2);
      
    
    })
}
})
export const movies = moviesSlice.reducer
