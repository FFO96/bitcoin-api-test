import express from "express";
import { hdSegWit, multisig } from "./functions/functions";
const app = express();
const port = 8080; // default port to listen

// define a route handler for the default home page
app.use(express.json());
app.use( "/generatehd", hdSegWit);
app.use( "/generatemultisig", multisig);

// start the Express server
app.listen( port, () => {
    console.log( `Server started at http://localhost:${ port }` );
} );