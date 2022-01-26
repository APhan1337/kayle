const { Connection, programs } = require('@metaplex/js');
const { metadata: { Metadata } } = programs;

async function getMetadataByPublicKey(solanaCluster, tokenPublicKey) {
  const connection = new Connection(solanaCluster);
  console.log(tokenPublicKey);
  try {
    const ownedMetadata = await Metadata.load(connection, tokenPublicKey);
    return ownedMetadata;
  } catch {
    console.log('Failed to fetch metadata');
  }
};

module.exports = { getMetadataByPublicKey };