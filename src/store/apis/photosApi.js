import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; 
 // Need to use the React-specific entry point to allow generating React hooks
import { faker } from "@faker-js/faker";

const photosApi = createApi({
    reducerPath: 'photos',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005'
    }),
    endpoints(builder){
        return {
            fetchPhotos: builder.query({
                providesTags: (result, error, album)=>{
                    const tags = result.map((photo)=>{
                        return {type: 'photo', id: photo.id}
                    });
                    tags.push({type: 'albumPhoto', id: album.id});
                    return tags;    //[{type:'photo', id: photo.id},{type:'albumPhoto', id: album.id}]
                },
                query: (album)=>{
                    return {
                        url: '/photos',
                        params: {
                            albumId: album.id,
                        },
                        method: 'GET'
                    };
                }
            }),
            addPhoto: builder.mutation({
                invalidatesTags: (result, error, album)=>{
                    return [{type: 'albumPhoto', id: album.id}]
                },
                query: (album)=>{
                    return {
                        url: '/photos',
                        method: 'POST',
                        body: {
                            url:faker.image.abstract(150, 150, true),
                            albumId: album.id
                        }
                    };
                }
            }),
            removePhoto: builder.mutation({
                invalidatesTags: (result, error, photo)=>{
                    return [{type: 'photo', id: photo.id}]
                },
                query: (photo)=>{
                    return {
                        url: `/photos/${photo.id}`,
                        method: 'DELETE'
                    };
                }
            }),
        };
    }
});

export const { 
    useFetchPhotosQuery, 
    useAddPhotoMutation, 
    useRemovePhotoMutation 
} = photosApi;
export { photosApi };