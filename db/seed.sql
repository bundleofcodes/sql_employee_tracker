USE employeeTracker_db;

INSERT INTO department
(name, department_id)

VALUES
('Sales', 1),
('Support', 2),
('Marketing', 3),
('Development', 4);

INSERT INTO role
(title, salary, department_id)

VALUES
('Sales Manager', 60000, 1),
('Sales Associate', 40000, 1),
('Support Manager', 65000, 2),
('Support Associate', 45000, 2),
('Marketing Manager', 70000, 3),
('Marketing Associate', 55000, 3),
('Development Manager', 100000, 4),
('Development Associate', 80000, 4);

INSERT INTO employee
(first_name, last_name, role_id, manager_id)

VALUES
('Adrianne', 'Ratliff', 1, 2),
('Zahrya', 'Toregano', 2, 1),
('Terrance', 'Hull', 3, 4),
('Clarence', 'Mitchell', 4, 3),
('Jaimee', 'Ratliff', 5, 6),
('Ashley', 'Rhys', 6, 5),
('Dean', 'Cole', 7, 8),
('Ova', 'Peeples', 8, 7);