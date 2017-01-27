Template.nav.events({
	'click .server-name, click .navbar-link':function(e, tmpl){
		var currentTarget = $(e.currentTarget);
		if (currentTarget.hasClass('server-name')){
			serverSelected.set(currentTarget.text());
		} else if (currentTarget.hasClass('classic')){
			serverSelected.set('Classic');
		} else if (currentTarget.hasClass('about')){
			serverSelected.set('About');
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
	 	Meteor.logout();
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
	}
});

Template.nav.helpers({
	serverName:function(){
		let serverName = serverSelected.get();
		if (serverName && serverName !== 'Classic' && serverName !== 'About'){
			return serverName
		} else {
			return 'Server'
		}
	},
	activeLink:function(param1){
		let serverName = serverSelected.get();
		if (serverName === param1){
			return 'active'
		} else {
			return ''
		}
	}
})

Template.nav.onCreated(function(){
	serverSelected = new ReactiveVar(false);

});