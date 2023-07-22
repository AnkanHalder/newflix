import requests from "./requests";
import serverInstance from "./axios";

export default class apiCaller{
    constructor(){
    }
    static async searchById(id) {
        try {
          const response = await serverInstance.get(requests.searchById + id);
          return response.data; // Return the data from the response.
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error; // You might want to handle errors here or propagate them to the calling code.
        }
      }
    static async search(limit){
        try{
          const response = await serverInstance.get(requests.search + limit.toString());
          return response.data; // Return the data from the response.
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error; // You might want to handle errors here or propagate them to the calling code.
        }

      }
    static async searchByCatagory(cat){
        try{
          const response = await serverInstance.get(requests.searchByCatagory + cat);
          return response.data; // Return the data from the response.
        } catch (error) {
          console.error('Error fetching data:', error);
           // You might want to handle errors here or propagate them to the calling code.
        }

    }
    static async addToWatchList(_email, _vidData){
      try {
       const res = await serverInstance.post(requests.updateUserWatchList, {email:_email, data:_vidData});
       return res.data; // Return the data from the response.
      }catch (error) {
        console.error('Error adding to watchlist:', error);
        return false; // Return false to indicate failure.
      }
    }
    static async addToLikedVideos(_email, _vidData){
      try {
       const res = await serverInstance.post(requests.updateUserLikedVideos, {email:_email, data:_vidData});
       return res.data; // Return the data from the response.
      }catch (error) {
        console.error('Error adding to watchlist:', error);
        return false; // Return false to indicate failure.
      }
    }
    static async addToWatchedVideos(_email, _vidData,_percentWatched){
      try {
       const res = await serverInstance.post(requests.updateUserWatchedVideos, {email:_email, data:_vidData,percentWatched:_percentWatched});
       return res.data; // Return the data from the response.
      }catch (error) {
        console.error('Error adding to watchlist:', error);
        return false; // Return false to indicate failure.
      }
    }
    static async getUserDetails(email) {
      try {
        const response = await serverInstance.get(requests.getUserDetails + email);
        return response.data; // Return the data from the response.
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // You might want to handle errors here or propagate them to the calling code.
      }
    }
    static async getUserLikedVideos(email) {
      try {
        const response = await serverInstance.get(requests.getUserLikedVideos+email);
        return response.data; // Return the data from the response.
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // You might want to handle errors here or propagate them to the calling code.
      }
    } 
}