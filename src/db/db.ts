export const db = {
  users: [
    {
      id: "1",
      name: "aymen",
      email: "aymen@gmail.com",
      cvs: ["101", "102"],
      role: "ADMIN"
    },
    {
      id: "2",
      name: "sarah",
      email: "sarah@gmail.com",
      cvs: ["103"],
      role: "USER"

    },
    {
      id: "3",
      name: "karim",
      email: "karim@gmail.com",
      cvs: ["104"] ,
        role: "USER"
    }
  ],

  cvs: [
    {
      id: "101",
      name: "FullStack Developer",
      age: 30,
      job: "Freelancer",
      user: "1",
      skills: ["1", "2"]
    },
    {
      id: "102",
      name: "Backend Engineer",
      age: 30,
      job: "Employee",
      user: "1",
      skills: ["2"]
    },
    {
      id: "103",
      name: "Frontend Developer",
      age: 25,
      job: "Intern",
      user: "2",
      skills: ["1"]
    },
    {
      id: "104", 
      name: "DevOps Engineer",
      age: 27,
      job: "Junior DevOps",
        user: "3",
      skills: ["1", "2", "3"]
    }
  ],

  skills: [
    { id: "1", designation: "JavaScript" },
    { id: "2", designation: "Node.js" },
    { id: "3", designation: "Docker" } 
  ]
};