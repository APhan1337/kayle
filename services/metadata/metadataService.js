const { Connection, programs } = require("@metaplex/js");
const {
  metadata: { Metadata },
} = programs;

// @swagger
// components:
//   schemas:
//     Book:
//       type: object
//       required:
//         - title
//         - author
//         - finished
//       properties:
//         id:
//           type: integer
//           description: The auto-generated id of the book.
//         title:
//           type: string
//           description: The title of your book.
//         author:
//           type: string
//           description: Who wrote the book?
//         finished:
//           type: boolean
//           description: Have you finished reading it?
//         createdAt:
//           type: string
//           format: date
//           description: The date of the record creation.
//       example:
//          title: The Pragmatic Programmer
//          author: Andy Hunt / Dave Thomas
//          finished: true

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
