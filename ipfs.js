const fs = require('fs');
const path = require('path');
const ipfs = require('./nodeSetup');

const toDeploy = path.join(__dirname, '/client/build');

fs.access(toDeploy, err => {
  console.log(`Production folder ${err ? 'does not exist.' : 'exists.'}`);

  // if build folder does not exist. Exit deploy process
  if (err) {
    console.log(
      'Create a minified version of your React app before trying to deploy to IPFS'
    );
    return;
  }

  return publishOnIPFS();
});
// Watch build folder for changes

const publishOnIPFS = async () => {
  console.log('Preparing to deploy build folder to IPFS');

  try {
    const result = await ipfs.util.addFromFs(toDeploy, {
      recursive: true
    });

    console.log('deployed', result.length, ' files to IPFS. Files: ', result);

    let lastHash;
    for (let i = 0; i < result.length; i++) {
      let file = result[i];
      if (/build$/.test(file.path)) {
        lastHash = file.hash;
        break;
      }
    }
    console.log('Hash of build folder', lastHash);

    console.log(
      'Publishing to IPFS. This can take some time. Please be patient'
    );

    const deployed = await ipfs.name.publish(lastHash);
    const peerId = deployed.name;
    console.log(`your peerID is `, peerId);
    console.log(
      `deployed site to IPFS. Visit on https://ipfs.io/ipns/${peerId}.`
    );

    return;
  } catch (err) {
    return console.log(err);
  }
};
