import {combineReducers, configureStore, createListenerMiddleware, TypedStartListening} from '@reduxjs/toolkit';
import appReducer from '../reducers/app/appSlice';
// import userReducer from '../reducers/user/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FLUSH, PAUSE, PERSIST, PersistConfig, PersistState, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';

const listenerMiddleware = createListenerMiddleware();

const rootReducer = combineReducers({
    app: appReducer,
    // user: userReducer,
});

const rootPersistConfig: PersistConfig<ReturnType<typeof rootReducer>, any, any, any> = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: [], //state I dont want to persist
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const setupStore = () => {
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) => {
            const defaultMiddleware = getDefaultMiddleware({
                immutableCheck: { warnAfter: 128 },
                serializableCheck: {
                    warnAfter: 128,
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }).prepend(listenerMiddleware.middleware);

            return defaultMiddleware;
        },
    });
};

export let store = setupStore();
export let persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppStartListener = TypedStartListening<RootState, AppDispatch>;
export const startAppListener = listenerMiddleware.startListening as AppStartListener;
export type PersistRootState = RootState & {_persist: PersistState}
