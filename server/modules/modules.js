Modules.server = {};

Meteor.startup(function(){
	process.env.MAIL_URL = "smtp://postmaster%40mg.elysium-movies.com:3e8de712577292f8c76a600f6d89f16e@smtp.mailgun.org:587";
	Accounts.emailTemplates.from="no-reply@yourdomain.com";
	Accounts.emailTemplates.sitename="My Site";

	Accounts.emailTemplates.verifyEmail.subject = function(user){
		return 'Confirm Your Email Address';
	};
	Accounts.emailTemplates.verifyEmail.text = function(user, url){
		return 'click on the following link to verify your email address: ' + url;
	};
})