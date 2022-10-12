// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const fs = require('fs');

const dir = './dist';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

const engineerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: "What is the engineer's name?",
    },
    {
        type: 'input',
        name: 'id',
        message: "What is the engineer's ID?"
    },
    {
        type: 'input',
        name: 'email',
        message: "What is the engineer's email?"
    },
    {
        type: 'input',
        name: 'github',
        message: "What is the engineer's github username?"
    }];

const internQuestions = [
    {
        type: 'input',
        name: 'name',
        message: "What is the intern's name?",
    },
    {
        type: 'input',
        name: 'id',
        message: "What is the intern's ID?"
    },
    {
        type: 'input',
        name: 'email',
        message: "What is the intern's email?"
    },
    {
        type: 'input',
        name: 'school',
        message: "What school does the intern go to?"
    }];

const managerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: "What is the team manager's name?",
    },
    {
        type: 'input',
        name: 'id',
        message: "What is the team manager's employee id?",
    },
    {
        type: 'input',
        name: 'emailAddress',
        message: "What is the team manager's email address?",
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: "What is the team manager's office number?",
    }];
const addingEmployees = [
    {
        type: 'list',
        name: 'roleType',
        message: 'Would type of employee would you like to add?',
        choices: [
            {
                value: 'engineer',
            },
            {
                value: 'intern',
            },
            {
                value: 'none',
            },
        ]
    },
];

// TODO: Create an array of questions for user input
// inquirer.prompt(
//     managerQuestions)
//     .then((answers) => {
//         console.log(answers);

//     });
//create function called createteams. console log im creating team and call it
//promise = async function
//async functions= promise
async function createTeams() {
    let managerAnswers = await inquirer.prompt(managerQuestions);
    console.log(managerAnswers);
    const manager = new Manager(managerAnswers.name, managerAnswers.id,
        managerAnswers.emailAddress, managerAnswers.officeNumber);
    const employeeArray = [manager];
    /*
    display correct type of questions
    get the answers, create correct type of onject with the answers
    and then add them to the employee list
    */
    let employeeSelection = await inquirer.prompt(addingEmployees);
    while (employeeSelection.roleType !== "none") {
        if (employeeSelection.roleType == "engineer") {
            let engineerSelection = await inquirer.prompt(engineerQuestions);
            const engineer = new Engineer(engineerSelection.name, engineerSelection.id,
                engineerSelection.email, engineerSelection.github);
            employeeArray.push(engineer);

        }
        else if (employeeSelection.roleType == "intern") {
            let internSelection = await inquirer.prompt(internQuestions);
            const intern = new Intern(internSelection.name, internSelection.id,
                internSelection.email, internSelection.school);
            employeeArray.push(intern);
        }

        employeeSelection = await inquirer.prompt(addingEmployees);
    }
    console.log(employeeArray);
    writeToFile(generateHTML(employeeArray));
}

function writeToFile(data) {
    fs.writeFile("./dist/sample.html", data, (err) =>
        err ? console.log(err) : console.log(`Successfully created sample.html`)

    );
}

//inquierer. prompt returns a prompise with the answers
//create teams returns a promise with a string
createTeams()
    .then(() => {
        console.log("done creating teams");
    })
    .catch(err => console.log(err));

//call then method on createteams and w.e it returns display it using console


//create function that will accept list of employees and generate file in html
//after getting answers for all the employees, call generate html function with employee list
//save the generate html into a file

const generateHTML = (employeeArray) => {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My Team</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
        <style>
            .navbar-custom {
                background-color: rgb(224, 68, 102);
            }
    
            .navbar-brand {
                color: aliceblue;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <nav class="navbar navbar-custom ">
                <div class="container-fluid justify-content-center">
                    <a class="navbar-brand" href="#">My Team</a>
                </div>
            </nav>
        </div>
    
        <div class="card-deck row row-cols-1 row-cols-md-2">
           ${createCards(employeeArray)}
        </div>
    </body>
    
    </html>`;
}

// create an for loop and go through the employee array
// and create a card for each employee
//concatanate them 
function createCards(employeeArray) {
    let cardstring = "";
    for (let i = 0; i < employeeArray.length; i++) {
        const card = `<div class="card  col mb-4">
            <div class="card-body">
                <h4>Name: ${employeeArray[i].getName()}</h4>
                <h5 class="card-title">Role: ${employeeArray[i].getRole()}</h5>
                <p class="card-text">Id: ${employeeArray[i].getId()}</p>
                <p> Email:<a href="mailto:${employeeArray[i].getEmail()}">${employeeArray[i].getEmail()}</a></p>
                <p> Github:${employeeArray[i].getEmail()} </p>
            </div>
        </div>`;
        cardstring = cardstring + card;
    }
    return cardstring;

}


/*
ask if they want to add engineer intern or none
if choose is engineer
    then load engineer questions
if choose intern
    then load intern questions
ask if they want to add another egineer or intern or none
if choose enginner
    then load enginner again
if choose intern
    then load intern again
if choose none
    then exit prompt
    and load html
*/

/**
 * CREATE FUNCTION THAT REPLACES LINE 213 
 * CREATE FUNCTION THAT EXPECTS EMPLOYEE OBJECT. IF THE EMPLOYEE IS 
 * AN ENGINEER IT WILL RETURN THE HTML FOR THE GITHUB URL
 * IF THE EMPLOYEE IS AN INTERN IT WILL RETURN THE HTML FOR THE SCHOOL
 * IF EMPLOYEE IS MANAGER IT WILL RETURN OFFICE ID AND OTHER REPLATED INFO. 
 */


