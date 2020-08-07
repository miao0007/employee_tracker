const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "huanXI861109",
    database: "employee_trackerDB"
});

connection.connect(function(err){
    if(err) throw err;
    console.log("connection as id " + connection.threadId + "\n");
    start();
});

function start() {
    inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do? ",
            choices: [
                "Add Employee",
                "View All Employees",
                "Remove Employee",
                "Add department",
                "Add Roles",
                "View All Roles",
                "Update Employee Role",
                "Exit"
            ]
        }
    ]).then(function(answer){
        switch(answer.action){
            case "Add Employee":
                addEmployee();
                break;
        }
    })
}

function addEmployee() {
   console.log("Please input a new employee.\n");
   inquirer.prompt([
       {
           type:"input",
           name:"first_name",
           message: "Enter the first name ? "
       },
       {
           type: "input",
           name: "last_name",
           message: "Enter the last name ? "
       },
       {
          type: "list",
          name: "role_id",
          message: "Enter the employee's role id",
          choices: [1,2,3,4,5] 

       },
       {
           type: "input",
           name: "manager_id",
           message: "Employee's manager id?"
       }
   ]). then(function(answer){
       const query = connection.query(
           "INSERT INTO employee SET ?", answer,
           function(err, res) {
               if (err) throw err;
               console.log( "Employee added successfully!\n");
               start();
           }
       );
   }) 
}