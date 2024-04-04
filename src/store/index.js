import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersReducer } from "./slices/usersSlice";
import { albumsApi } from "./apis/albumsApi";

export const store = configureStore({
    reducer: {
        users: usersReducer,
        [albumsApi.reducerPath]: albumsApi.reducer, //look up the reducerPath prop and put the string as a new key  
    },
    middleware: (getDefaultMiddleware)=>{
        return getDefaultMiddleware()
            .concat(albumsApi.middleware);
    },
});
//window.store = store;

setupListeners(store.dispatch);

//export { store }
export * from "./thunks/fetchUsers";
export * from "./thunks/addUser";
export * from "./thunks/removeUser";

export { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation } from "./apis/albumsApi";