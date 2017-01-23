Meteor.methods({
	parseUpload:function(data){
		check(data, Array);

		for (let i = 0; i < data.length; i++) {
			let item = data[i],
				exists = Videos.findOne({video: item.video});

			if (!exists){
				Videos.insert(item);
			} else {
				console.warn('Rejected. This item already exists.');
			}

		}
	},
	storeUrlInDatabase: function( url ) {
		check( url, String );
		Modules.both.checkUrlValidity( url );
	},
	fileRestrictions:function(data){
		if (data === 'video'){
			Slingshot.fileRestrictions( "uploadToAmazonS3", {
			  allowedFileTypes: /^video/ ,
			  maxSize: 10000 * 1024 * 1024
			});
		} else if (data === 'poster'){
			Slingshot.fileRestrictions( "uploadToAmazonS3", {
			  allowedFileTypes: /^image/ ,
			  maxSize: 10000 * 1024 * 1024
			});
		}
	},
	clientAddress:function(){
		return this.connection.clientAddress;	
	},
	viewCount:function(clientIP, videoId){
		Videos.update({_id: videoId}, {$addToSet: {views: clientIP}});
	},
	createAccount:function(data){
		return Accounts.createUser({
			username: data.username,
			password: data.password
		});
	},
	createProfile:function(data2){
		if (data2.faction === 'alliance'){
			var avatar = '/images/alliance_symbol.png';
		} else if (data2.faction === 'horde'){
			var avatar = '/images/horde_symbol.png';
		}

		
		if (!Profiles.findOne({username: data2.username})) {
			Profiles.insert({username: data2.username, userId: data2.userId, avatar: avatar});
		}
	},
	newComment:function(data){

		Comments.insert({userId: data.userId, comment: data.comment, videoId: data.videoId});

	}
});