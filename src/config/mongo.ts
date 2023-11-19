import 'dotenv/config'
// import { connect } from "mongoose"
//
// async function dbConnect(): Promise<void>{
//     const DB_URI = <string>process.env.DB_URI;
//     await connect(DB_URI)
// }
// export default dbConnect()

import mongoose from 'mongoose';

// @ts-ignore
const connection = mongoose.connect(process.env.DB_URI || 'mongodb+srv://AdminUser:WnS7anyNrvBGn6oM@paulikine.3q5q7kw.mongodb.net/pauliKine?retryWrites=true&w=majority');

mongoose.connection.on('connected', () => {
    console.log('[Mongoose] - connected in:', process.env.DB_URI);
});

mongoose.connection.on('error', (err) => {
    console.log('[Mongoose] - error:', err);
});
export default connection
// module.exports = connection;