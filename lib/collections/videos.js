Videos = new Mongo.Collection('videos');

const videoSchema = new SimpleSchema({
	name: {
		type: String,
		label: 'Video Name',
		max: 30
	},
	author: {
		type: String,
		label: 'Author Name',
		defaultValue:function(){
			return Meteor.userId();
		},
		autoform: {
			type: 'hidden'
		},
		optional: true
	},
	createdAt: {
		type: Date,
		label: 'Created At',
		autoValue:function(doc, operation){
			if (this.isInsert){
				return new Date();
			} 
		},
		autoform: {
			type: 'hidden'
		},
		optional: true
	},
	server: {
		type: String,
		label: 'Server Name',
		autoform: {
			options: [
				{
					label: 'Anathema',
					value: 'Anathema'
				},
				{
					label: 'Darrowshire',
					value: 'Darrowshire'
				},
				{
					label: 'Elysium',
					value: 'Elysium'
				},
				{
					label: "Zeth'Kur",
					value: "Zeth'Kur"
				},
				{
					label: "Classic",
					value: "Classic"
				}
			]
		}
	},
	type: {
		type: String,
		label: 'Content Type',
		autoform: {
			options: [
				{
					label:'PvP',
					value:'PvP'
				},
				{
					label:'PvE',
					value:'PvE'
				},
				{
					label:'Humor',
					value:'Humor'
				},
				{
					label: 'Classic',
					value: 'Classic'
				},
				{
					label:'Other',
					value:'Other'
				}
			]
		}
	},
	faction: {
		type: String,
		label: 'Faction',
		optional: true,
		autoform: {
			options: [
				{
					label: 'Alliance',
					value: 'Alliance'
				},
				{
					label: 'Horde',
					value: 'Horde'
				},
				{
					label: 'Both',
					value: 'Both'
				}
			]
		}
	},
	class: {
		type: String,
		label: 'Class',
		optional: true,
		autoform: {
			options: [
				{
					label: 'Druid',
					value: 'Druid'
				},
				{
					label: 'Hunter',
					value: 'Hunter'
				},
				{
					label: 'Mage',
					value: 'Mage'
				},
				{
					label: 'Paladin',
					value: 'Paladin'
				},
				{
					label: 'Priest',
					value: 'Priest'
				},
				{
					label: 'Rogue',
					value: 'Rogue'
				},
				{
					label: 'Shaman',
					value: 'Shaman'
				},
				{
					label: 'Warlock',
					value: 'Warlock'
				},
				{
					label: 'Warrior',
					value: 'Warrior'
				}
			]
		}
	},
	description: {
		type: String,
		label: 'Video Description',
		max: 1000,
		autoform: {
			afFieldInput: {
				type: "textarea",
				rows: 5,
				class: 'video-desc'
			}
		}
	},
	video: {
		type: String,
		label: 'Standard Definition Video'
	},
	hdvideo: {
		type: String,
		label: 'High Definition Video',
		optional: true
	},
	poster: {
		type: String,
		label: 'Video Poster'
	},
	views: {
		type: Array,
		label: 'Views',
		optional: true,
		autoform: {
			type: 'hidden'
		}
	},
	'views.$':{
		type: String
	},
	viewCount: {
		type: Number,
		label: 'View Count',
		optional: true,
		autoform: {
			type: 'hidden'
		}
	},
	likes: {
		type: Array,
		label: 'Likes',
		optional: true,
		defaultValue: [],
		autoform: {
			type: 'hidden'
		}
	},
	'likes.$': {
		type: String,
		optional: true
	},
	dislikes: {
		type: Array,
		label: 'Dislikes',
		optional: true,
		defaultValue: [],
		autoform: {
			type: 'hidden'
		}
	},
	'dislikes.$': {
		type: String,
		optional: true
	}

});

Videos.attachSchema(videoSchema);


Videos.allow({
	insert: function(userId, doc){
		return !!userId;
	},
	update: function(userId, doc){
		return !!userId;
	},

});