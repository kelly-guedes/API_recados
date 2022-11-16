import express, { Request, Response } from "express";
import appRoutes from "./routes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

// app.use(express.urlencoded({ extended: false }));

appRoutes(app);

app.listen(process.env.PORT || 8080, () => console.log("API is running..."));
