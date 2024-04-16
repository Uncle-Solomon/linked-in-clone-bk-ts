import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { swaggerSpec } from "./docs";
import { authRoute } from "./routes/auth";
import { userRoute } from "./routes/user";
import { postRoute } from "./routes/posts/post";
import { commentRoute } from "./routes/posts/comment";
import { replyRoute } from "./routes/posts/reply";

// Create express app instance
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("common"));
app.use(
  helmet({ contentSecurityPolicy: false, crossOriginResourcePolicy: false })
);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/comment", commentRoute);
app.use("/api/v1/reply", replyRoute);

//Server Landing Page
app.get("/", (req: Request, res: Response) => {
  res.send(
    "The API for Linked-in Clone, developed by Ameh Solomon Onyeke (A.S.O)"
  );
});

export default app;
