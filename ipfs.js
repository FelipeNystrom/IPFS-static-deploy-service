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
fs.watch(toDeploy, async changedFiles => {
  console.log('these files have changed', changedFiles);
  if (changedFiles) {
    console.log('re-deploying to IPFS');

    return publishOnIPFS();
  }
});

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
      'Publishing to IPFS. This can take some time. Please have bear with us!'
    );

    const deployed = await ipfs.name.publish(lastHash);
    const peerId = deployed.name;

    console.log(
      'deployed ',
      deployed,
      `to IPFS. Visit https://ipfs.io/ipns/${peerId} to visit your site.`
    );

    return;
  } catch (err) {
    return console.log(err);
  }
};
