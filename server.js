// connect to db to perform queries
const mysql = require('mysql2');
// interact with user via the command line
const inquirer = require('inquirer');
// terminal string styline
// const chalk = require("esm")(module/*, options*/)
// const  asciiartLogo = require('asciiart-logo');
// implement FIGfont
const figlet = require('figlet');
// dotenv for environmental variables
require('dotenv').config();
// print MySQL rows to the console
require('console.table');

const connection = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employeeTracker_db',
    port: '3306'
})

connection.connect(function (err) {
    if (err) {console.log(err)};
})
// connection.connect();
// console.log(chalk.white.bold('======================================================='));
// console.log(``);
// console.log(chalk.yellow.bold(figlet.textSync('EMPLOYEE TRACKER')));
// console.log(``);
// console.log(`                      ` + chalk.pink.bold('(C)ONTENT (M)ANAGMENT (S)YSTEM'));
// console.log(``);
// console.log(chalk.blue.bold(`=======================================================+=`));


const printMenuPrompts = () => {
    inquirer
    .prompt({
        name: 'choices',
        type: 'list',
        message: 'PLEASE SELECT A MENU OPTION...',
        choices: [
            'View All Employees',
            'View All Roles',
            'View All Departments',
            'View Employees By Manager',
            'Update Employee Role',
            'Add New Employee',
            'Add New Role',
            'Add New Department',
            'Update Employee Managers',
            'Delete Employee',
            'Delete Role',
            'Delete Department',
            'Exit Menu',
        ],

    })
    .then((answers) => {
        // console.log(answers);
        // console.log(answers.choices);
        const choices = answers.choices;
        if (choices === 'View All Employees') {
            viewAllEmployees();
        }
        else if(choices === 'View All Roles') {
            viewAllRoles();
        }
        else if(choices === 'View All Departments') {
            viewAllDepartments();
        }
        else if(choices === 'View Employess By Manager') {
            viewEmployeesByManager();
        }
        else if(choices === 'Update Employee Role') {
            updateEmployeeRole();
        }
        else if(choices === 'Add New Employee') {
            addNewEmployee();
        }
        else if(choices === 'Add New Role') {
            addNewRole();
        }
        else if(choices === 'Add New Department') {
            addNewDepartment();
        }
        else if(choices === 'Update Employee Managers') {
            updateEmployeeManagers();
        }
        else if(choices === 'Delete Employee') {
            deleteEmployee();
        }
        else if(choices === 'Delete Role') {
            deleteRole();
        }
        else if(choices === 'Delete Department') {
            deleteDepartment();
        }
        else if(choices === 'Exit Menu') {
            console.log('Successfully Logged Out! Type npm start to login')
            connection.end();
        }
    });
};

// SQL SELECT * FROM statements for choices
// function viewAllDepartments() {
//     connection.query('SELECT * FROM department', (err, data) => {
//         if (err) {
//             console.log(err);
//             return;
//         } else {
//             console.table(data);
//         }

//     })
// }
const viewAllEmployees = () => {
    console.log('viewAllEmployees');
    const dbquery = 'SELECT * FROM employee';
    connection.query(dbquery, function (err, res) {
        if (err) {throw err
        } else {console.table(res)};
    })
    printMenuPrompts();
}

const viewAllRoles = () => {
    const query = 'SELECT * FROM role';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);       
    })
    printMenuPrompts();
}

const viewAllDepartments = () => {
    const query = 'SELECT * FROM department';
    connection.query(query, (err, res) => {
        if(err) throw err;
        console.table(res);
    })
    printMenuPrompts();
}

// BonusL SQL Order by statment to view employees by manager
const viewEmployeesByManager = () => {
    const query = 'SELECT * FROM employee ORDER BY manager_id DESC';
    connection.query(query, (err, res) => {
        if(err) throw err;
        console.table(res);
    })
    printMenuPrompts();
}

