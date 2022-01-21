const router = require("express").Router();
const checkAuth = require ("../middleware/checkAuth");
const pool = require("../db");

router.get("/contact", checkAuth, async (req, res) => {
  try {

    // get todo name and description for a specified user id
    const contact = await pool.query(
      "SELECT * FROM contact_form where user_id = $1",
      [req.user.id]
    );

    res.json(contact.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/contact/:id", checkAuth, async (req, res) => {
  const{id}=req.params

    const contact = await pool.query("SELECT * FROM contact_form WHERE contact_form_id=$1", [
      id
    ]);
    res.json(contact.rows[0]);

});


router.post("/contact", checkAuth, async (req, res) => {
  const { firstname, lastname, phone } = req.body;

 
    const newContact = await pool.query("INSERT INTO contact_form (user_id,first_name,last_name,phone) VALUES ($1, $2, $3,$4) RETURNING *", [
      req.user.id,firstname, lastname, phone
    ]);
    res.json(newContact.rows[0]);

});


router.put("/contact/:id", checkAuth, async (req, res) => {
  try {
    const{id}=req.params
    const { firstname, lastname, phone } = req.body;
    
    const updateTodo = await pool.query(
      "UPDATE contact_form SET first_name= $1, last_name=$2, phone=$3 WHERE contact_form_id=$4 returning *",
      [firstname, lastname, phone, id]
    );

    if (updateTodo.rows.length === 0) {
      return res.json("This todo is not yours");
    }

    res.json(updateTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});




router.delete("/contact/:id", checkAuth, async (req, res) => {
  try {
    const{id}=req.params
    
    
    const deleteContact = await pool.query(
      "DELETE FROM contact_form WHERE contact_form_id=$1 returning * ",
      [id]
    );

    if (deleteContact.rows.length === 0) {
      return res.json("This contact item is not yours");
    }

    res.json("contact deleted");
  } catch (err) {
    console.error(err.message);
  }
});






module.exports = router;