import { httpRouter } from "convex/server";
import { betterAuthComponent, createAuth } from "./auth";
import { polar } from "./polar";

const http = httpRouter();

betterAuthComponent.registerRoutes(http, createAuth);
polar.registerRoutes(http as any);

export default http;
