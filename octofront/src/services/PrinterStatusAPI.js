import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const octoprintApiHeaders = {
    "X-Api-Key": "4F4A25BB923147378E9E96D30E425D13",
    "Content-Type": "application/json",
}

const baseUrl = "http://localhost:5000/api"

const createRequest = (url) => ({ url, headers: octoprintApiHeaders });

export const PrinterStatusAPI  = createApi({
    reducerPath: 'PrinterStatusAPI',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) =>({
        currentPrinterState: builder.query({
            query: ()=> createRequest("/printer")
        }), 
        currentJobState : builder.query({
            query: ()=> createRequest("/job")
        })
    })
})

export const {useCurrentPrinterStateQuery, useCurrentJobStateQuery} = PrinterStatusAPI;

