import * as express from "express";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import * as cors from "cors";
import helmet from "helmet";
import routes from "./routes";

const PORT = process.env.PORT || 3000;
AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    // middlewares
    app.use(helmet());
    app.use(cors({ origin: "*" }));
    app.use(express.json());

    // routes
    app.use("/", routes);

    //start express server
    app.listen(PORT, () =>
      console.log(`server on runnig in the  PORT ${PORT}`)
    );
  })
  .catch((error) => console.log(error));
