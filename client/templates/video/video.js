
Template.video.events({

	'click .definition-btn':function(e, tmpl){
		var currentTarget = $(e.currentTarget);
		if (currentTarget.hasClass('sd-button')) {
			tmpl.videoQuality.set('SD');
		} else if (currentTarget.hasClass('hd-button')) {
			tmpl.videoQuality.set('HD');
		}
		$('.definition-btn').removeClass('active');
		currentTarget.addClass('active');
	},
	'click .submit-comment':function(e, tmpl){
		var commentInput = $('textarea#comment');
		var commentText = commentInput.val();
		var videoId = commentInput.attr('video-id');

		if (commentText) {
			var data = {
				userId: Meteor.userId(),
				comment: commentText,
				videoId: videoId
			}
			Meteor.call('newComment', data, function(e, r){
				if (e){
					alert(e.reason);
				} else {
					commentInput.val('');
				}
			});
		}
	},
	'click .load-more-comments button':function(e, tmpl){
		tmpl.commentMax.set(tmpl.commentMax.get() + 5);
	}
});



Template.video.helpers({
	param:function(){
		
		return Videos.findOne(FlowRouter.getParam('id'))
	},
	avatar:function(){
		var profileFind = Profiles.findOne({userId: this.userId});
		return profileFind && profileFind.avatar;
	},
	authorUsername:function(){
		var userId = this.author;
		if (!!userId) {
			var userProfile = Profiles.findOne({userId: userId});
			var username = userProfile && userProfile.username;
			return username
		}
	},
	maxComments:function(){

		var commentLimit = Template.instance().commentMax.get();
		var commentList = Comments.find({videoId: FlowRouter.getParam('id')}).fetch();
		var totalComments = commentList.length;
		return totalComments <= commentLimit
	},
	commentsList:function(){
		var commentLimit = Template.instance().commentMax.get();
		var videoComments = Comments.find({videoId: FlowRouter.getParam('id')}, {sort: {createdAt: -1}, limit: commentLimit}).fetch();
		if (videoComments && videoComments.length > 0){
			return videoComments
		} else {
			return false
		}
	},
	userAvatar:function(){
		return Profiles.findOne({userId: Meteor.userId()}) && Profiles.findOne({userId: Meteor.userId()}).avatar
	},
	username:function(){
		
		var userId = this.userId;
		var profile = Profiles.findOne({userId: userId});

		return profile && profile.username
	},
	timeCommented:function(){
		var date = this.createdAt;
		return moment(date).fromNow();
	},
	youtubeEmbed:function(){
		var video = this.video;

		if (~video.indexOf('youtube') || ~video.indexOf('youtu.be') || ~video.indexOf('<iframe') || ~video.indexOf('watch?v=')){

			//Youtube link confirmed

			if (~video.indexOf('watch?v=')){
				var embed = video.replace('watch?v=', 'embed/');
			} else if (~video.indexOf('/youtu.be/')){
				var embed = video.replace('youtu.be', 'www.youtube.com/embed');
			} else if (~video.indexOf('youtube.com/embed/')){
				if (~video.indexOf('<iframe')) {
					var startPath = video.indexOf('src="');
					var endPath = video.indexOf('frameborder');
					var embed = video.substr(startPath + 5, (endPath - 2) - (startPath + 5));
				} else {
					if (video.indexOf('https://') === 0){
						var embed = video;
					} else {
						var embed = video.substr(video.indexOf('https:/'), video.length);
					}
				}
			}
			return embed
		} else {

			// Other than youtube link. Just use the raw link.

			var embed = video;
			return embed;
		}

	},
	youtubeVideo:function(){

		var video = this.video;

		if (~video.indexOf('youtube') || ~video.indexOf('youtu.be') || ~video.indexOf('<iframe') || ~video.indexOf('watch?v=')){

			//Youtube link confirmed
			return true

		} else {

			// Other than youtube link. Just use raw link.

			return false
		}

	},
	qualityType:function(){

		var videoQuality = Template.instance().videoQuality.get();
		if (videoQuality === 'SD') {
			return this.video
		} else if (videoQuality === 'HD') {
			return this.hdvideo
		}
	},
	selfUsername:function(){
		var currentUser = Meteor.userId();
		var userProfile = Profiles.findOne({userId: currentUser});
		var username = userProfile && userProfile.username;

		return username
	}
});


Template.video.onCreated(function(){
	this.subscribe('videos');
	this.videoQuality = new ReactiveVar('SD');
	this.subscribe('profiles');
	this.subscribe('comments');
	this.commentMax = new ReactiveVar(5);
});

Template.video.onRendered(function(){
	Meteor.call('viewCount', Session.get('clientIP'), FlowRouter.getParam('id'));

});
