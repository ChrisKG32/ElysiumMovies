

Template.popularVideos.helpers({
	spotlight: function(param1){
		return Videos.find({}, {sort: {views: -1}, limit: 4});
	},
	views:function(){
		var views = this.views;
		if (!views || views.length < 1){
			return '0'
		} else {
			return views.length
		}
	},
	likes:function(){
		var likes = this.likes;
		if (!likes || likes.length < 1){
			return '0'
		} else {
			return likes.length
		}
	}
});


Template.popularVideos.onCreated(function(){
	let template = Template.instance();
		
	template.autorun( ()=> {
		var server = serverSelected.get();
		this.subscribe('videos', server);
	});
	
	this.subscribe('profiles');
});