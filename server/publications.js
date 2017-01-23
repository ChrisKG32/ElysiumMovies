



Meteor.publish('videos', function(server){
	if (server){
		return Videos.find({server: server})
	} else {
		return Videos.find({})
	}
	
});

Meteor.publish('profiles', function(){
	return Profiles.find({})
});

Meteor.publish('comments', function(){
	return Comments.find({})
});