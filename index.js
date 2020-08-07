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
    // start();
});

