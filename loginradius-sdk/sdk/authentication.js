module.exports = function (config) {

    var module = {};
    var authEndpoint = "/identity/v2/auth/";
    var backUpManageEndPoint = "/identity/v2/manage/account/2FA/backupcode";
    var helper = require('./../helper.js');

    module.login = {};
    module.profile = {};
    module.customObject = {};
    module.backUpCode = {};
    module.smartLogin = {};
    
    // User Registration( POST )
    /*
     @params fromData (JSON) A valid json data (required)
     @params verificationUrl (optional)
     @params emailTemplate (optional)
     @params options PreventVerificationEmail (Specifying this value prevents the verification email from being sent. Only applicable if you have the optional email verification flow)(optional)
     @params startDate = "yyyy-mm-dd hh:mm:ss" // Valid Start Date with Date and time (optional)
     @params endDate = "yyyy-mm-dd hh:mm:ss" // Valid End Date with Date and time (optional)
     */
    module.register = function (formData, verificationUrl, emailTemplate, options, startDate, endDate, fields) {
        verificationUrl = helper.checkNullOrUndefined(verificationUrl);
        emailTemplate = helper.checkNullOrUndefined(emailTemplate);
        options = helper.checkNullOrUndefined(options);
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {                            
            helper.getSott(function (sott) {   
            config.request({
                    method: 'POST',
                    uri: config.apidomain + authEndpoint + "register?apikey=" + config.apikey + "&verificationUrl=" + verificationUrl + "&emailTemplate=" + emailTemplate + "&options=" + options+config.serverRegion,
                    headers: {'X-LoginRadius-Sott': sott, 'content-type': 'application/json'},
                    body: JSON.stringify(formData)
                }, function (data, status)  {
                    if (helper.checkError(data, status)) {
                        reject(data);
                    } else {
                        resolve(data);
                    }
                });
            }, config, startDate, endDate);
        });
    }
    
    //Get SOTT directly.
    module.getSott =  function (startDate, endDate, fields) {
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            helper.getSott(function (sott) {
                resolve(sott);
            },config, startDate, endDate);
        });
    };

    //Login by Email( POST )
    module.login.byEmail = function (email, password, verificationUrl, loginUrl, emailTemplate, reCaptchaKey, securityanswer, fields) {
        verificationUrl = helper.checkNullOrUndefined(verificationUrl);
        loginUrl = helper.checkNullOrUndefined(loginUrl);
        emailTemplate = helper.checkNullOrUndefined(emailTemplate);
        reCaptchaKey = helper.checkNullOrUndefined(reCaptchaKey);
        securityanswer = helper.checkNullOrUndefined(securityanswer);

        var formData = {
            "email": email,
            "password": password,
            "securityanswer": securityanswer
        }
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: 'POST',
                uri: config.apidomain + authEndpoint + "login?apikey=" + config.apikey + "&loginUrl=" + loginUrl + "&verificationUrl=" + verificationUrl + "&emailTemplate=" + emailTemplate + "&g-recaptcha-response=" + reCaptchaKey+config.serverRegion,
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(formData)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };

    // Login by Username( POST )
    module.login.byUsername = function (username, password, verificationUrl, loginUrl, emailTemplate, reCaptchaKey, securityanswer, fields) {
        verificationUrl = helper.checkNullOrUndefined(verificationUrl);
        loginUrl = helper.checkNullOrUndefined(loginUrl);
        emailTemplate = helper.checkNullOrUndefined(emailTemplate);
        reCaptchaKey = helper.checkNullOrUndefined(reCaptchaKey);
        securityanswer = helper.checkNullOrUndefined(securityanswer);

        var formData = {
            "username": username,
            "password": password,
            "securityanswer": securityanswer
        }
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: 'POST',
                uri: config.apidomain + authEndpoint + "login?apikey=" + config.apikey + "&loginUrl=" + loginUrl + "&verificationUrl=" + verificationUrl + "&emailTemplate=" + emailTemplate + "&g-recaptcha-response=" + reCaptchaKey+config.serverRegion,
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(formData)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };
    
    // Add Email( POST )
    module.addEmail = function (access_token, email, type, verificationUrl, emailTemplate, fields) {
        formData = {
            "Email": email,
            "Type": type
        };
        verificationUrl = helper.checkNullOrUndefined(verificationUrl);
        emailTemplate = helper.checkNullOrUndefined(emailTemplate);
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: 'POST',
                uri: config.apidomain + authEndpoint + "email?apikey=" + config.apikey+config.serverRegion,
                headers: {'content-type': 'application/json',
                    authorization: "Bearer " + access_token},
                body: JSON.stringify(formData)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };
    
    // Forgot Password( POST )
    module.forgotPassword = function (email, resetPasswordUrl, emailTemplate, fields) {
        emailTemplate = helper.checkNullOrUndefined(emailTemplate);
        var formData = {
            "email": email
        }
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: 'POST',
                uri: config.apidomain + authEndpoint + "password?apikey=" + config.apikey + "&resetPasswordUrl=" + resetPasswordUrl + "&emailTemplate=" + emailTemplate+config.serverRegion,
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(formData)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    }    
    
    // Check Email Availability( GET )
    module.getCheckEmail = function (email, fields) {
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({uri: config.apidomain + authEndpoint + "email?apikey=" + config.apikey + "&email=" + email+config.serverRegion}, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };
    
    // Check Username Availability( GET )
    module.checkUsername = function (username, fields) {
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({uri: config.apidomain + authEndpoint + "username?apikey=" + config.apikey + "&username=" + username+config.serverRegion}, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };    
    
    // GET Profile By Access Token( GET )
    module.profile.getByToken = function (access_token, fields) {
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({uri: config.apidomain + authEndpoint + "account?apikey=" + config.apikey+config.serverRegion,
                headers: {authorization: "Bearer " + access_token}
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    }
    
    //Accept Privacy Policy (GET)
    module.acceptPrivacyPolicy = function (access_token, fields) {
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                uri: config.apidomain + authEndpoint + "privacypolicy/accept?apikey=" + config.apikey+config.serverRegion,
                headers: {authorization: "Bearer " + access_token}
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    }

    // Auth Send Welcome Email
    module.sendWelcomeEmail = function (access_token, welcomeemailtemplate, fields) {
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                uri: config.apidomain + authEndpoint + "account/sendwelcomeemail?apikey=" + config.apikey + "&welcomeemailtemplate=" + welcomeemailtemplate+config.serverRegion,
                headers: {authorization: "Bearer " + access_token}
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    }    
      
    // Get Social Identity( GET )
    module.getSocialProfile = function (access_token, fields) {
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({uri: config.apidomain + authEndpoint + "socialidentity?apikey=" + config.apikey,
                headers: {authorization: "Bearer " + access_token}
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };
    
    // Token Validity( GET )
    module.validity = function (access_token, fields) {
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                uri: config.apidomain + authEndpoint + "access_token/validate?apikey=" + config.apikey+config.serverRegion,
                headers: {authorization: "Bearer " + access_token}
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };   
    
    // Access Token Info
    module.accessTokenInfo = function (access_token, fields) {
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                uri: config.apidomain + authEndpoint + "access_token?apikey=" + config.apikey+config.serverRegion,
                headers: {authorization: "Bearer " + access_token}
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };    
    
    // Verify Email( GET )
    module.getVerifyEmail = function (VerificationToken, url, fields) {
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({uri: config.apidomain + authEndpoint + "email?apikey=" + config.apikey + "&VerificationToken=" + VerificationToken + "&url=" + url+config.serverRegion}, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };   
    

    // Auth Delete Account
    module.deleteAccount = function (deletetoken, fields) {
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                uri: config.apidomain + authEndpoint + "account/delete?apikey=" + config.apikey + "&deletetoken=" + deletetoken+config.serverRegion
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    }

    // Token Invalidate( GET )
    module.invalidate = function (access_token, fields) {
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                uri: config.apidomain + authEndpoint + "access_token/invalidate?apikey=" + config.apikey+config.serverRegion,
                headers: {authorization: "Bearer " + access_token}
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };    
    
    //Get Security Questions By Access Token
    module.securityQuestionByToken = function (access_token, fields) {
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                uri: config.apidomain + authEndpoint + "securityquestion/accesstoken?apikey=" + config.apikey+config.serverRegion,
                headers: {authorization: "Bearer " + access_token}
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };    
    
    //Get Security Questions By Email
    module.securityQuestionByEmail = function (email, fields) {
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                uri: config.apidomain + authEndpoint + "securityquestion/email?apikey=" + config.apikey + "&email=" + email+config.serverRegion
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };

    //Get Security Questions By Username
    module.securityQuestionByUsername = function (username, fields) {
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                uri: config.apidomain + authEndpoint + "securityquestion/username?apikey=" + config.apikey + "&username=" + username+config.serverRegion
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };

    //Get Security Questions By Phone
    module.securityQuestionByPhone = function (phone, fields) {
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                uri: config.apidomain + authEndpoint + "securityquestion/phone?apikey=" + config.apikey + "&phone=" + phone+config.serverRegion
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };    
    
    //Auth Verify email by OTP
    module.verifyEmailByOTP = function (formData, url, welcomeemailtemplate, fields) {
        helper.checkFields(fields, config);
        url = helper.checkNullOrUndefined(url);
        welcomeemailtemplate = helper.checkNullOrUndefined(welcomeemailtemplate);
        return new Promise(function (resolve, reject) {
            config.request({
                method: "PUT",
                uri: config.apidomain + authEndpoint + "email?apikey=" + config.apikey + "&url=" + url + "&welcomeemailtemplate=" + welcomeemailtemplate+config.serverRegion,
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(formData)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };
    
    // Change Password( PUT )
    module.changePassword = function (access_token, oldpassword, newpassword, fields) {
        var formData = {
            "oldpassword": oldpassword,
            "newpassword": newpassword
        };
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: 'PUT',
                uri: config.apidomain + authEndpoint + "password/change?apikey=" + config.apikey+config.serverRegion,
                headers: {'content-type': 'application/json',
                    authorization: "Bearer " + access_token},
                body: JSON.stringify(formData)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };    
    
    // Account Link( PUT )
    module.accountLink = function (access_token, candidateToken, fields) {
        formData = {
            "candidateToken": candidateToken
        };
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: "PUT",
                uri: config.apidomain + authEndpoint + "socialIdentity?apikey=" + config.apikey+config.serverRegion,
                headers: {'content-type': 'application/json',
                    authorization: "Bearer " + access_token},
                body: JSON.stringify(formData)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };

    // Resend Email Verification( PUT )
    module.resendEmailVerification = function (email, verificationUrl, emailTemplate, fields) {
        verificationUrl = helper.checkNullOrUndefined(verificationUrl);
        emailTemplate = helper.checkNullOrUndefined(emailTemplate);
        helper.checkFields(fields, config);
        var formData = {
            "email": email
        }
        return new Promise(function (resolve, reject) {
            config.request({
                method: 'PUT',
                uri: config.apidomain + authEndpoint + "register?apikey=" + config.apikey + "&verificationUrl=" + verificationUrl + "&emailTemplate=" + emailTemplate+config.serverRegion,
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(formData)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    }
    
    // Reset Password by Reset Token( PUT )
    module.resetPassword = function (resettoken, password, welcomeEmailTemplate, resetPasswordEmailTemplate, fields) {
        welcomeEmailTemplate = helper.checkNullOrUndefined(welcomeEmailTemplate);
        resetPasswordEmailTemplate = helper.checkNullOrUndefined(resetPasswordEmailTemplate);
        helper.checkFields(fields, config);
        var formData = {
            "resettoken": resettoken,
            "password": password,
            "welcomeEmailTemplate": welcomeEmailTemplate,
            "resetPasswordEmailTemplate": resetPasswordEmailTemplate
        }
        return new Promise(function (resolve, reject) {
            config.request({
                method: 'PUT',
                uri: config.apidomain + authEndpoint + "password/reset?apikey=" + config.apikey+config.serverRegion,
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(formData)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };  
  
    //Auth reset Password By OTP ( PUT )
    module.resetPasswordByOTP = function ( otp, email, password, welcomeemailtemplate, resetpasswordemailtemplate, fields) {
        welcomeemailtemplate = helper.checkNullOrUndefined(welcomeemailtemplate);
        resetpasswordemailtemplate = helper.checkNullOrUndefined(resetpasswordemailtemplate);
        helper.checkFields(fields, config);
        var formData = {
            "Email": email,
            "password": password,
            "Otp": otp,
            "welcomeEmailTemplate": welcomeemailtemplate,
            "resetPasswordEmailTemplate": resetpasswordemailtemplate
        }
        return new Promise(function (resolve, reject) {
            config.request({
                method: "PUT",
                uri: config.apidomain + authEndpoint + "password/reset?apikey=" + config.apikey+config.serverRegion,
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(formData)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };
        
    // Reset Password By Security Answer and email( PUT )
    /*
     var securityanswer = {"cb7*******3e40ef8a****01fb****20": "Security Answer of this question ID"};
     var email = "";                          //Email by which user will log in
     var password = "xxxxxxxxxxxxx";
     var resetPasswordEmailTemplate = "template name" // Template which will send after resetting password successfully.(Optional)
     */
    module.resetPasswordbyEmail = function (securityanswer, email, password, resetPasswordEmailTemplate, fields) {
        resetPasswordEmailTemplate = helper.checkNullOrUndefined(resetPasswordEmailTemplate);
        var formData = {
            "securityanswer": securityanswer,
            "email": email,
            "password": password,
            "resetPasswordEmailTemplate": resetPasswordEmailTemplate
        }
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: 'PUT',
                uri: config.apidomain + authEndpoint + "password/securityanswer?apikey=" + config.apikey+config.serverRegion,
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(formData)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    }
    
    // Reset Password By Security Answer and phone( PUT )
    /*
     var securityanswer = {"cb7*******3e40ef8a****01fb****20": "Security Answer of this question ID"};
     var phone = "";                          //phone by which user will log in
     var password = "xxxxxxxxxxxxx";
     var resetPasswordEmailTemplate = "template name" // Template which will send after resetting password successfully.(Optional)
     */
    module.resetPasswordbyPhone = function (securityanswer, phone, password, resetPasswordEmailTemplate, fields) {
        resetPasswordEmailTemplate = helper.checkNullOrUndefined(resetPasswordEmailTemplate);
        var formData = {
            "securityanswer": securityanswer,
            "phone": phone,
            "password": password,
            "resetPasswordEmailTemplate": resetPasswordEmailTemplate
        }
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: 'PUT',
                uri: config.apidomain + authEndpoint + "password/securityanswer?apikey=" + config.apikey+config.serverRegion,
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(formData)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    }

    // Reset Password By Security Answer and username( PUT )
    /*
     var securityanswer = {"cb7*******3e40ef8a****01fb****20": "Security Answer of this question ID"};
     var username = "";                          //Username by which user will log in
     var password = "xxxxxxxxxxxxx";
     var resetPasswordEmailTemplate = "template name" // Template which will send after resetting password successfully.(Optional)
     */
    module.resetPasswordbyUsername = function (securityanswer, username, password, resetPasswordEmailTemplate, fields) {
        resetPasswordEmailTemplate = helper.checkNullOrUndefined(resetPasswordEmailTemplate);
        var formData = {
            "securityanswer": securityanswer,
            "username": username,
            "password": password,
            "resetPasswordEmailTemplate": resetPasswordEmailTemplate
        }
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: 'PUT',
                uri: config.apidomain + authEndpoint + "password/securityanswer?apikey=" + config.apikey+config.serverRegion,
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(formData)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    }
    
     // Change Username( PUT )
    module.changeUsername = function (access_token, username, fields) {
        formData = {
            "username": username
        };
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: "PUT",
                uri: config.apidomain + authEndpoint + "username?apikey=" + config.apikey+config.serverRegion,
                headers: {'content-type': 'application/json',
                    authorization: "Bearer " + access_token},
                body: JSON.stringify(formData)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };
    
    // Update Profile By Access Token( PUT )
    /*
     @nullSupport: (boolean) Default value will be false, pass true if wants to update other fields with null.
     */
    module.profile.updateByToken = function (access_token, formData, verificationUrl, emailTemplate, nullSupport, fields) {
        verificationUrl = helper.checkNullOrUndefined(verificationUrl);
        emailTemplate = helper.checkNullOrUndefined(emailTemplate);
        nullSupport = helper.checkNullSupport(nullSupport);
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: 'PUT',
                uri: config.apidomain + authEndpoint + "account?apikey=" + config.apikey + "&verificationUrl=" + verificationUrl + "&emailTemplate=" + emailTemplate + "&nullSupport=" + nullSupport+config.serverRegion,
                headers: {'content-type': 'application/json',
                    authorization: "Bearer " + access_token},
                body: JSON.stringify(formData)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    }
    
     // Update Security Question by Access_token( PUT )
    module.updateSecurityQuestionByAccessToken = function (access_token, securityanswer, fields) {
        var formData = {
            "SecurityQuestionAnswer": securityanswer
        }
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: 'PUT',
                uri: config.apidomain + authEndpoint + "account?apikey=" + config.apikey+config.serverRegion,
                headers: {'content-type': 'application/json',
                    authorization: "Bearer " + access_token},
                body: JSON.stringify(formData)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    }

    // Delete Account With Email Confirmation( DELETE )
    module.removeAccountByEmailConfirmation = function (access_token, deleteUrl, emailTemplate, fields) {
        helper.checkFields(fields, config);
        deleteUrl = (typeof deleteUrl === 'undefined') ? '' : deleteUrl;
        emailTemplate = helper.checkNullOrUndefined(emailTemplate);
        return new Promise(function (resolve, reject) {
            config.request({
                method: 'DELETE',
                uri: config.apidomain + authEndpoint + "account?apikey=" + config.apikey + "&verificationUrl=" + deleteUrl + "&emailTemplate=" + emailTemplate+config.serverRegion,
                headers: {authorization: "Bearer " + access_token}
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    }
    
    // Remove Email( DELETE )
    module.removeEmail = function (access_token, email, fields) {
        formData = {
            "Email": email
        };
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: 'DELETE',
                uri: config.apidomain + authEndpoint + "email?apikey=" + config.apikey+config.serverRegion,
                headers: {'content-type': 'application/json',
                    authorization: "Bearer " + access_token},
                body: JSON.stringify(formData)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };
    
     // Account Unlink( DELETE )
    module.accountUnlink = function (access_token, provider, providerid, fields) {
        formData = {
            "provider": provider,
            "providerid": providerid
        };
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: "DELETE",
                uri: config.apidomain + authEndpoint + "socialIdentity?apikey=" + config.apikey+config.serverRegion,
                headers: {'content-type': 'application/json',
                    authorization: "Bearer " + access_token},
                body: JSON.stringify(formData)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };   

    // Create Custom Object By Access Token( POST )
    module.customObject.create = function (access_token, objectName, customObjectData, fields) {
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: "POST",
                uri: config.apidomain + authEndpoint + "customobject?apikey=" + config.apikey + "&objectname=" + objectName+config.serverRegion,
                headers: {'content-type': 'application/json',
                    authorization: "Bearer " + access_token},
                body: JSON.stringify(customObjectData)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };    
    
    // Get Custom Object Set By ID( GET )
    module.customObject.setByID = function (access_token, objectRecordId, objectName, fields) {
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({uri: config.apidomain + authEndpoint + "customobject/" + objectRecordId + "?apikey=" + config.apikey + "&objectname=" + objectName+config.serverRegion,
                headers: {authorization: "Bearer " + access_token}
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };
        
    // Get Custom Object Sets By Token( GET )
    module.customObject.setByToken = function (access_token, objectName, fields) {
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({uri: config.apidomain + authEndpoint + "customobject?apikey=" + config.apikey + "&objectname=" + objectName+config.serverRegion,
                headers: {authorization: "Bearer " + access_token}
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };

    // Update Custom Object Data( PUT )
    module.customObject.update = function (access_token, objectRecordId, objectName, customObjectData, updateType, fields) {
        updateType = helper.allowedReplaceType(updateType);
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: "PUT",
                uri: config.apidomain + authEndpoint + "customobject/" + objectRecordId + "?apikey=" + config.apikey + "&objectname=" + objectName + "&updateType=" + updateType+config.serverRegion,
                headers: {'content-type': 'application/json',
                    authorization: "Bearer " + access_token},
                body: JSON.stringify(customObjectData)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };

    // Delete Custom Object Set( DELETE )
    module.customObject.delete = function (access_token, objectRecordId, objectName, fields) {
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: "DELETE",
                uri: config.apidomain + authEndpoint + "customobject/" + objectRecordId + "?apikey=" + config.apikey + "&objectname=" + objectName+config.serverRegion,
                headers: {authorization: "Bearer " + access_token}
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };

    // MFA Email Login( POST )
    module.mfaEmailLogin = function (email, password, loginUrl, verificationUrl, emailTemplate, smsTemplate2FA, fields) {
        loginUrl = helper.checkNullOrUndefined(loginUrl);
        verificationUrl = helper.checkNullOrUndefined(verificationUrl);
        emailTemplate = helper.checkNullOrUndefined(emailTemplate);
        smsTemplate2FA = helper.checkNullOrUndefined(smsTemplate2FA);
        helper.checkFields(fields, config);
        var formdata = {
            "email": email,
            "password": password
        };
        return new Promise(function (resolve, reject) {
            config.request({
                method: "POST",
                uri: config.apidomain + authEndpoint + "login/2fa?apikey=" + config.apikey + "&loginUrl=" + loginUrl + "&verificationUrl=" + verificationUrl + "&emailTemplate=" + emailTemplate + "&smsTemplate2FA=" + smsTemplate2FA+config.serverRegion,
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(formdata)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };
        
    //MFA Username Login( POST )
    module.mfaUsernameLogin = function (username, password, loginUrl, verificationUrl, emailTemplate, smsTemplate2FA, fields) {
        loginUrl = helper.checkNullOrUndefined(loginUrl);
        verificationUrl = helper.checkNullOrUndefined(verificationUrl);
        emailTemplate = helper.checkNullOrUndefined(emailTemplate);
        smsTemplate2FA = helper.checkNullOrUndefined(smsTemplate2FA);
        helper.checkFields(fields, config);
        var formdata = {
            "username": username,
            "password": password
        };
        return new Promise(function (resolve, reject) {
            config.request({
                method: "POST",
                uri: config.apidomain + authEndpoint + "login/2fa?apikey=" + config.apikey + "&loginUrl=" + loginUrl + "&verificationUrl=" + verificationUrl + "&emailTemplate=" + emailTemplate + "&smsTemplate2FA=" + smsTemplate2FA+config.serverRegion,
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(formdata)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };    
    
    //  MFA Phone Login( POST )
    module.mfaPhoneLogin = function (phone, password, loginUrl, verificationUrl, smsTemplate, smsTemplate2FA, fields) {
        loginUrl = helper.checkNullOrUndefined(loginUrl);
        verificationUrl = helper.checkNullOrUndefined(verificationUrl);
        smsTemplate = helper.checkNullOrUndefined(smsTemplate);
        smsTemplate2FA = helper.checkNullOrUndefined(smsTemplate2FA);
        helper.checkFields(fields, config);
        var formdata = {
            "phone": phone,
            "password": password
        };
        return new Promise(function (resolve, reject) {
            config.request({
                method: "POST",
                uri: config.apidomain + authEndpoint + "login/2fa?apikey=" + config.apikey + "&loginUrl=" + loginUrl + "&verificationUrl=" + verificationUrl + "&smsTemplate=" + smsTemplate + "&smsTemplate2FA=" + smsTemplate2FA+config.serverRegion,
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(formdata)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };

    // MFA Validate Access Token( GET )
    module.mfaValidateByToken = function (access_token, smsTemplate2FA, fields) {
        helper.checkFields(fields, config);
        smsTemplate2FA = helper.checkNullOrUndefined(smsTemplate2FA);
        return new Promise(function (resolve, reject) {
            config.request({uri: config.apidomain + authEndpoint + "account/2fa?apikey=" + config.apikey + "&smstemplate2fa=" + smsTemplate2FA+config.serverRegion,
                headers: {'content-type': 'application/json',
                    authorization: "Bearer " + access_token}
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };    
    
    //MFA Backup Code by Access Token ( GET )
    module.backUpCode.getByToken = function (access_token, fields) {
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                uri: config.apidomain + authEndpoint + "account/2fa/backupcode?apikey=" + config.apikey+config.serverRegion,
                headers: {'content-type': 'application/json',
                    authorization: "Bearer " + access_token}
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };

    //MFA Reset Backup code by Access Token ( GET )
    module.backUpCode.resetByToken = function (access_token, fields) {
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                uri: config.apidomain + authEndpoint + "account/2fa/backupcode/reset?apikey=" + config.apikey+config.serverRegion,
                headers: {'content-type': 'application/json',
                    authorization: "Bearer " + access_token}
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };

    //Management API
    //MFA Backup Code by UID ( GET )
    module.backUpCode.getByUid = function (uid, fields) {
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                uri: config.apidomain + backUpManageEndPoint + "?uid=" + uid+config.serverRegion
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            }, true);
        });
    };

    //MFA Reset Backup Code by UID ( GET )
    module.backUpCode.resetByUid = function (uid, fields) {
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                uri: config.apidomain + backUpManageEndPoint + "/reset?uid=" + uid+config.serverRegion
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            }, true);
        });
    };
    
    //MFA Validate Backup code ( PUT )
    module.mfaValidateBackupCode = function (secondfactorauthenticationtoken, backupcode, fields) {
        secondfactorauthenticationtoken = helper.checkNullOrUndefined(secondfactorauthenticationtoken);
        helper.checkFields(fields, config);
        var formdata = {
            "backupcode": backupcode
        };
        return new Promise(function (resolve, reject) {
            config.request({
                method: "PUT",
                uri: config.apidomain + authEndpoint + "login/2fa/verification/backupcode?apikey=" + config.apikey + "&secondfactorauthenticationtoken=" + secondfactorauthenticationtoken+config.serverRegion,
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(formdata)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };
    
    //MFA Validate OTP ( PUT )
    module.mfaValidateOTP = function (secondfactorauthenticationtoken, payload, smstemplate2fa, fields) {
        secondfactorauthenticationtoken = helper.checkNullOrUndefined(secondfactorauthenticationtoken);
        smstemplate2fa = helper.checkNullOrUndefined(smstemplate2fa);
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: "PUT",
                uri: config.apidomain + authEndpoint + "login/2fa/verification/otp?apikey=" + config.apikey + "&secondfactorauthenticationtoken=" + secondfactorauthenticationtoken + "&smstemplate2fa=" + smstemplate2fa+config.serverRegion,
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(payload)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };
    
    //MFA Validate Google Auth Code ( PUT )
    module.mfaValidateGoogleAuthCode = function (secondfactorauthenticationtoken, googleauthenticatorcode, smstemplate2fa, fields) {
        secondfactorauthenticationtoken = helper.checkNullOrUndefined(secondfactorauthenticationtoken);
        smstemplate2fa = helper.checkNullOrUndefined(smstemplate2fa);
        googleauthenticatorcode = helper.checkNullOrUndefined(googleauthenticatorcode);
        helper.checkFields(fields, config);
        var formdata = {
            "googleauthenticatorcode": googleauthenticatorcode
        }
        return new Promise(function (resolve, reject) {
            config.request({
                method: "PUT",
                uri: config.apidomain + authEndpoint + "login/2fa/verification/googleauthenticatorcode?apikey=" + config.apikey + "&secondfactorauthenticationtoken=" + secondfactorauthenticationtoken + "&smstemplate2fa=" + smstemplate2fa+config.serverRegion,
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(formdata)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };

    // MFA Update Phone Number( PUT )
    module.updatePhone = function (SecondFactorAuthenticationToken, phoneNo2FA, smsTemplate2FA, fields) {
        var formData = {
            "phoneNo2FA": phoneNo2FA
        };
        smsTemplate2FA = helper.checkNullOrUndefined(smsTemplate2FA);
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: "PUT",
                uri: config.apidomain + authEndpoint + "login/2fa?apikey=" + config.apikey + "&secondfactorauthenticationtoken=" + SecondFactorAuthenticationToken + "&smstemplate2fa=" + smsTemplate2FA+config.serverRegion,
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(formData)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };
    
    // MFA Update Phone Number By token ( PUT )
    module.updatePhoneByToken = function (access_token, phoneNo2FA, smsTemplate, fields) {
        var formData = {
            "phoneno2fa": phoneNo2FA
        };
        smsTemplate = helper.checkNullOrUndefined(smsTemplate);
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: "PUT",
                uri: config.apidomain + authEndpoint + "account/2fa?apikey=" + config.apikey + "&smstemplate2fa=" + smsTemplate+config.serverRegion,
                headers: {'content-type': 'application/json',
                    authorization: "Bearer " + access_token},
                body: JSON.stringify(formData)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };    
    
    // Update MFA by Access Token ( PUT )
    module.updateMfaByAccessToken = function (access_token, formdata, smsTemplate, fields) {
        smsTemplate = helper.checkNullOrUndefined(smsTemplate);
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: "PUT",
                uri: config.apidomain + authEndpoint + "account/2fa/verification/googleauthenticatorcode?apikey=" + config.apikey + "&smstemplate=" + smsTemplate+config.serverRegion,
                headers: {authorization: "Bearer " + access_token},
                body: JSON.stringify(formdata)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };

     // Update MFA Setting ( PUT )
    module.updateMfaSetting = function (access_token, formdata, fields) {
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: "PUT",
                uri: config.apidomain + authEndpoint + "account/2fa/verification/otp?apikey=" + config.apikey,
                headers: {authorization: "Bearer " + access_token},
                body: JSON.stringify(formdata)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            })
        });
    };    
    
    // MFA Reset Google Authenticator by Token ( DELETE )
    module.mfaResetGoogleAuthenticatorByToken = function (access_token, authenticator, fields) {
        var payload = {};
        payload[authenticator] = true;
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: "DELETE",
                uri: config.apidomain + authEndpoint + "account/2fa/authenticator?apikey=" + config.apikey+config.serverRegion,
                headers: {'content-type': 'application/json',
                    authorization: "Bearer " + access_token},
                body: JSON.stringify(payload)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };
    
    // MFA Reset SMS Authenticator by Token ( DELETE )
    module.mfaResetSMSAuthenticatorByToken = function (access_token, authenticator, fields) {
        var payload = {};
        payload[authenticator] = true;
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: "DELETE",
                uri: config.apidomain + authEndpoint + "account/2fa/authenticator?apikey=" + config.apikey+config.serverRegion,
                headers: {'content-type': 'application/json',
                    authorization: "Bearer " + access_token},
                body: JSON.stringify(payload)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };
         
    // MFA Reset Google Authenticator by Uid ( DELETE )
    module.mfaResetGoogleAuthenticatorByUid = function (uid, authenticator, fields) {
        var payload = {};
        payload[authenticator] = true;
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: "DELETE",
                uri: config.apidomain + "/identity/v2/manage/account/2fa/authenticator?uid=" + uid+config.serverRegion,
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(payload)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            }, true);
        });
    };
             
    // MFA Reset Google Authenticator by Uid ( DELETE )
    module.mfaResetSMSAuthenticatorByUid = function (uid, authenticator, fields) {
        var payload = {};
        payload[authenticator] = true;
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: "DELETE",
                uri: config.apidomain + "/identity/v2/manage/account/2fa/authenticator?uid=" + uid+config.serverRegion,
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(payload)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            }, true);
        });
    };
        
    /**
     * Multi Factor Re-Authenticate
     * @param access_token
     * @return response 
     */
    module.mfaReauthenticate = function (access_token, smstemplate2fa, fields) {
        smstemplate2fa = helper.checkNullOrUndefined(smstemplate2fa);
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                uri: config.apidomain + authEndpoint + "account/reauth/2fa?apikey=" + config.apikey + "&smstemplate2fa=" + smstemplate2fa+config.serverRegion,
                headers: {authorization: "Bearer " + access_token},
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };

    /**
     * This API is used to re-authenticate via Multi-factor-authentication by passing the google authenticator code.
     * @param access_token
     * @param googleauthenticatorcode
     * @return response 
     */
    module.validateMFAByGoogleAuthenticatorCode = function (access_token, googleauthenticatorcode, fields) {
        helper.checkFields(fields, config);
        var formdata = {
            "googleauthenticatorcode": googleauthenticatorcode
        }
        return new Promise(function (resolve, reject) {
            config.request({
                uri: config.apidomain + authEndpoint + "account/reauth/2fa/googleauthenticatorcode?apikey=" + config.apikey+config.serverRegion,
                method: "PUT",
                headers: {authorization: "Bearer " + access_token},
                body: JSON.stringify(formdata)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };

    /**
     * This API can be used to validate MFA by Backup Code
     * @param access_token
     * @param backupcode
     * @return response 
     */
    module.validateMFAByBackupCode = function (access_token, backupcode, fields) {
        helper.checkFields(fields, config);
        var formdata = {
            "backupcode": backupcode
        }
        return new Promise(function (resolve, reject) {
            config.request({
                uri: config.apidomain + authEndpoint + "account/reauth/2fa/BackupCode?apikey=" + config.apikey+config.serverRegion,
                method: "PUT",
                headers: {authorization: "Bearer " + access_token},
                body: JSON.stringify(formdata)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };

    /**
     * This API is used to re-authenticate via Multi-factor authentication by passing the One Time Password received via SMS.
     * @param apikey
     * @param smstemplate2fa
     * @param access_token
     * @param payload
     * @return response 
     */
    module.validateMFAByOTP = function (access_token, payload, smstemplate2fa, fields) {
        helper.checkFields(fields, config);
        smstemplate2fa = helper.checkNullOrUndefined(smstemplate2fa);
        return new Promise(function (resolve, reject) {
            config.request({
                method: "PUT",
                uri: config.apidomain + authEndpoint + "account/reauth/2fa/otp?apikey=" + config.apikey + "&smstemplate2fa=" + smstemplate2fa+config.serverRegion,
                headers: {authorization: "Bearer " + access_token},
                body: JSON.stringify(payload)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };

    /**
     *This API is used to re-authenticate via Multi-factor-authentication by passing the password.
     * @param apikey
     * @param smstemplate2fa
     * @param access_token
     * @param payload
     * @return response 
     */
    module.validateMFAByPassword = function (access_token, payload, smstemplate2fa, fields) {
        helper.checkFields(fields, config);
        smstemplate2fa = helper.checkNullOrUndefined(smstemplate2fa);
        return new Promise(function (resolve, reject) {
            config.request({
                method: "PUT",
                uri: config.apidomain + authEndpoint + "/account/reauth/password?apikey=" + config.apikey + "&smstemplate2fa=" + smstemplate2fa+config.serverRegion,
                headers: {authorization: "Bearer " + access_token},
                body: JSON.stringify(payload)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };    

    //Smart login send email with token by Email( GET )
    module.smartLogin.byEmail = function (email, clientGuid, smartloginemailtemplate, welcomeEmailTemplate, redirecturl, fields) {
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                uri: config.apidomain + authEndpoint + "login/smartlogin?apikey=" + config.apikey + "&email=" + email + "&clientGuid=" + clientGuid + "&smartloginemailtemplate=" + smartloginemailtemplate + "&welcomeEmailTemplate=" + welcomeEmailTemplate + "&redirecturl=" + redirecturl+config.serverRegion
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };

    //Smart login send email with token by UserName( GET  )
    module.smartLogin.byUsername = function (username, clientGuid, smartloginemailtemplate, welcomeEmailTemplate, redirecturl, fields) {
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                uri: config.apidomain + authEndpoint + "login/smartlogin?apikey=" + config.apikey + "&userName=" + username + "&clientGuid=" + clientGuid + "&smartloginemailtemplate=" + smartloginemailtemplate + "&welcomeEmailTemplate=" + welcomeEmailTemplate + "&redirecturl=" + redirecturl+config.serverRegion
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };    
    
    //Smart Login Ping( GET )
    module.smartLogin.ping = function (clientGuid, fields) {
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                uri: config.apidomain + authEndpoint + "login/smartlogin/ping?apikey=" + config.apikey + "&clientGuid=" + clientGuid+config.serverRegion
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };

    //Verify Smart Login Email for Login( GET  )
    module.smartLogin.verify = function (verificationtoken, welcomeEmailTemplate, fields) {
        welcomeEmailTemplate = helper.checkNullOrUndefined(welcomeEmailTemplate);
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                uri: config.apidomain + authEndpoint + "email/smartlogin?apikey=" + config.apikey + "&verificationtoken=" + verificationtoken + "&welcomeEmailTemplate=" + welcomeEmailTemplate+config.serverRegion
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };
   
    //PasswordLess Login By Email ( GET )
    module.passwordlessLoginByEmail = function (email, passwordlesslogintemplate, verificationurl, fields) {
        passwordlesslogintemplate = helper.checkNullOrUndefined(passwordlesslogintemplate);
        verificationurl = helper.checkNullOrUndefined(verificationurl);
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                uri: config.apidomain + authEndpoint + "login/passwordlesslogin/email?apikey=" + config.apikey + "&email=" + email + "&passwordlesslogintemplate=" + passwordlesslogintemplate + "&verificationurl=" + verificationurl+config.serverRegion
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };

    //PasswordLess Login By Username ( GET )
    module.passwordlessLoginByUsername = function (username, passwordlesslogintemplate, verificationurl, fields) {
        passwordlesslogintemplate = helper.checkNullOrUndefined(passwordlesslogintemplate);
        verificationurl = helper.checkNullOrUndefined(verificationurl);
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                uri: config.apidomain + authEndpoint + "login/passwordlesslogin/email?apikey=" + config.apikey + "&username=" + username + "&passwordlesslogintemplate=" + passwordlesslogintemplate + "&verificationurl=" + verificationurl+config.serverRegion
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };

    //PasswordLess Login Verification ( GET )
    module.passwordlessLoginVerify = function (verificationtoken, welcomeemailtemplate, fields) {
        welcomeemailtemplate = helper.checkNullOrUndefined(welcomeemailtemplate);
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                uri: config.apidomain + authEndpoint + "login/passwordlesslogin/email/verify?apikey=" + config.apikey + "&verificationtoken=" + verificationtoken + "&welcomeemailtemplate=" + welcomeemailtemplate+config.serverRegion
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };

    //Phone Send One time Passcode for PasswordLess Login (GET)
    module.passwordlessPhoneSendOTP = function (phone, smstemplate, fields) {
        smstemplate = helper.checkNullOrUndefined(smstemplate);
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                uri: config.apidomain + authEndpoint + "login/passwordlesslogin/otp?apikey=" + config.apikey + "&phone=" + phone + "&smstemplate=" + smstemplate+config.serverRegion
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };

    //Phone Login Using using One Time Passcode
    module.passwordlessPhoneLoginUsingOTP = function (formdata, smstemplate, fields) {
        helper.checkFields(fields, config);
        smstemplate = helper.checkNullOrUndefined(smstemplate);
        return new Promise(function (resolve, reject) {
            config.request({
                method: "PUT",
                uri: config.apidomain + authEndpoint + "login/passwordlesslogin/otp/verify?apikey=" + config.apikey + "&smstemplate=" + smstemplate+config.serverRegion,
                headers: {'content-type': "application/json"},
                body: JSON.stringify(formdata)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };

    //One Touch Login By Email Id
    module.oneTouchLoginByEmail = function (payload, redirecturl, oneTouchLoginEmailTemplate, welcomeemailtemplate, fields) {
        redirecturl = helper.checkNullOrUndefined(redirecturl);
        oneTouchLoginEmailTemplate = helper.checkNullOrUndefined(oneTouchLoginEmailTemplate);
        welcomeemailtemplate = helper.checkNullOrUndefined(welcomeemailtemplate);
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: "POST",
                uri: config.apidomain + authEndpoint + "onetouchlogin/email?apikey=" + config.apikey + "&redirecturl=" + redirecturl + "&onetouchloginemailtemplate=" + oneTouchLoginEmailTemplate + "&welcomeemailtemplate=" + welcomeemailtemplate+config.serverRegion,
                headers: {'content-type': "application/json"},
                body: JSON.stringify(payload)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };

    //One Touch Login By Phone
    module.oneTouchLoginByPhone = function (payload, smstemplate, fields) {
        smstemplate = helper.checkNullOrUndefined(smstemplate);
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: "POST",
                uri: config.apidomain + authEndpoint + "onetouchlogin/phone?apikey=" + config.apikey + "&smstemplate=" + smstemplate+config.serverRegion,
                headers: {'content-type': "application/json"},
                body: JSON.stringify(payload)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };

    //One Touch Login OTP Verification
    module.oneTouchLoginVerifyOtp = function (phone, otp, smstemplate, fields) {
        var formData = {
            "phone": phone
        };
        smstemplate = helper.checkNullOrUndefined(smstemplate);
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: "PUT",
                uri: config.apidomain + authEndpoint + "onetouchlogin/phone/verify?apikey=" + config.apikey + "&otp=" + otp + "&smstemplate=" + smstemplate+config.serverRegion,
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(formData)
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };

    //This API is used to get Server Start Time and End Time( GET )
    module.getServerTime = function (timeDifference, fields) {
        if (!timeDifference) {
            var timeDifference = "10";
        }
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: 'GET',
                uri: config.apidomain + "/identity/v2/serverinfo?timedifference=" + timeDifference + "&apikey=" + config.apikey+config.serverRegion
            }, function (data, status)  {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };

    return module;
};