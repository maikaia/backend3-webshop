import { connect } from "mongoose"

export const setupMongoDb = async (url: string) => {
    try {
        console.info(`Setup MongoDB connection to ${url}!`);
        await connect(url);
    } catch (e) {
        console.error("Error connecting to MongoDB!", e);
        throw e;
    }
}
