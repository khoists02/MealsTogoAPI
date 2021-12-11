import dotenv from "dotenv";
// tslint:disable-next-line: import-name
import app from "./index";
import mongoose from "mongoose";

dotenv.config({ path: "./config.env" });

const databasePassword: string = process.env.DATABASE_PASSWORD || "";
const databaseUrl: string = process.env.DATABASE_URL?.replace("<PASSWORD>", databasePassword) || "";

mongoose
  .connect(databaseUrl)
  .then(() => {
    // tslint:disable-next-line: no-console
    console.log("Database connected !!!");
  })
  .catch(() => {
    process.exit();
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // tslint:disable-next-line: no-console
  console.log(`App running on port ${port}...`);
});
