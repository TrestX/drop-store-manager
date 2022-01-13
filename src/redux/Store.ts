import { createStore , applyMiddleware } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import logger from 'redux-logger'
import { watcherSaga } from "./sagas/sagas";
import reducers from "./reducers";

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware,logger)
)

sagaMiddleware.run(watcherSaga);
export default store;