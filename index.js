const inquirer = require('inquirer');
const fs = require('fs');

inquirer
  .prompt([
    {
      type: 'input',
      message: 'What is your GitHub username?',
      name: 'github',
    },
    {
        type: 'input',
        message: 'What is your email address?',
        name: 'email',
      },
    {
      type: 'input',
      message: `What is your project's name?`,
      name: 'projectName',
    },
    {
      type: 'input',
      message: 'Please write a short description of your project?',
      name: 'description',
    },
    {
        type: 'list',
        message: 'What license applies?',
        choices: [`MIT`, `Apache License 2.0`, `BSD 3-Clause "New" or "Revised" license`, `Mozilla Public License 2.0`, `IBM Public License Version 1.0`],
        name: 'licensed',
    },
    {
        type: 'input',
        message: 'What command should be run to install dependencies?',
        name: 'install',
    },
    {
        type: 'input',
        message: 'What command should be run to run tests?',
        name: 'tests',
    },
    {
        type: 'input',
        message: 'What does the user need to know about using the repo?',
        name: 'needs2know',
    },
  ])
  .then((response) => {
    const {github, email, projectName, description, licensed, install, tests, needs2know} = response;
    let licBadge = "";
    let licLink = "";
    let TofContents = "";

    switch (licensed) {
        case `MIT`:
            licBadge =  `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`;
            licLink = `[ [${licensed}] ](https://opensource.org/licenses/MIT)`;
            break;
        case `Apache License 2.0`:
            licBadge =  "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
            licLink = `[ [${licensed}] ](https://opensource.org/licenses/Apache-2.0)`;
            break;
        case `BSD 3-Clause "New" or "Revised" license`:
            licBadge =  "[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)";
            licLink = `[ [${licensed}] ](https://opensource.org/licenses/BSD-3-Clause)`;
            break;
        case `Mozilla Public License 2.0`:
            licBadge =  "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
            licLink = `[ [${licensed}] ](https://opensource.org/licenses/MPL-2.0)`;
            break;
        case `IBM Public License Version 1.0`:
            licBadge =  "[![License: IPL 1.0](https://img.shields.io/badge/License-IPL%201.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)";
            licLink = `[ [${licensed}] ](https://opensource.org/licenses/IPL-1.0)`;
            break;
        default:
            console.log('not found');
            break;
    }

    if (!projectName) {
        projectName = "Project [unnamed]"
    }
    var innHTML = ``;

    if (install) {
        TofContents += "- [Installation](##🛠️Installation)\n";
        innHTML += `\n------------
## 🛠️Installation
To install necessary dependencies, run the following command:\n
${install}
`;
    }
    if (needs2know) {
        TofContents += "- [Usage](##📐Usage)\n";
        innHTML += `\n------------
## 📐Usage
Please see below for instructions on usage:\n
${needs2know}
`;
    }
    TofContents += "- [License](##📋License)\n";
    innHTML += `\n------------
## 📋License
Please click on the following link to view a summary of this license:\n
${licLink}
`;
    if (github || email) {
        TofContents += "- [Contributing](##📝Contributing)\n";
        innHTML += `\n------------
## 📝Contributing
`;
        if(github) {
            innHTML += `\n[ [${github}] ](https://github.com/${github})\n`;
        }
        if(email) {
            innHTML += `\n\n${email}\n`;
        }
    }
    if (tests) {
        TofContents += "- [Tests](##✔️Tests)\n";
        innHTML += `\n------------
## ✔️Tests
To test the program, please run the following:\n
${tests}
`;   
    }

    var innHTML0 = `# ${projectName}
${licBadge}
------------
## Description:
${description}

Table of Contents

${TofContents}
`;
    innHTML = innHTML0+innHTML;
    fs.writeFile(`README.md`, `${innHTML}`, (err) =>
    err ? console.error(err) : console.log('SAVED!')
    )}
)