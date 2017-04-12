var SERVER_URL;

var setServerURL = function(url) {
  SERVER_URL = url;
}

var buildLinkMessage = function() {
  console.log("messagebuilder.createLinkMessage");
};

var buildImageMessage = function(recipientId, filename, metadata) {
  return {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "image",
        payload: {
          url: SERVER_URL + "/assets/" + filename
        }
      },
      metadata: metadata
    }
  };
}


module.exports = {
  setServerURL: setServerURL,
  buildLinkMessage: buildLinkMessage,
  buildImageMessage: buildImageMessage
};

