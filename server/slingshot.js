


Slingshot.fileRestrictions( "uploadToAmazonS3", {
  allowedFileTypes: /^(video|image)/ ,
  maxSize: 10000 * 1024 * 1024
});

Slingshot.createDirective( "uploadToAmazonS3", Slingshot.S3Storage, {
  bucket: "availbucket",
  acl: "public-read",
  authorize: function () {
    // let userFileCount = Files.find( { "userId": this.userId } ).count();
    //return userFileCount < 3 ? true : false;
    return true
  },
  key: function ( file ) {
   // var user = Meteor.users.findOne( this.userId );
    return ("videos/" + file.name)//user.emails[0].address + "/" + file.name;
  }
});





console.log(this.connection);