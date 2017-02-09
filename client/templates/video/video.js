
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
	'click .load-more-comments a':function(e, tmpl){
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

		var typeOne = 'youtu.be/';
		var typeTwo = 'youtube.com/embed/';
		var typeThree = 'youtube.com/watch?v=';

		var youtubeOne = video.indexOf(typeOne) > 0;
		var youtubeTwo = video.indexOf(typeTwo) > 0;
		var youtubeThree = video.indexOf(typeThree) > 0;
		var youtubeId = function(type){
			var startOfId = video.indexOf(type) + (type.length);
			var endOfId = function(){


				if ((video.substr(startOfId, video.length)).indexOf('&') > 0) {
					return (video.substr(startOfId, video.length)).indexOf('&')
				} else if ((video.substr(startOfId, video.length)).indexOf('"') > 0){
					return (video.substr(startOfId, video.length)).indexOf('"')
				} else {
					return (-1)
				}
			}

			if (endOfId() > 0){
				return video.substr(startOfId, endOfId())
			} else {
				return video.substr(startOfId, video.length)
			}
		};

		if (youtubeOne) {
			var embed = 'https://www.youtube.com/embed/' + youtubeId(typeOne);

			$('input[name="poster"]').val('https://img.youtube.com/vi/' + youtubeId(typeOne) + '/mqdefault.jpg')
			$('video.poster-preview').attr('poster', 'https://img.youtube.com/vi/' + youtubeId(typeOne) + '/mqdefault.jpg');
		} else if (youtubeTwo) {
			var embed = 'https://www.youtube.com/embed/' + youtubeId(typeTwo);

			$('input[name="poster"]').val('https://img.youtube.com/vi/' + youtubeId(typeTwo) + '/mqdefault.jpg')
			$('video.poster-preview').attr('poster', 'https://img.youtube.com/vi/' + youtubeId(typeTwo) + '/mqdefault.jpg');
		} else if (youtubeThree) {
			var embed = 'https://www.youtube.com/embed/' + youtubeId(typeThree);

			$('input[name="poster"]').val('https://img.youtube.com/vi/' + youtubeId(typeThree) + '/mqdefault.jpg')
			$('video.poster-preview').attr('poster', 'https://img.youtube.com/vi/' + youtubeId(typeThree) + '/mqdefault.jpg');
		}

		return embed

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
	
	var viewed = Session.get(FlowRouter.getParam("id"));
	if (viewed){
		var now = new Date();

		if ((now - viewed) > 600000){

			Meteor.call('viewCount', Session.get('clientIP'), FlowRouter.getParam('id'), function(){
				Session.set(FlowRouter.getParam("id"), new Date());
			});
		} else {

		}
	} else {

		Meteor.call('viewCount', Session.get('clientIP'), FlowRouter.getParam('id'), function(){
			Session.set(FlowRouter.getParam("id"), new Date());
		});
	}

});
