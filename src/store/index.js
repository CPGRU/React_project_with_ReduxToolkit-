import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersReducer } from "./slices/usersSlice";
import { albumsApi } from "./apis/albumsApi";
import { photosApi } from "./apis/photosApi";

export const store = configureStore({
    reducer: {
        users: usersReducer,
        [albumsApi.reducerPath]: albumsApi.reducer, //look up the reducerPath prop and put the string as a new key  
        [photosApi.reducerPath]: photosApi.reducer,
    },
    middleware: (getDefaultMiddleware)=>{
        return getDefaultMiddleware()
            .concat(albumsApi.middleware)
            .concat(photosApi.middleware);
    },
});

setupListeners(store.dispatch);

//export { store }
export * from "./thunks/fetchUsers";
export * from "./thunks/addUser";
export * from "./thunks/removeUser";

export { 
    useFetchAlbumsQuery, 
    useAddAlbumMutation, 
    useRemoveAlbumMutation 
} from "./apis/albumsApi";

export { 
    useFetchPhotosQuery, 
    useAddPhotoMutation, 
    useRemovePhotoMutation 
} from "./apis/photosApi";