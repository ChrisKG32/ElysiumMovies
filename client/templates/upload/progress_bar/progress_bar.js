Template.progressBar.helpers({
	progress: function (param1) {
		var upload = uploader.get();
		var type = uploadType.get();

		if (upload && (type === this.param1)) {
			return Math.round(upload.progress() * 100) || 0
		}
	},
	isUploading: function(){
		return Boolean(uploader.get())
	},

});

Template.progressBar.onCreated(function(){
	uploader = new ReactiveVar();
});