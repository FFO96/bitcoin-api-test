import express from "express";
import { hdSegWit, multisig } from "./functions/functions";
const app = express();
const port = 8080;

// express.json middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Endpoint for HD SegWit bitcoin address
app.post( "/generatehd", hdSegWit);

// Endpoint formulti-sig P2SH bitcoin address
app.post( "/generatemultisig", multisig);

// Start the Express server
app.listen( port, () => {
    console.log( `Server started at http://localhost:${ port }` );
} );