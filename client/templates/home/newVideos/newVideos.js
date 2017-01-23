
Template.newVideos.events({
	'click .new-item':function(e, tmpl){
		FlowRouter.go('/video/' + this._id);
	}
});

Template.newVideos.helpers({
	newVids:function(){
		var newVids = Videos.find({}, {sort: {createdAt: -1}, limit: 10}).fetch();

		newVids = newVids.filter(function(entry){
			entry.views = entry && entry.views && entry.views.length;
			entry.likes = entry && entry.likes && entry.likes.length;
			entry.author = Profiles.findOne({userId: entry.author}) && Profiles.findOne({userId: entry.author}).username
			return true
		});
		return newVids
	},
});

Template.newVideos.onCreated(function(){
	let template = Template.instance();
	
	template.autorun( ()=> {
		var server = serverSelected.get();
		this.subscribe('videos', server);
	});
	
	this.subscribe('profiles');

});

Template.newVideos.onRendered(function(){

});