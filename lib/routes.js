FlowRouter.route('/', {
	name: 'home',
	action:function(){
		BlazeLayout.render('mainLayout', {content: 'home'});
	}
});

FlowRouter.route('/upload', {
	name: 'upload',
	action:function(){
		BlazeLayout.render('mainLayout', {content: 'upload'});
	}
});

FlowRouter.route('/video/:id', {
	name: 'video',
	action:function(params){
		BlazeLayout.render('mainLayout', {content: 'video'});
	}
});

FlowRouter.route('/login', {
	name: 'login',
	action:function(params){
		BlazeLayout.render('mainLayout', {content: 'login'});
	}
});

FlowRouter.route('/profile', {
	name: 'profile',
	action:function(params){
		BlazeLayout.render('mainLayout', {content: 'profile'});
	}
});

FlowRouter.route('/streams', {
	name: 'streams',
	action:function(params){
		BlazeLayout.render('mainLayout', {content: 'streams'});
	}
});