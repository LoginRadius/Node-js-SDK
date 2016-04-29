# LoginRadius Combined SDK for Node.js

LoginRadius Combined Node SDK features a combined SDK set to encompass Social Login, Customer Registration and Custom Object

# Getting Started

## Configuration

- Create var config in project
	
		var config = {
			apidomain: 'https://api.loginradius.com',
			apikey: '{{ Your API KEY }}',
			apisecret: '{{ Your API Secret }}',
			sitename: '{{ Your Sitename }}'
		}

- Replace the placeholders in the config object with your LoginRadius credentials apikey, apisecret, sitename. These can be obtained from https://loginradius.com
- require the loginradius-sdk package and pass it the config object

		var lr = require('loginradius-sdk')(config);

## API Examples

### SocialLogin API

#### Get Access token
http://apidocs.loginradius.com/docs/access-token

	lr.getAccessToken( token );
	
#### Get User Profile Data
http://apidocs.loginradius.com/docs/user-profile

	lr.getUserProfile( accesstoken );

#### Get photo Albums Data
http://apidocs.loginradius.com/docs/album

	lr.getAlbums( accesstoken );
	
#### Get photos Data
http://apidocs.loginradius.com/docs/photo

	lr.getPhotos( accesstoken, albumId );
	
#### Get Checkins Data
http://apidocs.loginradius.com/docs/check-in

	lr.getCheckins( accesstoken );

#### Get Audio Data
http://apidocs.loginradius.com/docs/audio

	lr.getAudios( accesstoken );
	
#### Get Contacts Data
http://apidocs.loginradius.com/docs/contact

	lr.getContacts( accesstoken, 0 );
	
#### Get Mentions Data
http://apidocs.loginradius.com/docs/mention

	lr.getMentions( accesstoken );

#### Get Following Data
http://apidocs.loginradius.com/docs/following

	lr.getFollowings( accesstoken );
	
#### Get Events Data
http://apidocs.loginradius.com/docs/event

	lr.getEvents( accesstoken );
	
#### Get Posts Data
http://apidocs.loginradius.com/docs/post

	lr.getPosts( accesstoken );
	
#### Get Followed Companies Data
http://apidocs.loginradius.com/docs/following

	lr.getCompanies( accesstoken );
	
#### Get groups Data
http://apidocs.loginradius.com/docs/group

	lr.getGroups( accesstoken );
	
#### Get status Data
http://apidocs.loginradius.com/docs/get-status-posting

	lr.getStatuses( accesstoken );
	
#### Get Videos Data
http://apidocs.loginradius.com/docs/video

	lr.getVideos( accesstoken );
	
#### Get Likes Data
http://apidocs.loginradius.com/docs/like

	lr.getLikes( accesstoken );
	
#### Get Pages Data
http://apidocs.loginradius.com/docs/page

	lr.getPage( access_token, pagename );
		
#### Post Status Data
http://apidocs.loginradius.com/docs/post-status-posting

	lr.postStatus( accesstoken, title, url, status, imageurl, caption, description );
	
#### Send Message Data
http://apidocs.loginradius.com/docs/post-message

	lr.postMessage( accesstoken, to, subject, message );


### User Registration API

#### User Authentication (GET)
This API is used to authenticate users and returns the profile data associated with the authenticated user.
http://apidocs.loginradius.com/docs/user-authentication
##### Example:

	var username = "johndoe1234@mailinator.com";
	var password = "test1234";

	lr.getUserAuthentication( username, password ).then( function( response ) {
		console.log( response );
	}).catch( function( error ) {
		console.log( error );
	});

#### User Create (POST)
This API is used to create a new user on your site. This API bypasses the normal email verification process and manually creates the user for your system.
http://apidocs.loginradius.com/docs/create-user
##### Example:

	var formData = {
		"emailid": "johndoe1234@mailinator.com",
		"password": "test1234",
		"firstname": "John",
		"lastname": "Doe",
		"gender": "Male",
		"birthdate": "01-28-1976",
		"country": "Canada",
		"city": "Edmonton",
		"state": "Alberta",
		"phonenumber": "8651234567",
		"address1": "1234 Lane NW",
		"address2": "Apt 201",
		"company": "loginradius",
		"postalcode": "T5M0H3",
		"customfields": {"CustomField":"Value"} // Define custom fields from LoginRadius dashboard
	}

	lr.postUserCreate( formData ).then( function( response ) {
		console.log( response );
	}).catch( function( error ) {
		console.log( error );
	});

#### User Create Registration Profile (POST)
This API is used to create a user using the currently logged in social provider.
http://apidocs.loginradius.com/docs/create-user-registration-profile
##### Example:

	var formData = {
		"accountid": "{{UID}}",
		"password": "test1234",
		"emailid": "johndoe12344@mailinator.com"
	};

	lr.postUserCreateRegistrationProfile( formData ).then( function( response ) {
		console.log( response );
	}).catch( function( error ) {
		console.log( error );
	});
	
