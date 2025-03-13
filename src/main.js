import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const router = express.Router();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "pages")));

const dirs = await fs.readdir("src/pages");

const pages = [];

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

app.listen(3000);
