Modules = {};
Modules.both = {};

let _fileExistsInDatabase = ( url ) => {
  if (Videos.findOne({video: url})){
    return true
  } else {
    return false
  }
};

let _isNotAmazonUrl = ( url ) => {
  return ( url.indexOf( 's3.amazonaws.com' ) < 0 );
};

let _validateUrl = ( url ) => {
  if ( _fileExistsInDatabase( url ) ) {
    return { valid: false, error: "Sorry, this file already exists!" };
  }

  if ( _isNotAmazonUrl( url ) ) {
    return { valid: false, error: "Sorry, this isn't a valid URL!" };
  }

  return { valid: true };
};

let validate = ( url ) => {
  let test = _validateUrl( url );

  if ( !test.valid ) {
    throw new Meteor.Error( "file-error", test.error );
  }
};

Modules.both.checkUrlValidity = validate;