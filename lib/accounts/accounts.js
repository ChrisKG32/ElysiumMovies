

let createProfile = function(userId, info){
	Meteor.call('createProfile', 
		{
			userId: userId,
			username: info.username, 
			faction: info.profile.faction, 
			server: info.profile.server
		}
	)

}

AccountsTemplates.configure({
	confirmPassword: true,
	enablePasswordChange: true,
	//sendVerificationEmail: true,
	focusFirstInput: true,
	showForgotPasswordLink: true,
	homeRoutePath: '/',
	redirectTimeout: 4000,
	//hooks
	postSignUpHook: createProfile

});


let pwd = AccountsTemplates.removeField('password');

AccountsTemplates.removeField('email');


AccountsTemplates.addFields([
	{
		_id: 'username',
		type: 'text',
		displayName: 'username',
		required: true,
		minLength: 5
	},
	{
		_id: 'email',
		type: 'email',
		required: true,
		displayName: 'email',
		re: /.+@(.+){2,}\.(.+){2,}/,
		errStr: 'Invalid email'
	},
	pwd,
	{
		_id: 'faction',
		type: 'select',
		required: true,
		errStr: 'Must choose a Faction preference',
		displayName: 'Faction',
		select: [
			{
				text:'Faction (Select One)',
				value: ''
			},
			{
				text: 'Horde',
				value: 'horde'
			},
			{
				text: 'Alliance',
				value: 'alliance'
			}
		]
	},
	{
		_id: 'server',
		type: 'select',
		required: true,
		errStr: 'Must choose a Server preference',
		displayName: 'Server Preference',
		select: [
			{
				text:'Server (Select One)',
				value: ''
			},
			{
				text: 'Anathema',
				value: 'Anathema',
			},
			{
				text: 'Darrowshire',
				value: 'Darrowshire',
			},
			{
				text: 'Elysium',
				value: 'Elysium',
			},
			{
				text: "Zeth'Kur",
				value: "Zeth'Kur",
			}
		]
	}

]);

SimpleSchema.debug = true