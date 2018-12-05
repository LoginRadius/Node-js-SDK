module.exports = function (config) {

    var module = {};
    var phoneAuthEndpoint = "/identity/v2/auth/";
    var helper = require('./../helper.js');

    module.otp = {};
    
    
    // Phone Login( POST )
    module.login = function (phone, password, loginUrl, smsTemplate, reCaptchaKey, securityanswer, fields ) {
        loginUrl = helper.checkNullOrUndefined(loginUrl);
        smsTemplate = helper.checkNullOrUndefined(smsTemplate);
        reCaptchaKey = helper.checkNullOrUndefined(reCaptchaKey);
        securityanswer = helper.checkNullOrUndefined(securityanswer);

        var formData = {
            "phone": phone,
            "password": password,
            "securityanswer": securityanswer
        }
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: 'POST',
                uri: config.apidomain + phoneAuthEndpoint +"login?apikey=" + config.apikey + "&loginUrl=" + loginUrl + "&smsTemplate=" + smsTemplate + "&g-recaptcha-response="+ reCaptchaKey+config.serverRegion,
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(formData)
            }, function (data, status) {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    }
    
    // Phone Forgot Password by OTP( POST )
    module.forgotPassword = function (phone, smsTemplate, fields) {
        smsTemplate = helper.checkNullOrUndefined(smsTemplate);
        var formData = {
            "phone": phone
        }
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: "POST",
                uri: config.apidomain + phoneAuthEndpoint +"password/otp?apikey=" + config.apikey + "&smsTemplate=" + smsTemplate+config.serverRegion,
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(formData)
            }, function (data, status) {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    }
    
    // Phone Resend OTP( POST )
    module.otp.resend = function (phone, smsTemplate, fields) {
        smsTemplate = helper.checkNullOrUndefined(smsTemplate);
        var formData = {
            "phone": phone
        }
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: "POST",
                uri: config.apidomain + phoneAuthEndpoint +"phone/otp?apikey=" + config.apikey + "&smsTemplate=" + smsTemplate+config.serverRegion,
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(formData)
            }, function (data, status) {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    }

    // Phone Resend OTP By Token ( POST )
    module.otp.resendByToken = function (access_token, phone, smsTemplate, fields) {
        smsTemplate = helper.checkNullOrUndefined(smsTemplate);
        var formData = {
            "phone": phone
        }
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: "POST",
                uri: config.apidomain + phoneAuthEndpoint +"phone/otp?apikey=" + config.apikey + "&smsTemplate=" + smsTemplate+config.serverRegion,
                headers: {'content-type': 'application/json', authorization: "Bearer " + access_token},
                body: JSON.stringify(formData)
            }, function (data, status) {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    }

    // Phone User Registration by SMS ( POST )
    module.register = function (formData, verificationUrl, smsTemplate, options, startDate, endDate, fields) {
        verificationUrl = helper.checkNullOrUndefined(verificationUrl);
        smsTemplate = helper.checkNullOrUndefined(smsTemplate);
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {              
                helper.getSott(function (sott) {  
                config.request({
                    method: "POST",
                    uri: config.apidomain + phoneAuthEndpoint + "register?apikey=" + config.apikey + "&verificationUrl=" + verificationUrl + "&smsTemplate=" + smsTemplate + "&options=" + options+config.serverRegion,
                    headers: {'X-LoginRadius-Sott' : sott, 'content-type': 'application/json'},
                    body: JSON.stringify(formData)
                }, function (data, status) {
                    if (helper.checkError(data, status)) {
                        reject(data);
                    } else {
                        resolve(data);
                    }
                });
             }, config, startDate, endDate);
        });
    }  
    
    // Phone Number Availability( GET )
    module.getPhoneAvailable = function (phone, fields) {
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({uri: config.apidomain + phoneAuthEndpoint +"phone?apikey=" + config.apikey + "&phone=" + phone+config.serverRegion}, function (data, status) {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    }

    // Phone Number Update( PUT )
    module.update = function (phone, access_token, smsTemplate, fields) {
        smsTemplate = helper.checkNullOrUndefined(smsTemplate);
        var formData = {
            "phone": phone
        }
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: "PUT",
                uri: config.apidomain + phoneAuthEndpoint +"phone?apikey=" + config.apikey + "&access_token=" + access_token + "&smsTemplate=" + smsTemplate+config.serverRegion,
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(formData)
            }, function (data, status) {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    }

    // Phone Reset Password by OTP( PUT )
    module.resetPassword = function (phone, otp, password, smsTemplate, resetPasswordEmailTemplate, fields) {
        smsTemplate = helper.checkNullOrUndefined(smsTemplate);
        resetPasswordEmailTemplate = helper.checkNullOrUndefined( resetPasswordEmailTemplate );
        var formData = {
            "phone": phone,
            "otp": otp,
            "password": password,
            "resetPasswordEmailTemplate": resetPasswordEmailTemplate
        }
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: "PUT",
                uri: config.apidomain + phoneAuthEndpoint +"password/otp?apikey=" + config.apikey + "&smsTemplate=" + smsTemplate+config.serverRegion,
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(formData)
            }, function (data, status) {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    }

    // Phone Verify OTP( PUT )
    module.otp.verify = function (phone, otp, smsTemplate, fields) {
        smsTemplate = helper.checkNullOrUndefined(smsTemplate);
        var formData = {
            "phone": phone
        }
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: "PUT",
                uri: config.apidomain + phoneAuthEndpoint +"phone/otp?apikey=" + config.apikey + "&otp=" + otp + "&smsTemplate=" + smsTemplate+config.serverRegion,
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(formData)
            }, function (data, status) {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    }

    // Phone Verify OTP by Token( PUT )
    module.otp.verifyByToken = function ( access_token, otp, smsTemplate, fields) {
        smsTemplate = helper.checkNullOrUndefined(smsTemplate);
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: "PUT",
                uri: config.apidomain + phoneAuthEndpoint +"phone/otp?apikey=" + config.apikey + "&access_token=" + access_token + "&otp=" + otp + "&smsTemplate=" + smsTemplate+config.serverRegion,
                headers: {'content-type': 'application/json'}
            }, function (data, status) {
                if (helper.checkError(data, status)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    }
    
    //Remove phone ID by access token
    module.removePhoneIDbyaccesstoken = function(access_token) {
       // helper.checkFields(fields, config);
        return new Promise(function (resolve, reject){
            config.request({
                method: "DELETE",
                uri: config.apidomain + phoneAuthEndpoint +"phone/?apikey=" + config.apikey+config.serverRegion,
            headers: {'content-type': 'application/json', authorization: "Bearer " + access_token}
            }, function(data){
        if(helper.checkError(data)){
            reject(data);
        } else {
            resolve(data);
        }
    });
        });
    };   

    return module;
};