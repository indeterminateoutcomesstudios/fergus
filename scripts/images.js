// helper function, get star
function getStar(h, s, arr) {
	let star;
	// no promotion heroes
	if(arr[h].form.length === 1) {
		// star is accounted for when initialized
		// user star input is ignored for these heroes
		star = arr[h].form.length - 1;
	}
	// 3-promotion heroes
	else if(arr[h].form.length === 3) {
		s = parseInt(s);
		if(s > 3 && s < 7) {
			star = s - 4;
		}
		else {
			return `${h} does not have a ${s}-star form!`;
		}
	}
	// 6-promotion heroes
	else if(arr[h].form.length === 6){
		s = parseInt(s);
		if(s > 0 && s < 7) {
			star = s - 1;
		}
		else {
			return `${h} does not have a ${s}-star form!`;
		}
	}
	// exception, should not be possible to enter this case
	else {
		console.log('error');
		return 'Error: Please let the Bot Author know or submit an issue at https://github.com/Johj/fergus/issues';
	}
	return star;
}

module.exports = {
	getImage: function(args, arr) {
		let str = '', len = args.length;
		// 0 arguments, !image
		if(len === 1) {
			str = '*!image list|<name> <star>*, ' +
				'e.g. !image list, !image mew, !image mew 4; ' +
				'Defaults to 6-star whenever *<star>* is not specified.';
		}
		// 1 argument or more, !image list|<name> [<star>]
		else {
			// !image list
			if(args[1] === 'list') {
				str = '```' + Object.keys(arr).join(', ') + '```';
			}
			// <name> exists
			else if(arr[args[1]]) {
				// default to highest form index
				let star = arr[args[1]].form.length;

				// 1 argument, <name>
				if(len === 2) {
					str = './cqdb/assets/heroes/' + arr[args[1]].class.toLowerCase() +
					'/' + args[1];
					if(star === 3) {
						star += 3;
					}
					if(star >= 6) {
						str += star.toString();
					}
					str += '.png';

					let fs = require('fs');
					if(!fs.existsSync(str)) {
					  str = `${args[1]} does not have an image in the database yet!`;
					}
				}
				// 2 arguments or more, <name> <star>
				else {
					str = 'wip';
				}
			}
			// !image <junk>
			else {
				str = `${args[1]} is not a valid hero name!`;
			}
		}
		return str;
	}
};