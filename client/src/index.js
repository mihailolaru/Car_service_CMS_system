import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
// On release replace BrowserRouter with HashRouter
//import {HashRouter} from "react-router-dom";
import "./index.css";
import App from "./App";

/**
 * Redux comments.
 * The "Provider" ensures that all components have access to the store
 * "CMSRootReducer" is used to change the states
 *  The reducers are stored in the "src/reducers" folder
 */

import { PersistGate } from "redux-persist/integration/react";
import { createStore } from "redux";
import { persistStore } from "redux-persist";
import rootReducer from "./reducers";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

/* This is the link to the general reduces file (index.js) from the reducers folder.
 The actual link is ./reducers/index.js. but since it the file name is index.js we can skip the specification it is done by default. */

// initiate the Redux store
const store = createStore( rootReducer, composeWithDevTools() );
const persistor = persistStore( store );

ReactDOM.render(
    // <React.StrictMode>
    <Provider store={ store }>
        <PersistGate loading={ <h1> Redux Persist loading... </h1> } persistor={ persistor }>
            <HashRouter>
                <App />
            </HashRouter>
        </PersistGate>
    </Provider>,
    // </React.StrictMode>,
    document.getElementById("root")
);
