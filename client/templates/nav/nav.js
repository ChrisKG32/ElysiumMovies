Template.nav.events({
	'click .server-name':function(e, tmpl){
		var currentTarget = $(e.currentTarget);
		serverSelected.set(currentTarget.text());
		$('.navbar-server, .navbar-donate').removeClass('active');
		currentTarget.parent().addClass('active');
		FlowRouter.go('home');
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

Template.nav.onCreated(function(){
	serverSelected = new ReactiveVar(false);

});