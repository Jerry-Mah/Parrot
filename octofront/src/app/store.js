import { configureStore } from "@reduxjs/toolkit";
import { PrinterStatusAPI } from "../services/PrinterStatusAPI";

export default configureStore({
    reducer: {
        [PrinterStatusAPI.reducerPath]: PrinterStatusAPI.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(PrinterStatusAPI.middleware),
})