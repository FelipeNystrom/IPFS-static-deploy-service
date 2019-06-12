const IPFS = require('ipfs-http-client');
const { IPFS_HOST, IPFS_PORT } = process.env;

// Connect to local or remote node

module.exports = IPFS({
  host: IPFS_HOST,
  port: IPFS_PORT,
  // Depends on node if https is enabled
  protocol: 'http'
});
