const addTask = (req, res, db) => {
   const { userId, tname } = req.body;
   db("task")
      .insert({
         tname: tname,
         userId: userId,
      })
      .then(() => {
         res.json({ message: "Task Added Successfull!" });
      })
      .catch((error) => res.json({ error }));
};

const getAllTask = (req, res, db) => {
   const { userId } = req.params;
   db.select("*")
      .from("task")
      .where("userId", "=", userId)
      .then((data) => {
         res.send(data);
      })
      .catch((error) => res.status(400).json({ error: "Tasks not found!" }));
};

const markCompleted = (req, res, db) => {
   const { tid } = req.params;
   db("task")
      .where("tid", "=", tid)
      .update({
         completed: 1,
      })
      .then(() => {
         res.json({ message: "Task Marked Completed!" });
      })
      .catch((error) => res.json({ error }));
};

const markInCompleted = (req, res, db) => {
   const { tid } = req.params;
   db("task")
      .where("tid", "=", tid)
      .update({
         completed: 0,
      })
      .then(() => {
         res.json({ message: "Task Marked Incomplete!" });
      })
      .catch((error) => res.json({ error }));
};

const deleteTask = (req, res, db) => {
   const { tid } = req.params;
   db("task")
      .where("tid", tid)
      .del()
      .then(() => {
         res.json({ message: "Task Deleted Successfull!" });
      })
      .catch((error) => res.json({ error }));
};

module.exports = {
   addTask,
   markCompleted,
   deleteTask,
   getAllTask,
   markInCompleted,
};
