

Template.videoCategories.events({
	'click .video-categories .category-li a':function(e, tmpl){
		var currentTarget = $(e.currentTarget).parent().text();
		tmpl.categorySelected.set(currentTarget);
	},
	'click .class-dropdown .class-select a':function(e, tmpl){
		var currentTarget = $(e.currentTarget).parent().text();
		tmpl.classSelected.set(currentTarget);
	},
	'click #vid-categories tbody tr':function(e, tmpl){
		if (e.metaKey || e.ctrlKey){
			window.open('https://www.elysium-movies.com/video/' + this._id);
		} else {
			var target = $(e.target);
			FlowRouter.go('/video/' + this._id);
		}
		
	}
});


Template.videoCategories.helpers({
	categorySelected:function(param1){
		if (Template.instance().categorySelected.get() === param1) {
			return 'active'
		} else {
			return ''
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
	settings:function(){

		var classSelected = Template.instance().classSelected.get();
		var categorySelected = Template.instance().categorySelected.get();

		var options = {};
		if (serverSelected.get() && serverSelected.get() !== 'Any Server'){
			options.server = serverSelected.get();
		}
		if (categorySelected) {
			options.type = categorySelected;
		} 
		if (classSelected && classSelected !== 'All Classes') {
			options.class = classSelected;
		} 

		var vidCol = Videos.find(options);
		Meteor.setTimeout(function(){
			$('.reactive-table-input').attr('placeholder','Search');
		}, 200)
		
		
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
				{key: 'author', label: 'Poster', headerClass: 'text-left', cellClass: 'text-left',
					fn:function(value, object, key){
						if (!!value){
							var userProfile = Profiles.findOne({userId: value});
							return userProfile && userProfile.username
						} else {
							return 'anonymous'
						}
					}
				},
				{key: 'type', label: 'Type', headerClass: 'text-center', cellClass: 'text-center'},
				{key: 'createdAt', label: 'Uploaded', headerClass: 'text-center', cellClass: 'text-center', 
					fn:function(value, object, key){
						return moment(value).fromNow()
					}
				},
				{key: 'class', label: 'Class', headerClass: 'text-center', cellClass: 'text-center'},
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
						return object.likes.length - object.dislikes.length
						
					}
				}
			]
		}
	}
})

Template.videoCategories.onCreated(function(){

	this.categorySelected = new ReactiveVar(false);
	this.classSelected = new ReactiveVar(false);

	let template = Template.instance();
		
	template.autorun( ()=> {
		var server = serverSelected.get();
		this.subscribe('videos', server);
	});
	
	this.subscribe('profiles');



});

Template.videoCategories.onRendered(function(){

});