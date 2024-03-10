import {  TVDB_TOKEN } from "@/data/baseUrl";

export const getTVDB = async (path: string, limit: number) => {
    try {
        const url = `https://api4.thetvdb.com/v4/${path}`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: TVDB_TOKEN
            }
        };
    
        const res = await fetch(url, options);
        const json = await res.json();
        return json;
        
      } catch (error) {
        console.error('error:', error);
      }
    
}