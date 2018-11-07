const fs = require('fs');
const path = require('path');
const IPFS = require('ipfs-api');
const ipfs = new IPFS({
  host: 'gateway.ipfs.io',
  port: 443,
  protocol: 'https'
});
const deploy = path.join(__dirname, '/client/build');
fs.access(deploy, err => {
  console.log(`Production folder ${err ? 'does not exist.' : 'exists.'}`);

  // if build folder does not exist. Exit deploy process
  if (err) {
    console.log(
      'Create a minified version of your React app before trying to deploy to IPFS'
    );
    return;
  }

  console.log(`Preparing to deploy to IPFS!`);

  fs.readdir(deploy, 'buffer', async (err, files) => {
    const build = files.map(file => file);

    console.log('Deploying!');

    // deploy to ipfs
    ipfs.add(build, console.log);
  });
});

// Watch build folder for changes
fs.watch(deploy, async changedFiles => {
  console.log('these files have changed', changedFiles);
});
const publishOnIPFS = async () => {};
