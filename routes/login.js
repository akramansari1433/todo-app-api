const handleSingIn = (req, res, db, bcrypt) => {
   const { email, password } = req.body;
   if (!email || !password) {
      return res.status(400).json("incorrect form submission");
   }
   db.select("*")
      .from("user")
      .where("email", "=", email)
      .then((data) => {
         const isValid = bcrypt.compareSync(password, data[0].password);
         if (isValid) {
            return db
               .select("*")
               .from("task")
               .where("userId", "=", data[0].id)
               .then((task) => {
                  res.json(task);
               })
               .catch((error) => res.status(400).json({ error }));
         } else {
            res.status(400).json({ error: "Wrong credintials!" });
         }
      })
      .catch((error) => res.status(400).json({ error: "User not found!" }));
};
module.exports = { handleSingIn };
