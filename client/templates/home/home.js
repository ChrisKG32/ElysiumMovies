
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
	Session.set('popularVids', Videos.find({server: serverSelected.get()}, {sort: {viewCount: -1}, limit: 4}).fetch());
});
