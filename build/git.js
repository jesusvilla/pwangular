/*require('simple-git')()
   .addRemote('origin', 'master')
   .then(function() {
      console.log('Starting pull...');
   })
   .pull(function(err, update) {
      if(update && update.summary.changes) {
         require('child_process').exec('yarn run dev');
      }
   })
   .then(function() {
      console.log('pull done.');
   });*/
var shell = require('shelljs');
if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}
if (shell.exec('git pull origin master').code !== 0) {
  shell.echo('Error: Git commit failed');
  shell.exit(1);
}else{
  shell.echo('Pull successfull')
}