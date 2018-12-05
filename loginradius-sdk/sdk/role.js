module.exports = function ( config ) {

    var module = {};
    module.permission = {};
    module.context = {};
    var roleEndpoint = "/identity/v2/manage/";
    var helper = require('./../helper.js');
    
    // Create Account Role( POST )
    module.create = function( formData, fields ) {
        helper.checkFields(fields, config);
        return new Promise( function( resolve, reject ) {
            config.request( { method: 'POST',uri: config.apidomain + roleEndpoint +"role?"+config.serverRegion,
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(formData) 
            },
            function (data, status) {
                if(helper.checkError(data, status)) {
                    reject( data );
                } else {
                    resolve( data );
                }
            },true);
        });
    }
    
    // Get Context with Roles and Permissions( GET )
    module.context.get = function( uid, fields ) {
        helper.checkFields(fields, config);
        return new Promise( function( resolve, reject ) {
            config.request( { uri: config.apidomain + roleEndpoint +"account/"+ uid +"/rolecontext?"+config.serverRegion },
                function (data, status) {
                if(helper.checkError(data, status)) {
                    reject( data );
                } else {
                    resolve( data );
                }
            },true);
        });
    }

    // Get Account Role( GET )
    module.get = function( fields) {
        helper.checkFields(fields, config);
        return new Promise( function( resolve, reject ) {
            config.request( { uri: config.apidomain + roleEndpoint +"role?"+config.serverRegion }, function (data, status) {
                if(helper.checkError(data, status)) {
                    reject( data );
                } else {
                    resolve( data );
                }
            },true);
        });
    }    
    
     // Get Roles by UID(GET)
     module.getRolesByUid = function( uid, fields ) {
        helper.checkFields(fields, config);
        return new Promise( function( resolve, reject ) {
            config.request( { uri: config.apidomain + roleEndpoint +"account/"+ uid +"/role?"+config.serverRegion },
                function (data, status) {
                if(helper.checkError(data, status)) {
                    reject( data );
                } else {
                    resolve( data );
                }
            },true);
        });
    }    
    	
    // Add Permissions To Role( PUT )
    module.permission.add = function(role, formData, fields) {
        helper.checkFields(fields, config);
        return new Promise( function( resolve, reject ) {
            config.request( { method: 'PUT', uri: config.apidomain + roleEndpoint +"role/" + role + "/permission?"+config.serverRegion , headers: { 'content-type': 'application/json' }, body: JSON.stringify(formData) }, function (data, status) {
                if(helper.checkError(data, status)) {
                    reject( data );
                } else {
                    resolve( data );
                }
            },true);
        });
    }

    // Assign Roles by UID( PUT )
    module.assignRolesByUid = function( uid, formData, fields ) {
        helper.checkFields(fields, config);
        return new Promise( function( resolve, reject ) {
            config.request( { method: 'PUT', uri: config.apidomain + roleEndpoint +"account/"+ uid +"/role?"+config.serverRegion,
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(formData) },
            function (data, status) {
                if(helper.checkError(data, status)) {
                    reject( data );
                } else {
                    resolve( JSON.stringify(data) );
                }
            },true);
        });
    }    
    
    // Add/Update Role Context with  Roles and Permissions( PUT )
    module.context.add = function( uid, formData, fields ) {
        helper.checkFields(fields, config);
        return new Promise( function( resolve, reject ) {
            config.request( { method: 'PUT', uri: config.apidomain + roleEndpoint +"account/"+ uid +"/rolecontext?"+config.serverRegion, headers: { 'content-type': 'application/json' }, body: JSON.stringify(formData) }, function (data, status) {
                if(helper.checkError(data, status)) {
                    reject( data );
                } else {
                    resolve( JSON.stringify(data) );
                }
            },true);
        });
    }

    // Delete Account Role( DELETE )
    module.remove = function(role, fields) {
        helper.checkFields(fields, config);
        return new Promise( function( resolve, reject ) {
            config.request( {method: 'DELETE', uri: config.apidomain + roleEndpoint +"role/"+ role+"?"+config.serverRegion }, function (data, status) {
                if(helper.checkError(data, status)) {
                    reject( data );
                } else {
                    resolve( data );
                }
            },true);
        });
    }

    // Unassign Roles by UID ( DELETE )
    module.unassignRolesByUid = function( uid, formData, fields ) {
        helper.checkFields(fields, config);
        return new Promise( function( resolve, reject ) {
            config.request( { method: 'DELETE', uri: config.apidomain + roleEndpoint +"account/" + uid + "/role/?"+config.serverRegion, headers: { 'content-type': 'application/json' }, body: JSON.stringify(formData) }, function (data, status) {
                if(helper.checkError(data, status)) {
                    reject( data );
                } else {
                    resolve( data );
                }
            },true);
        });
    }

    // Remove Account Permission( DELETE )
    module.permission.remove = function(rolename, formData, fields) {
        helper.checkFields(fields, config);
        return new Promise( function( resolve, reject ) {
            config.request( { method: 'DELETE', uri: config.apidomain + roleEndpoint +"role/"+ rolename +"/permission?"+config.serverRegion , headers: { 'content-type': 'application/json' }, body: JSON.stringify(formData) }, function (data, status) {
                if(helper.checkError(data, status)) {
                    reject( data );
                } else {
                    resolve( data );
                }
            },true);
        });
    }

    // Delete Context ( DELETE )
    module.context.delete = function( uid, roleContextName, fields ) {
        helper.checkFields(fields, config);
        return new Promise( function( resolve, reject ) {
            config.request( { method: 'DELETE', uri: config.apidomain + roleEndpoint +"account/" + uid + "/rolecontext/" + roleContextName+"?"+config.serverRegion, headers: { 'content-type': 'application/json' } }, function (data, status) {
                if(helper.checkError(data, status)) {
                    reject( data );
                } else {
                    resolve( data );
                }
            },true);
        });
    }

    // Delete Role from context ( Delete )
    module.context.deleteRole = function( uid, roleContextName, roleName, fields ) {
        var formData = { "Roles" : [roleName] };
        helper.checkFields(fields, config);
        return new Promise( function( resolve, reject ) {
            config.request( { method: 'DELETE', uri: config.apidomain + roleEndpoint +"account/" + uid + "/rolecontext/" + roleContextName + "/role?"+config.serverRegion, headers: { 'content-type': 'application/json' }, body: JSON.stringify(formData) }, function (data, status) {
                if(helper.checkError(data, status)) {
                    reject( data );
                } else {
                    resolve( data );
                }
            },true);
        });
    }

    // Delete Additional Permission ( Delete )
    module.context.deletePermission = function( uid, roleContextName, additionalPermission, fields ) {
        var formData = { "AdditionalPermissions" : [additionalPermission] };
        helper.checkFields(fields, config);
        return new Promise( function( resolve, reject ) {
            config.request( { method: 'DELETE', uri: config.apidomain + roleEndpoint +"account/" + uid + "/rolecontext/" + roleContextName + "/additionalpermission?"+config.serverRegion, headers: { 'content-type': 'application/json' }, body: JSON.stringify(formData) }, function (data, status) {
                if(helper.checkError(data, status)) {
                    reject( data );
                } else {
                    resolve( data );
                }
            },true);
        });
    }

    return module;
};