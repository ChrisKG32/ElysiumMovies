
Template.newVideos.events({
	'click .new-item':function(e, tmpl){
		FlowRouter.go('/video/' + this._id);
	}
});

Template.newVideos.helpers({
	newVids:function(){
		var newVids = Videos.find({}, {sort: {createdAt: -1}, limit: 10}).fetch();

		newVids = newVids.filter(function(entry){
			if (!entry.viewCount) {
				entry.viewCount = 0;
			}
			if (!entry.likeCount) {
				entry.likeCount = 0;
			}

			entry.author = Profiles.findOne({userId: entry.author}) && Profiles.findOne({userId: entry.author}).username

			return true
		});
		return newVids
	},
	name:function(){

		var name = this.name;
		if (!!name && name.length > 20){
			return name.substr(0, 20) + '...'
		} else {
			return name
		}
		
	}
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