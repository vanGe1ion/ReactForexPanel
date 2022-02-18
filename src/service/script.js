import axios from 'axios'

export async function Fetch(get, callback) {
    try{
      const response = await axios.get(get)
      callback(response.data);
    }catch(e){
      alert(e)
    }
  }