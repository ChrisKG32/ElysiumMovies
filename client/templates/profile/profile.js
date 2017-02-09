

Template.profile.events({
	'click #user-videos tbody tr':function(e, tmpl){
		var target = $(e.target);

		if (target.hasClass('video-name')){
			FlowRouter.go('/video/' + this._id);
		} else if (target.hasClass('edit-video')){
			tmpl.editVideo.set(this);
		} else if (target.hasClass('delete-video')){
			var confirmDelete = confirm('Are you sure you with to delete ' + this.name + '?');
			if (confirmDelete){
				Meteor.call('deleteVideo', this);
			}
		}
		console.log(this);
		
	},
	'submit #video-form':function(e, tmpl){
		tmpl.editVideo.set(false);
	},
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
	
Template.profile.helpers({
	editVideo:function(){
		if (Template.instance().editVideo.get()){
			return Template.instance().editVideo.get()
		} else {
			return false
		}
	},
	settings:function(){

		var vidCol = Videos.find({author: Meteor.userId()})
		
		return {
			collection: vidCol,
			rowsPerPage: 10,
			showFilter: true,
			fields: [
				{key: 'name', label: 'Name', headerClass: 'text-left', cellClass: 'text-left video-name',
					fn:function(value, object, key){
						if (!!value && value.length > 25){
							return value.substr(0, 25) + '...'
						} else {
							return value
						}
					}
				},
				{key: 'type', label: 'Type', headerClass: 'text-center', cellClass: 'text-center'},
				{key: 'viewCount', label: 'Views', headerClass: 'text-center', cellClass: 'text-center', 
					fn:function(value, object, key){
						if (!value){
							return 0
						} else {
							return value
						}
						
					}
				},
				{key: 'likes', label: 'Likes', headerClass: 'text-center', cellClass: 'text-center', 
					fn:function(value, object, key){
						if (!value){
							return 0
						} else {
							return value
						}
						
					}
				},
				{key: 'name', label: 'Edit', headerClass: 'text-center', cellClass: 'text-center edit-video', 
					fn:function(value, object, key){
						return 'EDIT'
					}
				},
				{key: 'name', label: 'Delete', headerClass: 'text-center', cellClass: 'text-center delete-video', 
					fn:function(value, object, key){
						return 'DELETE'
					}
				}

			]
		}
	},
	classSelected:function(param1){
		var classSelected = Template.instance().classSelected.get()
		if (classSelected){
			return classSelected
		} else {
			return 'All Classes'
		}
	},
	categorySelected:function(param1){
		if (Template.instance().categorySelected.get() === param1) {
			return 'active'
		} else {
			return ''
		}
	},
});

Template.profile.onCreated(function(){
	this.categorySelected = new ReactiveVar(false);
	this.classSelected = new ReactiveVar(false);


	this.videoCheck = new ReactiveVar(false);
	uploadType = new ReactiveVar(false);
	videoURL = new ReactiveVar(false);
	hdVideoURL = new ReactiveVar(false);
	posterURL = new ReactiveVar(false);
	this.editVideo = new ReactiveVar(false);

	AutoForm.debug();
});

Template.profile.onRendered(function(){

});



