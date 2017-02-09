
Template.home.events({
	'click .upload-video, click .upload-li':function(e, tmpl){
		FlowRouter.go('upload');
	},
});

Template.home.helpers({	
	authorHelper:function(){
		var value = this.author;
		if (!!value){
			var userProfile = Profiles.findOne({userId: value});
			var username = userProfile && userProfile.username;
			return username
		} else {
			return 'anonymous'
		}
	}
});

Template.home.onCreated(function(){
	/*
	let template = Template.instance();
	
	template.autorun( ()=> {
		var server = serverSelected.get();
		this.subscribe('videos', server);
	});
	
	this.subscribe('profiles');
	*/

	
});

Template.home.onRendered(function(){

	Tracker.autorun(function(){
		if (serverSelected.get() === undefined || serverSelected.get() === false){
			var userProfile = Profiles.findOne({userId: Meteor.userId()});
			var userServer = userProfile && userProfile.server;
			serverSelected.set(userServer);
		}
	});


});
