const { Connection, programs } = require("@metaplex/js");
const {
  metadata: { Metadata },
} = programs;

async function getMetadataByPublicKey(solanaCluster, tokenPublicKey) {
  let metadataResult = {
    success: true,
    value: null,
    message: "Successfully retrieved Metadata information.",
  };

  try {
    const connection = new Connection(solanaCluster);
    let ownedMetadata = await Metadata.load(connection, tokenPublicKey);
    metadataResult.value = ownedMetadata.data.data;
  } catch (error) {
    metadataResult.success = false;
    metadataResult.value = null;
    metadataResult.message = error.message;
  }
  return metadataResult;
}

module.exports = { getMetadataByPublicKey };
