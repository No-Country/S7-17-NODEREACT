const { configureStore, combineReducers } = require("@reduxjs/toolkit");
import authReducer from "@/features/auth/authSlice";
import regReducer from "@/features/reg/regSlice";
import socketReducer from "@/features/socket/socketSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

const persistConfig = {
  timeout: 1000,
  key: "root",
  storage: storage,
  blacklist: []
};

export const rootReducers = combineReducers({
  auth: authReducer,
  reg: regReducer,
  socket: socketReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
<<<<<<< HEAD
});
=======
});
>>>>>>> 3a3bc0fbe99061434a73ffb74064a27b5a8ec251
