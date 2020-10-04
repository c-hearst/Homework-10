const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const employees = [];
let oneMngr = 0;

// Calling and beginning function here

promptUser();

async function promptUser() {
    try {
        console.log(
            "Welcome to the Project Team Generator!"
        );

// Input for the employees' names

        const { name } = await inquirer.prompt({
            type: "input",
            name: "name",
            message: "Employee's name: ",
        });

// Input for the employees' ID numbers

        const { id } = await inquirer.prompt({
            type: "input",
            name: "id",
            message: "Employee's ID: "
        });

// Input for employees' email addresses

        const { email } = await inquirer.prompt({
            type: "input",
            name: "email",
            message: "Employee's email: "
        });

// User selects the employees' role

        const { role } = await inquirer.prompt({
            type: "list",
            name: "role",
            message: "Select which part of the team this employee is on:",
            choices: ["Engineer", "Intern", "Manager"],
        });

// If Engineer is selected, the user is prompted to provide the appropriate GitHub account

        const { Eng } = await inquirer.prompt({
            type: "input",
            name: "Eng",
            message: "Please provide Engineer's GitHub",
            when: (answers) => role === "Engineer",
        });

// If Intern is selected, the user is prompted to provide the school the Intern is attending

        const { Int } = await inquirer.prompt({
            type: "input",
            name: "Int",
            message: "Please provide the name of the school the Intern is currently attending",
            when: (answers) => role === "Intern",
        });

// If Manager is selected, the user is prompted to provide the Manager's office phone number

        const { Mngr } = await inquirer.prompt({
            type: "input",
            name: "Mngr",
            message: "Please provide the Manager's Office Number:",
            when: (answers) => role === "Manager",
        });

// Push employee depending on selected options, inform user the employee has been added to the team

        switch (role) {
            case "Engineer":
                let github = Eng;
                employees.push(new Engineer(name, id, email, github));
                console.log("Engineer successfully added to the team.");
                    break;
            case "Intern":
                let school = Int;
                employees.push(new Intern(name, id, email, school));
                console.log("Intern successfully added to the team.");
                     break;
            case "Manager":
                let officeNumber = Mngr;
                employees.push(new Manager(name, id, email, officeNumber));
                console.log("Manager successfully added to the team.");
                     break;  
        }

// Prompt users to add additional team members (if needed)

        const { addTeamMember } = await inquirer.prompt({
            type: "list",
            message: "Add another Team Member?",
            name: "addTeamMember",
            choices: ["Yes", "No"],
        });


        let addMem = addTeamMember;
        switch (addMem) {
            case "Yes":
            promptUser();
            break;
            case "No":
                if (!fs.existsSync(OUTPUT_DIR)) {
                    fs.mkdirSync(OUTPUT_DIR);
                }
                fs.writeFileSync(outputPath, render(employees), "utf8");
                console.log(
                    "Team successfully assembled."
                );
                break;
        }
    } catch (err) {
        console.log(err);
    }
}










// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
