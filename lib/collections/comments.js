Comments = new Mongo.Collection('comments');

const commentSchema = new SimpleSchema({
	userId: {
		type: String,
		label: 'userId'
	},
	createdAt: {
		type: Date,
		label: 'Created At',
		autoValue:function(doc, operation){
			if (this.isInsert){
				return new Date();
			} else if (this.isUpsert) {
				return {$setOnInsert: new Date()};
			} else {
				this.unset();
			}
		},
		autoform: {
			type: 'hidden'
		},
		optional: true
	},
	videoId: {
		type: String,
		label: 'Video ID'
	},
	comment: {
		type: String,
		label: 'Comment'
	}
});

Comments.attachSchema(commentSchema);


Comments.allow({
	insert: function(userId, doc){
		return !!userId;
	},
	update: function(userId, doc){
		return !!userId;
	},

});
