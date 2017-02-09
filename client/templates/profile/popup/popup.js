Template.popup.events({
	'click .fa-close, click .cancel-delete':function(e){
		Session.set('selectedIngredient', false);
		Session.set('selectedRecipe', false);
	},
	'click .delete':function(e){
		if (Session.get('selectedIngredient')) {
			var entry = Session.get('selectedIngredient');
			var type = 'ingredient';
		} else if (Session.get('selectedRecipe')){
			var entry = Session.get('selectedRecipe');
			var type = 'recipe';
		}
		
		Meteor.call('deleteEntry', entry, type, function(){
			Session.set('selectedIngredient', false);
			Session.set('selectedRecipe', false);
		});
	}
});

Template.popup.helpers({
	selectedIngredient:function(){
		return Session.get('selectedIngredient') || Session.get('selectedRecipe');
	},
	youtubeVideo:function(){
		var video = Template.instance().videoCheck.get();
		if (video){
			var youtube = (video.indexOf('youtube.com/embed/') > 0) || (video.indexOf('youtube.com/watch') > 0) || (video.indexOf('youtu.be/') > 0);
		}

		if (youtube){
			return true
		} else {
			return false
		}
		
	},
	youtubeEmbed:function(){
		var video = Template.instance().videoCheck.get();

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


		// OLD CODE

		// if (!(~video.indexOf('//youtu.be/')) && !(~video.indexOf('www.youtube.com/embed/')) && !(~video.indexOf('watch?v='))) {
		// 	var embed = video;
		// } else if (~video.indexOf('//youtu.be/')) {
		// 	var embed = video.replace('youtu.be', 'www.youtube.com/embed');
		// } else if (~video.indexOf('youtube.com/embed/')) {
		// 	if (~video.indexOf('<iframe')) {
		// 		var startPath = video.indexOf('src="');
		// 		var endPath = video.indexOf('frameborder');
		// 		var embed = video.substr(startPath + 5, (endPath -2) - (startPath + 5));
		// 	} else {
		// 		if (video.indexOf('https://') === 0){
		// 			var embed = video;
		// 		} else {
		// 			var embed = video.substr(video.indexOf('https:/'), video.length);
		// 		}
		// 	}
		// } else if (~video.indexOf('watch?v=')){
		// 	var embed = video.replace('watch?v=', 'embed/');

		// } else {
		// 	var embed = video
		// }
		return embed
	},
	videoURL:function(){
		return videoURL.get()
	},
	hdVideoURL:function(){
		return hdVideoURL.get()
	},
	posterURL:function(){
		return posterURL.get()
	},
	videoUploaded:function(){
		return uploadType.get()
	}
});