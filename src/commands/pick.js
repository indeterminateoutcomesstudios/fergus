const { getPrefix, } = require('../util/get.js');
const { random, } = require('../util/random.js')

pickInstructions = (message) => {
  const prefix = getPrefix(message);
  return {
    title: `${prefix}pick [<list>]`,
    fields: [
      {
        name: '<list>',
        value: `Pick one item randomly from a comma-separated list.\n*e.g. ${prefix}pick milk, bread, eggs*`,
      },
    ],
  };
}

pickItem = (args) => {
  const list = args.join(' ').split(',');
  
  return {
    title: 'I pick...',
    description: `${list[random(0, list.length - 1)]}!`,
  };
}

exports.run = (message, args) => {
  const e = !args.length ? pickInstructions(message) : pickItem(args);

  message.channel.send({ embed: e, });
}
