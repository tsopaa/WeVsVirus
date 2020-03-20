import { createStore, compose } from "redux";

import app from "./reducers/app.js";

// Sets up a Chrome extension for time travel debugging.
const devCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(app, devCompose());
