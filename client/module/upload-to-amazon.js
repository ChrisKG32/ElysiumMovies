let template;
let _getFileFromInput = (event) => event.target.files[0];
//let _setPlaceholderText = (string = 'Click or Drag a file here to upload') => {
//	template.find('.alert span').innerText = string;
//}

let _addUrlToDatabase = ( url ) => {
  Meteor.call( "storeUrlInDatabase", url, ( error ) => {
    if ( error ) {
      Bert.alert( error.reason, "warning" );
      //_setPlaceholderText();
    } else {
      Bert.alert( "File uploaded to Amazon S3!", "success" );
      //_setPlaceholderText();
    }

    return url
  });
};


let _uploadFileToAmazon = (file) => {
	const upload = new Slingshot.Upload('uploadToAmazonS3');

	upload.send(file, (error, url) => {
		if (error){
			Bert.alert(error.message, "warning");
			//_setPlaceholderText();
		} else {
			//Bert.alert( "Image upload successfully.", "success" );
			_addUrlToDatabase(url);
			if (uploadType.get() && uploadType.get() === 'video'){
				videoURL.set(url);
			} else if (uploadType.get() && uploadType.get() === 'hd-video'){
				hdVideoURL.set(url);
			} else if (uploadType.get() && uploadType.get() === 'poster'){
				posterURL.set(url);
			}
		}
	});
	uploader.set(upload);
};

let upload = (options) => {
	/*
	var blob = dataURItoBlob(image);

	let file = blobToFile(blob, Random.id() + '.jpg');
	*/
	
	
	template = options.template;
	let file = _getFileFromInput(options.event);

	//_setPlaceholderText('Uploading ' + file.name + '...');
	
	_uploadFileToAmazon(file);
	
};

Modules.client.uploadToAmazonS3 = upload;