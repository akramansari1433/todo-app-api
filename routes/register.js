const handleRegister = (req, res, db, bcrypt) => {
   const { email, password, name } = req.body;
   if (!email || !password || !name) {
      return res.status(400).json("incorrect form submission");
   }
   const hash = bcrypt.hashSync(password);
   db("user")
      .insert({
         email: email,
         password: hash,
         name: name,
      })
      .then(() => {
         res.json({ message: "Resgistration Successfull!" });
      })
      .catch((error) => res.json({ error }));
};

module.exports = { handleRegister };
