
Template.login.onCreated(function(){
	if (typeof loginPage == 'undefined'){
		loginPage = new ReactiveVar(false);
	}
	this.factionSelect = new ReactiveVar(false);
	
});

Template.login.onRendered(function(){

});

Template.login.events({
	'click a#at-signIn':function(e, tmpl){
		Session.set('registering', !Session.get('registering'));
	},
	'click a#at-signUp':function(e, tmpl){
		Session.set('registering', !Session.get('registering'));
	},
	'click .faction-select .btn':function(e, tmpl){
		var currentTarget = $(e.currentTarget);
		$('.faction-select .btn').removeClass('selected');
		currentTarget.addClass('selected');
		$('.faction-select').attr('faction-selected', 'false');
	}
});

Template.login.onCreated(function(){
	Session.set('registering', false);
});