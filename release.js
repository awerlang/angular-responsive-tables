require('conventional-changelog')({
    repository: 'https://github.com/awerlang/angular-responsive-tables',
    version: require('./package.json').version
}, function(err, log) {
    var fs = require('fs');

    fs.writeFile('CHANGELOG.md', log, function (err){
        if(err) {
            console.log(err);
        } else {
            console.log("Change log generated and saved:", 'CHANGELOG.md');
        }
    });
});