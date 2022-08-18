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

const markCompleted = (req, res, db) => {
   const { tid } = req.params;
   db("task")
      .where("tid", "=", tid)
      .update({
         completed: 1,
      })
      .then(() => {
         res.json({ message: "Task Completed Successfull!" });
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

module.exports = { addTask, markCompleted, deleteTask };
