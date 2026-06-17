import fs from "fs";
import path from "path";
import { marked } from "marked";
import htmlDocx from "html-docx-js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const input = process.argv[2];
const output = process.argv[3];

if (!input || !output) {
  console.error("Usage: node scripts/md-to-docx.js <input.md> <output.docx>");
  process.exit(1);
}

const inPath = path.resolve(root, input);
const outPath = path.resolve(root, output);
const markdown = fs.readFileSync(inPath, "utf8");
const prepared = markdown.replace(/\*\*\[PAGE BREAK\]\*\*/g, "<div style=\"page-break-after: always;\"></div>");

const bodyHtml = marked.parse(prepared);
const html = `
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    @page { margin: 2.5cm 1.25cm 1.25cm 3.5cm; }
    body {
      font-family: "Times New Roman", serif;
      font-size: 12pt;
      line-height: 2;
    }
    h1, h2, h3, h4 {
      font-family: "Times New Roman", serif;
    }
    h1 { text-align: center; font-size: 16pt; font-weight: bold; text-transform: uppercase; }
    h2 { font-size: 14pt; font-weight: bold; }
    h3, h4 { font-size: 12pt; font-weight: bold; }
    table { width: 100%; border-collapse: collapse; font-size: 10pt; line-height: 1.2; }
    td, th { border: 1px solid #222; padding: 4px; }
    p, li { text-align: justify; }
    code, pre { font-family: "Courier New", monospace; font-size: 10pt; line-height: 1.3; }
  </style>
</head>
<body>
${bodyHtml}
</body>
</html>`;

const blob = htmlDocx.asBlob(html);
const arrayBuffer = await blob.arrayBuffer();
fs.writeFileSync(outPath, Buffer.from(arrayBuffer));
console.log(`Generated: ${outPath}`);
