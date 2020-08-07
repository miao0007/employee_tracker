USE employee_trackerDB

INSERT INTO department (name)
VALUES ("Admin"),
    ("HR"),
    ("Finanace"),
    ("Marketing"),
    ("Engineering");

INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Reception",60000,1),
    ("Assistant", 58000,1),
    ("HR-Recruiter", 75000,2),
    ("Payroll",78000,2),
    ("Secretary",90000,3),
    ("Salesperson",85000,4),
    ("Photographer",78000,4),
    ("Software Engineer",100000,5),
    ("Lead Engineer", 110000, 5);

INSERT INTO employee
    (first_name,last_name,role_id,manager_id)
VALUES
    ("Alan", "Mackenzie", 2, 1),
    ("Bill", "Smith", 3, null),
    ("Ken", "White", 1, null),
    ("Frank", "Carols", 4, null),
    ("Anne", "Noble", 7, null),
    ("Jane", "Dawson", 8, null),
    ("Wendy","Nguyen",5,null),
    ("Thomas","Cameron",6,null);

