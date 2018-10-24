/** Anthony Ritz
 */

var keystone = require('keystone');

exports.getAvailableLanguage = async function() {
	var LanguageModel = keystone.list('Language');

	var result = await LanguageModel.model.find().exec(
		async function(err, langs){
			var languageTypes = new Array();
			langs.forEach((lang) => languageTypes.push(lang.abbreviation))
			return await languageTypes;
		});
	return result; 
};


