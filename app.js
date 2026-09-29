import express from "express";

const app = express();

// Connect runs apps behind a path prefix (e.g. /content/<guid>/), so use
// relative URLs in links rather than absolute "/..." paths.
app.get("/", (req, res) => {
  res.type("html").send(`<!doctype html>
<html>
  <head><meta charset="utf-8"><title>Node.js on Posit Connect</title></head>
  <body style="font-family: system-ui, sans-serif; max-width: 40rem; margin: 2rem auto;">
    <h1>Hello from Node.js on Posit Connect</h1>
    <p>Node.js ${process.version} on ${process.platform}/${process.arch}</p>
    <ul>
      <li><a href="api/info">api/info</a> &mdash; runtime details (JSON)</li>
      <li><a href="healthz">healthz</a> &mdash; health check</li>
    </ul>
  </body>
</html>`);
});

app.get("/api/info", (req, res) => {
  res.json({
    node: process.version,
    uptimeSeconds: Math.round(process.uptime()),
    // Headers Connect adds for authenticated viewers (absent for anonymous access)
    connectUser: req.get("RStudio-Connect-Credentials") ? "authenticated" : "anonymous",
    time: new Date().toISOString(),
  });
});

app.get("/healthz", (req, res) => res.send("ok"));

// Connect assigns HOST and PORT; listen on exactly those. Fall back for local dev.
const port = Number(process.env.PORT ?? 3000);
const host = process.env.HOST ?? "127.0.0.1";

app.listen(port, host, () => {
  console.log(`Listening on http://${host}:${port}`);
});
