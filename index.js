const IPFS = require('ipfs');
const node = new IPFS({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https'
});