#### Delete User with Email Confirmation (GET)
This API is used to remove an user's account from LoginRadius system. For security and mis-click concerns, it will send a delete confirmation email to user's email inbox to ask user to confirm the action.
http://apidocs.loginradius.com/docs/user-delete-with-email-confirmation

	var id = "{{ID}}";
	var link = "http://localhost/delete";
	var template = "Deleted";

	lr.getUserDeleteWithEmailConfirm( id, link, template ).then( function( response ) {
		console.log( response );
	}).catch( function( error ) {
		console.log( error );
	});

#### User Email Add/Remove (POST)
This API is used to add or remove a particular email from one user's account.
http://apidocs.loginradius.com/docs/user-email-set
##### Example:

	var formData = {
		"accountid": "{{UID}}",
		"action": "Add/Remove",
		"EmailId": "Email Address",
		"EmailType": "Business/Personal"
	};

	lr.postUserEmailAddRemove( formData ).then( function( response ) {
		console.log( response );
	}).catch( function( error ) {
		console.log( error );
	});

#### User Check Email Availability (GET)
This API is used to check the availability of an email from your Customer registration system.
http://apidocs.loginradius.com/docs/user-email-availability
##### Example:

	var email = "tester@mail.com";

	lr.getUserEmailAvailability( email ).then( function( response ) {
		console.log( response );
	}).catch( function( error ) {
		console.log( error );
	});

#### Users Check Email Availability Server (GET)
This API checks for the existence of the specified email in your Cloud Storage.
http://apidocs.loginradius.com/docs/user-email-availability-server
##### Example:

	var email = "tester@mail.com";

	lr.getUserEmailAvailabilityServer( email ).then( function( response ) {
		console.log( response );
	}).catch( function( error ) {
		console.log( error );
	});

#### User Forgot Password Token (GET)
This API generates a forgot password token so you can manually pass into the reset password page and reset some's password.
http://apidocs.loginradius.com/docs/user-password-forgot-token
##### Example:

	var email = "tester@mail.com";

	lr.getUserPasswordForgotToken( email ).then( function( response ) {
		console.log( response );
	}).catch( function( error ) {
		console.log( error );
	});

#### User Register
This API used to register user from server side, verification email will be send to provided email address
http://apidocs.loginradius.com/docs/registration-api

	var formData = {
		"emailid": "testanotheruser@mailinator.com",
		"password": "test1234",
		"firstname": "Test",
		"lastname":	"User",
		"gender": "F",
		"birthdate": "mm-dd-yyyy",
		"country":	"Canada",
		"city":	"Edmonton",
		"state": "Alberta",
		"phonenumber": "7801234567",
		"address1":	"Box 1777",
		"address2": "",
		"company": "LoginRadius",
		"postalcode": "T5J1L5",
		"emailsubscription": true,
		"customfields": {"CustomField":"Value"}, // Define custom fields from LoginRadius dashboard
		"emailverificationurl":	"http://localhost/login"
	};

	lr.postUserRegistration( formData ).then( function( response ) {
		console.log( response );
	}).catch( function( error ) {
		console.log( error );
	});
	

#### User Update (POST)
This API is used to Modify/Update details of an existing user.
http://apidocs.loginradius.com/docs/update-user

	var formData = {
		"userid": "94a76a7c1d374f9698e2ad7b932377ab",
		"firstname": "John",
		"lastname": "Doe",
		"gender": "F",
		"birthdate": "01-13-1921",
		"city": "",
		"state": "",
		"phonenumber": "",
		"nickname": "",
		"profilename": "",
		"website": "",
		"hometown": "",
		"industry": "",
		"relationshipstatus": "",
		"Languages": "",
		"age": "",
		"placeslived": "",
		"address1": "1234 Lane NW",
		"address2": "Apt 201",
		"company": "loginradius",
		"postalcode": "T5M0H3",
		"emailsubscription": true,
		"customfields": {"CustomField":"Value"}, // Define custom fields from LoginRadius dashboard
		"imageUrl": "",
		"thumbnailImageUrl": "",
		"timezone": "",
		"about": "",
		"webprofiles": "",
		"type": "",
		"country": "",
	};
	
	lr.postUserUpdate( formData ).then( function( response ) {
		console.log( response );
	}).catch( function( error ) {
		console.log( error );
	});


#### Get User Profile By User ID
This API retrieves the profile data associated with the specific user using the users unique UserID.
http://apidocs.loginradius.com/docs/get-user-profile
##### Example:

	var userid = "94a76a7c1d374f9698e2ad7b932377ab";

	lr.getUserProfileById( userid ).then( function( response ) {
		console.log( response );
	}).catch( function( error ) {
		console.log( error );
	});

#### User Password (GET)
This API returns the encrypted hashed password for the specified User. This API is officially deprecated, We encourage you to use the Account Password Get API.
##### Example:

	var userid = "{{ID}}";

	lr.getUserPassword( userid ).then( function( response ) {
		console.log( response );
	}).catch( function( error ) {
		console.log( error );
	});

