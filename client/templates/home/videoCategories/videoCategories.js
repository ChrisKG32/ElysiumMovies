

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
		var target = $(e.target);
		FlowRouter.go('/video/' + this._id);
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
		if ((classSelected && classSelected !== 'All Classes') && categorySelected) {
			var vidCol = Videos.find({ class: classSelected, type: categorySelected });
		} else if (classSelected && classSelected !== 'All Classes') {
			var vidCol = Videos.find({ class: classSelected });

		} else if (categorySelected){
			var vidCol = Videos.find({ type: categorySelected });
		} else {
			var vidCol = Videos.find({});
		}
		
		return {
			collection: vidCol,
			rowsPerPage: 10,
			showFilter: true,
			fields: [
				{key: 'name', label: 'Name', headerClass: 'text-left', cellClass: 'text-left video-name'},
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
				{key: 'faction', label: 'Faction', headerClass: 'text-center', cellClass: 'text-center'},
				{key: 'class', label: 'Class', headerClass: 'text-center', cellClass: 'text-center'},
				{key: 'views', label: 'Views', headerClass: 'text-center', cellClass: 'text-center', 
					fn:function(value, object, key){
						if (!!value){
							return value.length
						} else {
							return 0
						}
						
					}
				},
				{key: 'likes', label: 'Likes', headerClass: 'text-center', cellClass: 'text-center', 
					fn:function(value, object, key){
						if (!!value){
							return value.length
						} else {
							return 0
						}
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