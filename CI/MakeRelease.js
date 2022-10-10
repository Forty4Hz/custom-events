const standardVersion = require("standard-version");
const fs = require("fs");

//To run it as dry run
let dryRun = process.env.DRY_RUN || true;

dryRun = dryRun === "true" ? true : false

//The location of the CHANGELOG.md
const changeLogPath = "docs/CHANGELOG.md";

!fs.existsSync(`./docs/`) && fs.mkdirSync(`./docs/`, { recursive: true })

//The release information for standard version
const releaseOptions = {
    infile: changeLogPath,
    firstRelease: false,
    dryRun
}

function setOptions(){
    try {
        //If this is the first release
        if(!fs.existsSync(changeLogPath)) releaseOptions.firstRelease = true
    } catch (err) {
        console.error(err);
    }
}

setOptions();

standardVersion(releaseOptions).catch(err => console.error(err));