#### Get User Profile By Email
This API retrieves the profile data associated with the specific user using the passing in email address.
http://apidocs.loginradius.com/docs/user-profile-by-email
##### Example:

	var email = "johndoe1234@mailinator.com";

	lr.getUserProfileByEmail( email ).then( function( response ) {
		console.log( response );
	}).catch( function( error ) {
		console.log( error );
	});

### Account API

#### Link Account
This API is used to link a user account with a specified providers user account.
http://apidocs.loginradius.com/docs/link-user

	lr.postAccountLink( formData );

#### Unlink Account

	lr.postAccountUnlink( formData );
	
#### Block/Unblock Account
This API is used to block or un-block a user using the users unique UserID (UID).
http://apidocs.loginradius.com/docs/account-blockunblock
	
	var formData = {
		"accountid": "d644d13338424330b889193c501b77d8", //UID, the identifier for each user account
		"isblock": false //{Bool} true to block the account, false to unblock the account.
	};

	lr.postUserAccountBlockUnblock( formData ).then( function( response ) {
		console.log( response );
	}).catch( function( error ) {
		console.log( error );
	});

#### Get User Profiles
This API is used to retrieve all of the profile data from each of the linked social provider accounts associated with the account. For ex: A user has linked facebook and google account then this api will retrieve both profile data.
http://apidocs.loginradius.com/docs/get-user-profiles

	var uid = "d644d13338424330b889193c501b77d8";

	lr.getAccountProfiles( uid ).then( function( response ) {
		console.log( response );
	}).catch( function( error ) {
		console.log( error );
	});

#### Account Delete
Delete an account from your LoginRadius app.
http://apidocs.loginradius.com/docs/account-delete

	lr.getAccountDelete( uid, callback );

#### Change Account Password
This API is used to change the password field of an account, you need to know the old password before you change it.
http://apidocs.loginradius.com/docs/account-password-change

	lr.postAccountPasswordChange( formData );

#### Get Account Password
This API is used to get the password field of an account.
http://apidocs.loginradius.com/docs/account-password-get

	lr.getAccountPassword( uid );

#### Set Account Password
This API is used to set a password for an account. It does not require to know the previous(old) password.
http://apidocs.loginradius.com/docs/account-password-set

	lr.postAccountPasswordSet( formData );

#### Change UserName
This API is used for changing user name by account Id.
http://apidocs.loginradius.com/docs/user-name-change

	lr.postAccountUsernameChange( formData );

#### Check UserName
This API is used to check username exists or not on your site.
http://apidocs.loginradius.com/docs/user-name-check-server

	var username = "tester";

	lr.getAccountUsernameCheck( username ).then( function( response ) {
		console.log( response );
	}).catch( function( error ) {
		console.log( error );
	});

#### Set UserName
This API is used for set user name by user Id.
http://apidocs.loginradius.com/docs/user-name-set

	lr.postAccountUsernameSet( formData );

#### Resend Email Verification
This API is used to generate an email-token that can be sent out to a user in a link in order to verify their email.
http://apidocs.loginradius.com/docs/verification-email-resend

	lr.getUserEmailVerificationResend( email, link, template );

### Custom Object API

#### Custom Object Create/Update (POST)
This API is used to write information in JSON format to the custom object for the specified account.
http://apidocs.loginradius.com/docs/save-custom-object

	lr.postObjectCreateUpdate( objectid, uid, formData );

#### Custom Object by Account ID (GET)
This API is used to retrieve all of the custom objects by account ID (UID).
http://apidocs.loginradius.com/docs/get-custom-object-by-account-id

	lr.getObjectByAccountId( objectid, uid  );
	
#### Custom Object by Multiple Account IDs (GET)
This API is used to retrieve all of the custom objects via a list of account IDs(UID) separated by , (Max 20).
http://apidocs.loginradius.com/docs/get-custom-object-by-multiple-account-ids

	lr.getObjectByAccountIds( objectid, uids  );

#### Custom Object Check (GET)
This API is used to check the presence of a Custom Object for the specified account ID(UID)
http://apidocs.loginradius.com/docs/custom-object-check

	lr.getObjectCheck( objectid, uid  );

#### Custom Objects by Query (GET)
This API is used to retrieve all of the Custom Objects based on the specified query.
http://apidocs.loginradius.com/docs/get-custom-objects-by-query

	lr.getObjectByQuery( objectid, query, cursor );

#### Custom Object by Object ID (GET)
This API is used to retrieve all of the Custom objects based on the Object ID.
http://apidocs.loginradius.com/docs/get-all-custom-object-records

	lr.getObjectByObjectId( objectid, cursor );

#### Custom Object Delete (POST)
This API is used to remove the specified Custom Object based on the account ID(UID).
http://apidocs.loginradius.com/docs/delete-custom-object

	lr.postObjectDelete( objectid, uid );

#### Custom Object Stats (GET)
This API is used to get the current storage information for a specified Custom Object.
http://apidocs.loginradius.com/docs/get-custom-object-stats

	lr.getObjectStats( objectid );

