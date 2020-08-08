const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "mypassword",
  database: "employee_trackerDB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connection as id " + connection.threadId + "\n");
  start();
});

function start() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do? ",
        choices: [
          "Add Employee",
          "View All Employees",
          "Remove Employee",
          "Add department",
          "View all Departments",
          "Add Roles",
          "View All Roles",
          "Update Employee Role",
          "Exit",
        ],
      },
    ])
    .then(function (answer) {
      switch (answer.action) {
        case "Add Employee":
          addEmployee();
          break;

        case "View All Employees":
          viewAllEmployee();
          break;

        case "Remove Employee":
          removeEmployee();
          break;
        case "Add department":
          addDepartment();
          break;
        case "View all Departments":
          viewAllDepartment();
          break;
        case "Add Roles":
          addRoles();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
}

function addEmployee() {
  console.log("Please input a new employee.\n");
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Enter the first name ? ",
      },
      {
        type: "input",
        name: "last_name",
        message: "Enter the last name ? ",
      },
      {
        type: "list",
        name: "role_id",
        message: "Enter the employee's role id",
        choices: [1, 2, 3, 4, 5],
      },
      {
        type: "input",
        name: "manager_id",
        message: "Employee's manager id?",
      },
    ])
    .then(function (answer) {
      const query = connection.query(
        "INSERT INTO employee SET ?",
        answer,
        function (err, res) {
          if (err) throw err;
          console.log("Employee added successfully!\n");
          start();
        }
      );
    });
}

function viewAllEmployee() {
  connection.query(
    'SELECT employee.first_name, employee.last_name, role.title AS "role", manager.first_name AS "manager" FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN employee manager ON employee.manager_id = manager.id GROUP By employee.id',
    function (err, res) {
      if (err) throw err;
      console.table(res);
      start();
    }
  );
}

function removeEmployee() {
  let employees = [];
  connection.query(
    "SELECT employee.first_name, employee.last_name FROM employee",
    (err, res) => {
      for (let i = 0; i < res.length; i++) {
        employees.push(res[i].first_name + " " + res[i].last_name);
      }
      inquirer
        .prompt([
          {
            type: "list",
            name: "employee",
            message: "Select a employee you want to delete. ",
            choices: employees,
          },
        ])
        .then((res) => {
          const query = connection.query(
            `DELETE FROM employee WHERE concat(first_name, ' ' , last_name) = '${res.employee}'`,
            function (err, res) {
              if (err) throw err;
              console.log("Employee deleted!\n");
              start();
            }
          );
        });
    }
  );
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department_name",
        message: "Please input the department name you want to add ",
      },
    ])
    .then(function (answer) {
      console.log(answer);
      const query = connection.query(
        "INSERT INTO department SET ?",
        { name: answer.department_name },
        function (err, res) {
          connection.query("SELECT * FROM department", function (err, result) {
            console.table(result);
            start();
          });
        }
      );
    });
}

function viewAllDepartment() {
  connection.query("SELECT * FROM department", function (error, result) {
    console.table(result);
    start();
  });
}

function addRoles() {
  let department = [];
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      res[i].first_name + " " + res[i].last_name;
      department.push({ name: res[i].name, value: res[i].id });
    }
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What role would you want to add? ",
        },
        {
          type: "input",
          name: "salary",
          message: " Set a salary for this role: ",
        },
        {
          type: "input",
          name: "department",
          message: "Select department: ",
          choices: department,
        },
      ])
      .then(function (answer) {
        console.log(answer);
        const query = connection.query(
          "INSERT INTO role SET ?",
          {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.department,
          },
          function (err, res) {
            if (err) throw err;
            start();
          }
        );
      });
  });
}

function viewAllRoles() {
  connection.query(
    "SELECT role.*, department.name FROM role LEFT JOIN department ON department.id = role.department_id",
    function (error, result) {
      if (error) throw error;
      console.table(result);
      start();
    }
  );
}

function updateEmployeeRole() {
  let employee = [];
  connection.query("SELECT first_name, last_name, id FROM employee", function (
    err,
    res
  ) {
    for (let i = 0; i < res.length; i++) {
      employee.push(res[i].first_name + " " + res[i].last_name);
    }
    inquirer
      .prompt([
        {
          type: "list",
          name: "employee_name",
          message: "Which employee's role you want to update? ",
          choices: employee,
        },
        {
          type: "input",
          name: "role",
          message: "Input the new role",
        },
      ])
      .then(function (answer) {
        connection.query(
          `UPDATE employee SET role_id = ${answer.role} WHERE id = ${answer.employee_name}`,
          function (err, res) {
            console.log(res);
            start();
          }
        );
      });
  });
}
