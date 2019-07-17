


export const ReceptType = () => {

    var RNFS = require('react-native-fs')
    RNFS.readFile('../assets/recipetypes.xml', 'utf8')
        .then((contents) => {
            console.log("Fs"+contents)
            var XMLParser = require('react-xml-parser');
            var xml = new XMLParser().parseFromString(xmlText);    // Assume xmlText contains the example XML
            console.log(xml);
            console.log(xml.getElementsByTagName('Name'));
        })


}
