Template.mainLayout.onCreated(function(){
	Meteor.call('clientAddress', function(e, r){
		Session.set('clientIP', r);
	});

	this.subscribe('profiles');
	this.subscribe('videos');
});

