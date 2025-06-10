import express from "express";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PORT = 4200;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const router = express.Router();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "pages")));

const dirs = await fs.readdir("src/pages");

const pages: string[] = [];

await Promise.all(
  dirs.map(async (dir) => {
    const dirPath = path.join(__dirname, `/pages/${dir}`);
    const stats = await fs.stat(dirPath);

    if (stats.isDirectory()) {
      const content = await fs.readdir(dirPath);
      if (content.includes("index.html")) {
        pages.push(dir);
      }
    }
  }),
);

router.get("/", (_, res) => {
  res.render("list", { pages: pages });
});

app.use("/", router);

app.listen(PORT, () => {
  console.log(`running on localhost:${PORT}`);
});
