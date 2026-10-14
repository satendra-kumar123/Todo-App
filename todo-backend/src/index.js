import 'dotenv/config'
import { app } from "./app.js";
import dbConnection from './db/dbConnection.js';

dbConnection()
.then(() => {
    app.listen(process.env.PORT)
})
.catch((error) => {
    return error
})