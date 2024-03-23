import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchUsers = createAsyncThunk('users/fetch', async ()=>{    //base type:users/fetch/pending或fulfilled或rejected
    const response = await axios.get('http://localhost:3005/users');

    //Dev ONLY
    await pause(1000);

    return response.data
}); 

/*Automatically added in：
fetchUsers.pending === users/fetch/pending
fetchUsers.fulfilled === users/fetch/fulfilled
fetchUsers.rejected === users/fetch/rejected
*/

//Dev ONLY!
const pause = (duration) =>{
    return new Promise((resolve)=>{
        setTimeout(resolve, duration);
    })
};

export { fetchUsers };