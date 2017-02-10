Template.nav.events({
	'click .server-name, click .navbar-link, click .all':function(e, tmpl){
		var currentTarget = $(e.currentTarget);
		if (currentTarget.hasClass('server-name')){
			serverSelected.set(currentTarget.text());
		} else if (currentTarget.hasClass('classic')){
			serverSelected.set('Classic');
		} else if (currentTarget.hasClass('about')){
			serverSelected.set('About');
		} else if (currentTarget.hasClass('all')){
			serverSelected.set('Any Server');
		}
		if (FlowRouter.getRouteName() !== 'home'){
			FlowRouter.go('home');
		}
		
	},
	'click .navbar-brand':function(e, tmpl){
		serverSelected.set(false);
		$('.navbar-server, .navbar-donate').removeClass('active');
	},
	'click .log-out':function(e, tmpl){
	 	AccountsTemplates.logout();
	},
	'click .login-page':function(e, tmpl){
		if (typeof loginPage == 'undefined'){
			loginPage = new ReactiveVar(false);
		}
		var currentTarget = $(e.currentTarget);
		if (currentTarget.hasClass('signup-button')){
			loginPage.set('register');
		} else {
			loginPage.set(false);
		}
	},
	'click .retract':function(e, tmpl){
		$('.navbar-collapse.collapse.in').removeClass('in').attr('aria-expanded', 'false');
	}
});

Template.nav.helpers({
	serverName:function(){
		let serverName = serverSelected.get();
		if (serverName && serverName !== 'Classic' && serverName !== 'About'){
			return serverName
		} else {
			return 'Select Server'
		}
	},
	activeLink:function(param1){
		let serverName = serverSelected.get();
		if (serverName === param1){
			return 'active'
		} else {
			return ''
		}
	},
	serverActive:function(){
		let yes = serverSelected.get();
		if (yes && yes !== 'Classic'){
			return 'active'
		} else {
			return ''
		}
	}
})

Template.nav.onCreated(function(){	
	serverSelected = new ReactiveVar(false);

});