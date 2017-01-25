Template.upload.events({
	'click .sd-video-select, click .poster-select, click .hd-video-select':function(e, tmpl){
		var currentTarget = $(e.currentTarget);
		if (currentTarget.hasClass('hd-video-select')){
			$('#hd-video-file').click();
		} else if (currentTarget.hasClass('sd-video-select')){
			$('#sd-video-file').click();
		} else if (currentTarget.hasClass('poster-select')){
			$('#poster-file').click();
		}
		
	},
	'change #sd-video-file, change #poster-file, change #hd-video-file':function(e, tmpl){
		var currentTarget = $(e.currentTarget);
		if (currentTarget.attr('id') === 'sd-video-file'){
			uploadType.set('video');

		} else if (currentTarget.attr('id') === 'hd-video-file'){
			uploadType.set('hd-video');
		} else if (currentTarget.attr('id') === 'poster-file'){
			uploadType.set('poster');
		}

		Meteor.call('fileRestrictions', uploadType.get(), function(){
			Modules.client.uploadToAmazonS3( {event: e, template: tmpl} );
		});
	},
	'click .sd-video-preview':function(e, tmpl){
		var url = $('input[data-schema-key="video"]').val();
		videoURL.set(url);
		tmpl.videoCheck.set(false);
		tmpl.videoCheck.set(url);

	},
	'click .hd-video-preview':function(e, tmpl){
		var url = $('input[data-schema-key="hdvideo"]').val();
		hdVideoURL.set(url);
		tmpl.videoCheck.set(false);
		tmpl.videoCheck.set(url);
	},
	'click .poster-preview':function(e, tmpl){
		var url = $('input[data-schema-key="poster"]').val();
		posterURL.set(url);
	},
	'click button[type="submit"]':function(e, tmpl){
		var videoInput = $('input[name="video"]');
		var posterInput = $('input[name="poster"]');
		var sdHelpBlock = $('.sd-help-block');
		var vpHelpBlock = $('.vp-help-block');
		var videoLabel = $('label[for="video"]');
		var posterLabel = $('label[for="poster"]');

		if (!videoInput.val()){
			videoInput.addClass('danger');
			sdHelpBlock.removeClass('hidden').addClass('danger');
			videoLabel.addClass('danger');
		} 
		if (!posterInput.val()){
			posterInput.addClass('danger');
			vpHelpBlock.removeClass('hidden').addClass('danger');
			posterLabel.addClass('danger');
		}
	}
	
});

Template.upload.helpers({
	youtubeVideo:function(){
		var video = Template.instance().videoCheck.get();
		if (video){
			return true
		
		}
		
	},
	youtubeEmbed:function(){
		var video = Template.instance().videoCheck.get();
		
		if (!(~video.indexOf('//youtu.be/')) && !(~video.indexOf('www.youtube.com/embed/')) && !(~video.indexOf('watch?v='))) {
			var embed = video;
		} else if (~video.indexOf('//youtu.be/')) {
			var embed = video.replace('youtu.be', 'www.youtube.com/embed');
		} else if (~video.indexOf('youtube.com/embed/')) {
			if (~video.indexOf('<iframe')) {
				var startPath = video.indexOf('src="');
				var endPath = video.indexOf('frameborder');
				var embed = video.substr(startPath + 5, (endPath -2) - (startPath + 5));
			} else {
				if (video.indexOf('https://') === 0){
					var embed = video;
				} else {
					var embed = video.substr(video.indexOf('https:/'), video.length);
				}
			}
		} else if (~video.indexOf('watch?v=')){
			var embed = video.replace('watch?v=', 'embed/');

		} else {
			var embed = video
		}

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

Template.upload.onCreated(function(){
	this.videoCheck = new ReactiveVar(false);
	uploadType = new ReactiveVar(false);
	videoURL = new ReactiveVar(false);
	hdVideoURL = new ReactiveVar(false);
	posterURL = new ReactiveVar(false);

	AutoForm.debug();
});