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
    ]).then(function(res){
        
    })
}

