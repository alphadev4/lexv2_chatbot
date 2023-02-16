

exports.handler = async (event) => {
  const intent = event['sessionState']['intent']['name']
  const sessionAttributes = event['sessionState']['sessionAttributes']
  if (!sessionAttributes) {
    sessionAttributes = {};
  }

  console.log(`Lex event info = ${JSON.stringify(event)}`);
  console.log(`lambda_handler: session_attributes = ${JSON.stringify(sessionAttributes)}`);


  if (HANDLERS[intent]) {
    return HANDLERS[intent].handler(event, sessionAttributes);
  }
};

function checkAccountBalanceHandler(intentRequest, sessionAttributes) {
  const { inputTranscript } = intentRequest;
  const accountId = inputTranscript;
    return {
      sessionState: {
        dialogAction: {
          type: 'Close',
        },
        intent: {
          name: intentRequest.sessionState.intent.name,
          state: 'Fulfilled',
        },
      },
      messages: [
        {
          contentType: 'PlainText',
          content: `Your current balance for account id ${accountId} is PKR/-10,000`,
        },
      ],
    };
}

function checkOkResponse(intentRequest, sessionAttributes){
    return {
      sessionState: {
        dialogAction: {
          type: 'Close',
        },
        intent: {
          name: intentRequest.sessionState.intent.name,
          state: 'Fulfilled',
        },
      },
      messages: [
        {
          contentType: 'PlainText',
          content: `Great 😊`,
        },
      ],
    };
}
const HANDLERS = {
  checkAccountBalance: { handler: checkAccountBalanceHandler },
  OkResponse: { handler: checkOkResponse}
};
