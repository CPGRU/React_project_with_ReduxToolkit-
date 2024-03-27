import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const removeUser = createAsyncThunk('users/remove', async (user)=>{  //user obj
    const response = await axios.delete(`http://localhost:3005/users/${user.id}`);
    
    return response.data;
})

export { removeUser }; 