const updateEmployeeRole = () => {
    connection.query = 'SELECT * FROM employee', (err, employees) => {
        if(err) console.log(err);
        employees = employees.map((employee) => {
            return {
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id,
            };
        });
        connection.query('SELECT * FROM role', (err, res) => {
            if (err) console.log(err);
            roles = roles.map((role) => {
                return {
                    name: role.title,
                    value: role.id,
                }
            });
            inquirer
            .prompt ([
                {
                    type: 'list',
                    name: 'selectEmployee',
                    message: 'Select employee to update...',
                    choices: employees,
                },
                {
                    type: 'list',
                    name: 'selectNewRole',
                    message: 'Select new employee role...',
                    choices: roles,
                },
            ])
            .then((data) => {
                connection.query('UPDATE employee SET ? WHERE ?',
                [
                    {
                        role_id: data.selectNewRole,
                    },
                    {
                        id: data.selectEmployee,
                    },
                ],
                function (err) {
                    if (err) throw err;
                }
                );
                console.log('Employee role update');
                viewAllRoles();
            });
        });
    };
};

const addNewEmployee = () => {
    connection.query('SELECT * FROM role', (err, roles) => {
        if (err) console.log(err);
        roles = roles.map((role) => {
            return {
                name: role.title,
                value: role.id,
            };
        });
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'Enter first name of new employee...'
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'Enter last name of new employee...'
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'Enter new employee role...',
                    choices: roles,
                },
                {
                    type: 'list',
                    name: 'managerId',
                    message: 'select a manager id...',
                    choices: [1, 3, 5, 6, 7]
                }
            ])
            .then((data) => {
                console.log(data.role);
                connection.query(
                    'Insert INTO employee SET ?',
                    {
                        first_name: data.firstName,
                        last_name: data.lastName,
                        role_id: data.role,
                        manager_id: data.managerId
                    },
                    (err) => {
                        if (err) throw err;
                        console.log('Updated Employee Roster;');
                        viewAllEmployees();
                    }
                );
            });
    });
};

const addNewRole = () => {
    connection.query('SELECT * FROM department', (err, departments) => {
        if (err) console.log(err);
        departments = departments.map((department) => {
            return {
                name: department.name,
                value: department.id,
            };
        });
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'newRole',
                    message: 'Enter title of new role...'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter salary of new role...',
                },
                {
                    type: 'list',
                    name: 'departmentId',
                    message: 'Enter department of new role...',
                    choices: departments,
                },
            ])
            .then((data) => {
                connection.query(
                  'INSERT INTO role SET ?',
                  {
                    title: data.newRole,
                    salary: data.salary,
                    department_id: data.departmentId,
                  },
                  function (err) {
                    if (err) throw err;
                  }  
                );
                console.log('added new employee role!')
                viewAllRoles();
            });
    });
};

const addNewDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'newDepartment',
                message: 'Enter new department name...'
            },
        ])
        .then((data) => {
            connection.query('INSERT INTO department SET ?',
            {
                name: data.addNewDepartment,
            },
            function (err) {
                if (err) throw err;
            }
            );
            console.log('New department added to database')
            viewAllDepartments();
        });
};
printMenuPrompts();
// connection.connect((err) => {
//     if (err) throw err;

    // printMenuPrompts();
// });

// Delete Employee Bonus
// const deleteEmployee = () => {
//     connection.query('SELECT * FROM employee', (err, employees) => {
//         if (err) console.log(err);
//         employees = employees.map((employee) => {
//             return {
//                 name: `${employee.first_name} ${employee.last_name}`,
//                 value: employee.id,
//             };
//         });
//         inquirer
//             .prompt([
//                 {
//                     type: 'list',
//                     name: 'deleteEmployee',
//                     message: 'Select employee to delete...',
//                     choices: employees,
//                 },
//             ])
//             .then((data) => {
//                 connection.query('DELETE FROM employee WHERE employee.id = ?',
//                 [
//                     {
//                         employee_id: data.deleteEmployee,
//                     }
//                 ],
//                 function (err) {
//                     if(err) throw err;
//                 }
//                 );
//                 console.log('Employee Successfully Deleted!');
//                 viewAllEmployees();
//             });
//     });
// };