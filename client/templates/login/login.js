

Template.login.events({
	'click .login-to-account':function(e, tmpl){
		loginPage.set('login');
	},
	'click .register-to-site':function(e, tmpl){
		loginPage.set('register');
	},
	'submit form.login':function(e){
		e.preventDefault();
		var username = $('#username').val();
		var password = $('#password').val();
		Meteor.loginWithPassword(username, password, function(error){
			if(error){
				console.log(error.reason);
			} else {
				FlowRouter.go('home');
			}
		});
	},
	'submit form.register':function(e, tmpl){
		e.preventDefault();
		var username = $('#username').val();
		var password = $('#password').val();
		var confirmPassword = $('#confirm-password').val();
		var duplicateUser = Meteor.users.findOne({username: username});
		var factionSelect = tmpl.factionSelect.get();

		

		if (!duplicateUser) {
			if (password !== confirmPassword) {
				alert('Password Mismatch');
			} else if (!factionSelect) {

				alert('You must select a faction.');

			} else {	

				var data = {
					username: username,
					password: password
				}

				Meteor.call('createAccount', data, function(e, r){
					if (e){
						alert(e.reason);
					} else {
						Meteor.loginWithPassword(username, password, function(){
							var currentUser = Meteor.userId();
							var data2 = {
								username: username,
								userId: currentUser,
								faction: factionSelect
							}
							
							Meteor.call('createProfile', data2, function(){
								FlowRouter.go('home');
							});
							
						});

					}
					
				});
			}
			
		} else {
			console.log('User already exists');
		}
	},
	'click .faction-select .btn':function(e, tmpl){
		var currentTarget = $(e.currentTarget);
		$('.faction-select .btn').removeClass('selected');
		currentTarget.addClass('selected');
		if (currentTarget.hasClass('alliance-button')){
			tmpl.factionSelect.set('alliance');
		} else {
			tmpl.factionSelect.set('horde');
		}
	}
});

Template.login.helpers({
	loginPage:function(param1){
		return loginPage.get() === param1
	}
});

Template.login.onCreated(function(){
	if (typeof loginPage == 'undefined'){
		loginPage = new ReactiveVar(false);
	}
	this.factionSelect = new ReactiveVar(false);
	
});

Template.login.onRendered(function(){

});