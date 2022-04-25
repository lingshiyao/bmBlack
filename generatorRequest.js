const fs = require('fs');
const path = require('path');
const walk = function (dir, done) {
    var results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        var pending = list.length;
        if (!pending) return done(null, results);
        list.forEach(function (file) {
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function (err, res) {
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    results.push(file);
                    if (!--pending) done(null, results);
                }
            });
        });
    });
};

async function getDirs(path) {
    return new Promise((resolve, reject) => {
        walk("./gql/", function (err, results) {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

async function read(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    });
}

async function write(path, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, content, err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    })
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getType(graphql) {
    const types = /(mutation)|(query)/gm.exec(graphql);
    if (!types) return "";
    return types[0];
}

function getMatchGroups(str, regex) {
    const matches = [];
    let match;
    while ((match = regex.exec(str))) {
        matches.push(match[1]);
    }
    return matches;
}

const main = async () => {
    const files = await getDirs("./gql/");
    // let code = `import { BugRequest } from "./BugRequest";\n`;
    let code = `import * as G from "./graphql";\n\n`;
    // code += `import {BestGql} from "./BestGql";\n\n`;
    code += `import {GqlCodeRouter} from "./GqlCodeRouter";\n\n`;
    code += `import {BusinessRequest} from "./BusinessRequest";\n\n`;
    code += `export class RequestG extends BusinessRequest {\n`;

    for (let i = 0; i < files.length; i++) {
        const fileName = files[i];
        const gql = await read(fileName);
        let is = gql.indexOf('(');
        let ie = gql.indexOf(')');
        const parts1 = fileName.split(`\\`);
        const parts2 = parts1[parts1.length - 1].split(`.`);
        const name = parts2[0];

        // const gqlFileName = `G.${capitalizeFirstLetter(name)}`;
        // const gqlFileName = `BestGql.${name}`;
        // TODO 使用中间层
        const gqlFileName = `GqlCodeRouter.getGqlCode("${name}")`;

        let type;
        let param;
        if (getType(gql) == "query") {
            type = `G.QueryRoot`;
            param = `params: G.QueryRoot${capitalizeFirstLetter(name)}Args, needauth: boolean = false`
        } else {
            type = `G.MutationRoot`;
            param = `params: G.MutationRoot${capitalizeFirstLetter(name)}Args, needauth: boolean = false`
        }
        if (ie - is == 0)
            param = `needauth: boolean = false`

        code += `\n\tpublic async ${name}(${param}): Promise<${type}["${name}"]> {\n`;
        let retuen = `\t\treturn <${type}["${name}"]>await this.getRequestPromise(${gqlFileName}, params, needauth);`
        if (ie - is == 0)
            retuen = `\t\treturn <${type}["${name}"]>await this.getRequestPromise(${gqlFileName}, {}, needauth);`
        code += retuen;
        code += `\n\t}\n`;
    }

    code += `}`;

    await write("./miniprogram/api/net/gql/RequestG.ts", code);
}
main();