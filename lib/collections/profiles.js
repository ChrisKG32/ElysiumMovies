Profiles = new Mongo.Collection('profiles');

const profileSchema = new SimpleSchema({

	userId: {
		type: String
	},
	username: {
		type: String
	},
	avatar: {
		type: String
	}

});

Profiles.attachSchema(profileSchema);

Profiles.allow({
	insert: function(userId, doc){
		return !!userId;
	},
	update: function(userId, doc){
		return !!userId;
	},

});