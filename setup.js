console.log("Setting up project...");
const fs = require('fs');
const config = require('./setup.json');
const packageJSON = require('./package.json');

packageJSON.name = config.package.name;
packageJSON.description = config.package.description;
packageJSON.keywords = config.package.keywords;
packageJSON.author = config.package.author;
packageJSON.contributors = config.package.contributors;
packageJSON.license = config.package.license;
packageJSON.repository.url = "git+" + config.package.repositoryURL;

let url = config.package.repositoryURL.replace('.git', '');

packageJSON.bugs.url = url + "/issues";
packageJSON.homepage = url + "#readme";

let sonarConfig = "";
sonarConfig += "sonar.projectKey=" + config.sonar.projectKey + "\n";
sonarConfig += "sonar.organization=" + config.sonar.organization + "\n";
sonarConfig += "sonar.javascript.lcov.reportPaths=./coverage/lcov.info" + "\n";
sonarConfig += "sonar.coverage.exclusions=src/tests/**/*,src/ignoreCoverage/**/*" + "\n";
sonarConfig += "sonar.exclusions=src/tests/**/*,src/ignoreCoverage/**/*" + "\n";
sonarConfig += "sonar.qualitygate.wait=true" + "\n";
sonarConfig += "sonar.qualitygate.timeout=300" + "\n";

fs.writeFile ("./package.json", JSON.stringify(packageJSON, null, 2), function(err) {
        if (err) throw err;
        console.log('package.json done...');
    }
);

fs.writeFile ("./sonar-project.properties", sonarConfig, function(err) {
        if (err) throw err;
        console.log('sonar-project.properties done...');
    }
);

console.log("Setup done.");
