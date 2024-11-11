import { configureStore } from "@reduxjs/toolkit";
import { PrinterStatusAPI } from "../services/PrinterStatusAPI";
import printerReducer from '../services/PrinterSlice'

export default configureStore({
    reducer: {
        [PrinterStatusAPI.reducerPath]: PrinterStatusAPI.reducer,
        printer: printerReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(PrinterStatusAPI.middleware),
})