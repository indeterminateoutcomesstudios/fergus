const { getPrefix, } = require('../util/get.js');

printInstructions = () => {
  const prefix = getPrefix(message);
  return {
    title: `${prefix}print [<text>]`,
    fields: [
      {
        name: '<text>',
        value: `Print <text>.\n*e.g. ${prefix}print hello world*`,
      },
    ],
  };
}

printMessage = (message, args) => {
  message.delete();
  return { description: args.join(' '), };
}

exports.run = (message, args) => {
  const e = !args.length ? printInstructions(message) : printMessage(message, args);

  message.channel.send({ embed: e, });
}
