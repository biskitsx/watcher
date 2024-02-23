"use server"

const AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzg5YTZmNDhkYjU3ZWM5MjY1NmQxNTNmZDRlODI3MyIsInN1YiI6IjY1YzIyZjVmYWY4NWRlMDE4ODM3ZDQ1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i_GEMzg56Zq9xkfzcgR9GoH46DTEK4BrYifzR9a7K64'


export const getTrendingMovies = async (limit: number) => {
    try {
        const url = 'https://api.themoviedb.org/3/trending/all/day?language=en-US';
        const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: AUTH_TOKEN
        }
        };

        const res = await fetch(url, options);
        const json = await res.json();
        return json['results'].slice(0, limit);
        
      } catch (error) {
        console.error('error:', error);
      }
}

export const getUpcomingMovies = async (limit: number) => {
    try {
        // const url = 'https://api.themoviedb.org/3/trending/all/day?language=en-US';
        const url = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
        const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: AUTH_TOKEN
        }
        };

        const res = await fetch(url, options);
        const json = await res.json();
        return json['results'].slice(0, limit);
        
      } catch (error) {
        console.error('error:', error);
      }
}




