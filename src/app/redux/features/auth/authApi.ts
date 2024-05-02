import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { loginSuccess } from "./authSlice";
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
    }),
    endpoints: (builder) => ({
        refreshToken: builder.query({
            query: (data) => ({
                url: '/auth/refresh',
                method: 'GET',
                credentials: 'include',
            })
        }),
        registerUser: builder.mutation({
            query: (data) => ({
                url: '/auth/register',
                method: 'POST',
                credentials: 'include',
                body: data,
            })
        }),

        updateUser: builder.mutation({
            query: (data) => ({
                url: '/auth/register',
                method: 'POST',
                credentials: 'include',
                body: data,
            })
        }),

        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/auth/delete-user/${id}`,
                method: 'DELETE',
                credentials: 'include',
                
            })
        }),

        loginUser: builder.mutation({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                credentials: 'include',
                body: data,
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                try {
                    const result = await queryFulfilled;
                    dispatch(loginSuccess({
                        accessToken: result.data.accessToken,
                        user: {
                            userId: result.data.userId,
                            fullName: result.data.fullName,
                            email: result.data.email,
                            accessToken: result.data.accessToken
                        } 
                    }));
                } catch (error:any) {
                    console.log(error.message);
                }
            }
        }),
        getUsers: builder.query({
            query: () => ({
                url: '/auth/get-all-users',
                method: 'GET',
                credentials: 'include',
            })
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
                credentials: 'include',
            })
        })
        
    })
})

export const {useRefreshTokenQuery, useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation, useGetUsersQuery, useDeleteUserMutation} = apiSlice;