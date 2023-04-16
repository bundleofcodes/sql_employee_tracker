USE employeeTracker_db;

INSERT INTO department
(name)

VALUES
('Sales'),
('Support'),
('Marketing'),
('Development');

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
('Adrianne', 'Ratliff', 60000, 1, 2),
('Zahrya', 'Toregano', 40000, 2, 1),
('Terrance', 'Hull', 65000, 3, 4),
('Clarence', 'Mitchell', 45000, 4, 3),
('Jaimee', 'Ratliff', 70000, 5, 6),
('Ashley', 'Rhys', 55000, 6, 5),
('Dean', 'Cole', 100000, 7, 8),
('Ova', 'Peeples', 80000, 8, 7);