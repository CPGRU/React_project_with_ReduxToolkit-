import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

//DEV ONLY
const pause = (duration) =>{
    return new Promise((resolve)=>{
        setTimeout(resolve, duration);
    })
};

const albumsApi = createApi({
    reducerPath: 'albums',  //{ users:{...}, albums:{...},photos:{...}}
    baseQuery: fetchBaseQuery({  //provide pre-configured version of fetch
        baseUrl: 'http://localhost:3005',
        fetchFn: async (...args)=>{
            await pause(1000);
            return fetch(...args);
        }
    }),
    endpoints(builder) {
        return {
            removeAlbum: builder.mutation({
                invalidatesTags: (results, error, album)=>{
                    return [{type: 'Album', id: album.id}] 
                },
                query: (album)=>{
                    return {
                        url: `/albums/${album.id}`,
                        method: 'DELETE',
                    };
                }
            }),
            addAlbum: builder.mutation({
                invalidatesTags: (result, error, user)=>{
                    return [{type: 'UsersAlbums', id: user.id}]
                },
                query: (user)=>{
                    return {
                        url: '/albums',
                        method: 'POST',
                        body: {
                            title: faker.commerce.productName(),
                            userId: user.id
                        }
                    };
                }
            }),
            fetchAlbums: builder.query({  //fetchAlbums is the name of custom hook 
                providesTags: (result, error, user)=>{        //Expects an array of tag type strings, an array of objects of tag types with ids,
                    const tags = result.map(album =>{                   // or a function that returns such an array
                        return {type:'Album', id:album.id}
                    });
                    tags.push({type:'UsersAlbums', id: user.id});
                    return tags;  
                },  
                query: (user) =>{         //use + hook name + Query
                    return {
                        url: '/albums',
                        params: {
                            userId: user.id,
                        },
                        method: 'GET'
                    };
                },
            }),
        };
    }
});

export const { 
    useFetchAlbumsQuery, 
    useAddAlbumMutation,
    useRemoveAlbumMutation
} = albumsApi;
export { albumsApi }
