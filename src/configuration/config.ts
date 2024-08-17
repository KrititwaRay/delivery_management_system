import mongoose from "mongoose";

export class Config {

    private dbName: string;
    private dbUrl: string;

    constructor() {
        this.dbName = process.env.DATABASE_NAME as string
        this.dbUrl = process.env.DATABASE_URL as string
    }
    async connectMongoDb() {
        try {
            const connectionInstance: any = await mongoose.connect(`${this.dbUrl}/${this.dbName}`)

            console.log(`MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);

        } catch (error: any) {
            console.log(`MONGODB CONNECTION FAILED: ${error}`);
            process.exit(1);
        }
    }
}


