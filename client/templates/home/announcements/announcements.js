

Template.announcements.events({
	'click .fa-close':function(e, tmpl){
		Session.set('dismissed', true);
	}
});


Template.announcements.helpers({
	dismissed:function(){
		var dismissed = Session.get('dismissed');

		if (dismissed) {
			return 'dismissed'
		} else {
			return ''
		}
	}
});