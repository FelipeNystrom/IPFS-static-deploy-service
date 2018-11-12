const fs = require('fs');
const path = require('path');
const IPFS = require('ipfs-api');
const ipfs = IPFS({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https'
});

console.log(ipfs);

const toDeploy = path.join(__dirname, '/client/build');

console.log(toDeploy);

fs.access(toDeploy, err => {
  console.log(`Production folder ${err ? 'does not exist.' : 'exists.'}`);

  // if build folder does not exist. Exit deploy process
  if (err) {
    console.log(
      'Create a minified version of your React app before trying to deploy to IPFS'
    );
    return;
  }

  publishOnIPFS();
});
// Watch build folder for changes
fs.watch(toDeploy, async changedFiles => {
  console.log('these files have changed', changedFiles);
});

const publishOnIPFS = async () => {
  console.log('Preparing to deploy build folder to IPFS');

  try {
    const result = await ipfs.util.addFromFs(toDeploy, {
      recursive: true
    });

    console.log('length of result', result.length);

    let lastHash;
    for (let i = 0; i < result.length; i++) {
      let file = result[i];
      if (/build$/.test(file.path)) {
        lastHash = file.hash;
        break;
      }
    }
    console.log('Hash of build folder', lastHash);

    const published = await ipfs.name.publish(lastHash);

    console.log(published);
  } catch (err) {
    console.log(err);
  }
};
