import express from "express";

const app = express();

app.listen(3333, () => {
  console.log("Server start");
});

// Crud 1 -> Categoria ( id, name,slug, created_at, updated_at)
// Crud 2 -> Produto ()
