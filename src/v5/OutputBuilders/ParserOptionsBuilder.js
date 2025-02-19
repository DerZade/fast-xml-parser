const trimParser = require("../valueParsers/trim")
const booleanParser = require("../valueParsers/booleanParser")
const currencyParser = require("../valueParsers/currency")
const numberParser = require("../valueParsers/number")

const defaultOptions={
  nameFor:{
    text: "#text",
    comment: "",
    cdata: "",
  },
  // onTagClose: () => {},
  // onAttribute: () => {},
  piTag: false,
  declaration: false, //"?xml"
  tags: {
    valueParsers: [
      // "trim",
      // "boolean",
      // "number",
      // "currency",
      // "date",
    ]
  },
  attributes:{
    prefix: "@_",
    suffix: "",
    groupBy: "",
    
    valueParsers: [
      // "trim",
      // "boolean",
      // "number",
      // "currency",
      // "date",
    ]
  }
}
function buildOptions(options){
  //clone
  const finalOptions = { ... defaultOptions};

  //add config missed in cloning
  finalOptions.tags.valueParsers.push("trim")
  finalOptions.tags.valueParsers.push("boolean")
  finalOptions.tags.valueParsers.push("number")
  finalOptions.tags.valueParsers.push("currency")

  //add config missed in cloning
  finalOptions.attributes.valueParsers.push("trim")
  finalOptions.attributes.valueParsers.push("boolean")
  finalOptions.attributes.valueParsers.push("number")
  finalOptions.attributes.valueParsers.push("currency")

  copyProperties(finalOptions,options);
  return finalOptions;
}

function copyProperties(target, source) {
  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      if (typeof source[key] === 'object' && !Array.isArray(source[key])) {
        // Recursively copy nested properties
        if (typeof target[key] === 'undefined') {
          target[key] = {};
        }
        copyProperties(target[key], source[key]);
      } else {
        // Copy non-nested properties
        target[key] = source[key];
      }
    }
  }
}

function registerCommonValueParsers(){
  return {
    "trim": new trimParser(),
    // "join": this.entityParser.parse,
    "boolean": new booleanParser(),
    "number": new numberParser({
          hex: true,
          leadingZeros: true,
          eNotation: true
        }),
    "currency": new currencyParser(),
    // "date": this.entityParser.parse,
  }
}

module.exports = {
  buildOptions : buildOptions,
  registerCommonValueParsers: registerCommonValueParsers
}