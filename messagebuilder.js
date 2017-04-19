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


var buildTextMessage = function(recipientId, messageText, metadata) {
  return {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText,
      metadata: metadata
    }
  };
}

var buildListMessage = function(recipientId, stateContent) {
  console.log(stateContent);

  if (!stateContent.responses || stateContent.responses.length === 0) {
    return buildTextMessage(recipientId, "THE END");
  }

  if (stateContent.responses.length === 1) {
    return messageData = {
      recipient: {
        id: recipientId
      },
      message: {
        attachment: {
          type: "template",
          payload: {
            template_type: "button",
            text: stateContent.responses[0].text,
            buttons:[{
              type: "postback",
              title: stateContent.responses[0].text,
              payload: stateContent.responses[0].link
            }]
          }
        }
      }
    }
  }
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "list",
          top_element_style: "compact",
          elements:[]
        }
      }
    }
  };

  for (var i in stateContent.responses) {
  messageData.message.attachment.payload.elements.push(
    {
      title: stateContent.responses[i].text,
      "buttons" : [
        {
          type: "postback",
          title: stateContent.responses[i].text,
      payload: stateContent.responses[i].link

        }
      ]
    });
  }

  return messageData;
}

module.exports = {
  setServerURL: setServerURL,
  buildLinkMessage: buildLinkMessage,
  buildImageMessage: buildImageMessage,
  buildTextMessage: buildTextMessage,
  buildListMessage: buildListMessage
};

