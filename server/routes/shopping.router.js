const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');


router.get('/', (req, res) => {
    // When you fetch all things in these GET routes, strongly encourage ORDER BY
    // so that things always come back in a consistent order
    const sqlText = `SELECT * FROM "shoppingList" ORDER BY name ASC;`;
    pool.query(sqlText)
        .then((result) => {
            console.log(`Got stuff back from the database`, result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500); // Good server always responds
        })
})
// Setup a POST route to add a new guest to the database
router.post('/', (req, res) => {
    const item = req.body;
    const sqlText = `INSERT INTO "shoppingList" ("name", "quantity", "unit")
                     VALUES ($1, $2, $3)`;
    // Let sql sanitize your inputs (NO Bobby Drop Tables here!)
    // the $1, $2, etc get substituted with the values from the array below
    pool.query(sqlText, [item.name, item.quantity, item.unit])
        .then((result) => {
            console.log(`Added item to the database`, item);
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500); // Good server always responds
        })
})


router.delete('/', (req, res) => {
    
    const sqlText = 'DELETE FROM "shoppingList"'
    pool.query(sqlText)
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((dbError) => {
            console.log("delete item failed", dbError);
            res.sendStatus(500);
        })
})

router.delete('/:id', (req, res) => {
    const idToDelete = req.params.id;
    const sqlText = `
        DELETE FROM "shoppingList"
        WHERE "id" = $1
    `
    const sqlValues = [idToDelete]
    pool.query(sqlText, sqlValues)
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((dbError) => {
            console.log("delete item failed", dbError);
            res.sendStatus(500);
        })
})

router.put('/:id', (req, res) => {
    let idToUpdate = req.params.id;
        let queryText = `
        UPDATE "shoppingList"
        SET "isPurchased" = true
        WHERE "id" = $1;`;
        const sqlValues = [idToUpdate]
        pool.query(queryText, sqlValues)
            .then((result) => {
                res.sendStatus(200);
            })
            .catch((dbError) => {
                console.log("update item failed", dbError);
                res.sendStatus(500);
            })
});

module.exports = router;