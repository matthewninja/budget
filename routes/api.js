const routes = require("express").Router();
const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database("./db/budget.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the budget database.");
});

/**
 * GET categories
 */
routes.get("/get-categories", (_req, res) => {
  const query = `SELECT * FROM [CATEGORY];`;
  db.all(query, [], (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

/**
 * GET transactions
 */
routes.get("/get-transactions", (_req, res) => {
  const query = `SELECT * FROM [TRANSACTION];`;
  db.all(query, [], (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

/**
 * POST add category
 * Name and budget required
 */
routes.post("/add-category", (req, res) => {
  const statement = db.prepare(
    "INSERT INTO [CATEGORY] (NAME, BUDGET) VALUES (?,?)"
  );
  try {
    statement.run(req.body.NAME, req.body.BUDGET);
    statement.finalize();
    res.status(200).json({ message: "Category inserted" });
  } catch (err) {
    res.status(500).json({ message: "Category not inserted" });
  }
});

/**
 * POST add transaction
 * NAME, CATEGORY (ID), AMOUNT, DATE required
 */
routes.post("/add-transaction", (req, res) => {
  const statement = db.prepare(
    "INSERT INTO [TRANSACTION] (NAME, CATEGORY, AMOUNT, DESCRIPTION, DATE) VALUES (?,?,?,?,?)"
  );
  try {
    const args = req.body;
    statement.run(
      args.NAME,
      args.CATEGORY,
      args.AMOUNT,
      args.DESCRIPTION,
      args.DATE
    );
    statement.finalize();
    res.status(200).json({ message: "Transaction inserted" });
  } catch (err) {
    res.status(500).json({ message: "Transaction not inserted" });
  }
});

/**
 * TODO Routes needed:
 * POST add transaction ✅
 * POST edit transaction
 * POST add category (with budget) ✅
 * POST edit category
 * POST delete category
 */

module.exports = routes;
