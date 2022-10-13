// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const fs = require('fs');
const { url } = require('inspector');

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
        message: "What is the team manager's employee ID?",
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
        message: 'Would type of employee would you like to add? Select none if you would like to stop adding employees to your team',
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

async function createTeams() {
    let managerAnswers = await inquirer.prompt(managerQuestions);
    const manager = new Manager(managerAnswers.name, managerAnswers.id,
        managerAnswers.emailAddress, managerAnswers.officeNumber);
    const employeeArray = [manager];

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
    writeToFile(generateHTML(employeeArray));
}

function writeToFile(data) {
    fs.writeFile("./dist/sample.html", data, (err) =>
        err ? console.log(err) : console.log(`Successfully created sample.html`)

    );
}

createTeams()
    .then(() => {
        console.log("done creating teams");
    })
    .catch(err => console.log(err));

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

function createCards(employeeArray) {
    let cardstring = "";
    for (let i = 0; i < employeeArray.length; i++) {
        const card = `<div class="card  col mb-4">
            <div class="card-body">
                <h4>Name: ${employeeArray[i].getName()}</h4>
                <h5 class="card-title">Role: ${employeeArray[i].getRole()}</h5>
                <p class="card-text">Id: ${employeeArray[i].getId()}</p>
                <p> Email:<a href="mailto:${employeeArray[i].getEmail()}">${employeeArray[i].getEmail()}</a></p>
                ${employeeSpecifics(employeeArray[i])}
            </div>
        </div>`;
        cardstring = cardstring + card;
    }

    return cardstring;

}


function employeeSpecifics(employeeDetails) {
    if (employeeDetails.getRole() == "Engineer") {
        return `<p> Github:<a target="_blank" href="https://github.com/${employeeDetails.getGithub()}">${employeeDetails.getGithub()}</a></p>`
    }

    else if (employeeDetails.getRole() == "Intern") {
        return `<p> School: ${employeeDetails.getSchool()} </p>`;

    }

    else if (employeeDetails.getRole() == "Manager") {
        return `<p> Office Number: ${employeeDetails.officeNumber}</p>`
    }

}

