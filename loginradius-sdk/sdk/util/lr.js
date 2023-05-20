/*
 * Created by LoginRadius Development Team
 * Copyright 2019 LoginRadius Inc. All rights reserved.
 */

const https = require('https');
const path = require('path');

module.exports = function (config = {}) {
  // Validate required configuration values
  if (config.apiKey === undefined || config.apiSecret === undefined) {
    throw new Error('Please set apiKey and apiSecret');
  }

  // Set helper path
  const HELPER_PATH = path.join(__dirname, 'helper.js');
  const helper = require(HELPER_PATH)(config);

  // Define request function
  config.request = function (type, resourcePath, queryParameters, formData) {
    let isApiSecret;
    if (queryParameters.apiSecret) {
      isApiSecret = queryParameters.apiSecret;
      delete queryParameters.apiSecret;
    }

    if (!helper.isNullOrWhiteSpace(config.serverRegion)) {
      queryParameters.region = config.serverRegion;
    }

    let headers = { 'Content-Type': 'application/json' };

    if (queryParameters.sott) {
      Object.assign(headers, { 'X-LoginRadius-Sott': queryParameters.sott });
      delete queryParameters.sott;
    }
    if (!helper.isNullOrWhiteSpace(config.originIp)) {
      Object.assign(headers, { 'X-Origin-IP': config.originIp });
    }
    const queryString = helper.getQueryString(queryParameters);

    if (queryParameters.access_token) {
      Object.assign(headers, {
        authorization: 'Bearer ' + queryParameters.access_token,
      });
      delete queryParameters.access_token;
    }

    let options = {
      method: type,
      hostname:
        resourcePath === 'ciam/appinfo'
          ? 'config.lrcontent.com'
          : config.apiDomain,
      path: '/' + resourcePath + (queryString ? '?' + queryString : ''),
      headers: headers,
    };

    if (formData !== '' && formData !== null) {
      const out_text = JSON.stringify(formData);
      Object.assign(headers, { 'Content-Length': out_text.length });
    }

    if (config.proxy && config.proxy.host && config.proxy.port) {
      options.proxy =
        (config.proxy.protocol ? config.proxy.protocol : 'http') +
        '://' +
        config.proxy.user +
        ':' +
        config.proxy.password +
        '@' +
        config.proxy.host +
        ':' +
        config.proxy.port;
    }

    const customHeader = {
      'X-LoginRadius-apiKey': config.apiKey,
      'X-LoginRadius-apiSecret': config.apiSecret,
    };

    if (config.fieldsParam && config.fieldsValue) {
      let fieldsList;
      if (options.path.match(/\?./)) {
        fieldsList = config.fieldsParam + encodeURIComponent(config.fieldsValue);
      } else {
        fieldsList = '?fields=' + encodeURIComponent(config.fieldsValue);
      }
      options.path += fieldsList;
    }

    if (isApiSecret) {
      if (config.apiRequestSigning) {
        if (!options.path.match('apiKey')) {
          options.path += '&apiKey=' + encodeURIComponent(config.apiKey);
        }
        const signingHeader = helper.generateSigningHeader(
          options,
          config.apiSecret
        );

        Object.assign(options.headers, signingHeader);
      } else {
        Object.assign(options.headers, customHeader);
      }
    }

    return new Promise(function (resolve, reject) {
      const req = https
        .request(options, (resp) => {
          let data = '';

          if (
            Object.prototype.hasOwnProperty.call(resp, 'statusCode') &&
            resp.statusCode === 429
          ) {
            const jsondata = {
              Description: 'Too many requests in a particular time frame',
              ErrorCode: 429,
              Message: 'Too many requests in a particular time frame',
              IsProviderError: false,
              ProviderErrorResponse: null,
            };
            helper.manageRequestResponse('serverError', jsondata, resolve, reject);
          } else {
            resp.on('data', (chunk) => {
              data += chunk;
            });

            resp.on('end', () => {
              try {
                const response = JSON.parse(data);
                helper.manageRequestResponse('', response, resolve, reject);
              } catch (err) {
                helper.manageRequestResponse('serverError', '', resolve, reject);
              }
            });
          }
        })
        .on('error', (error) => {
          helper.manageRequestResponse('serverError', error, resolve, reject);
        });

      if (formData) {
        req.write(formData);
      }

      req.end();
    });
  };

  // Set default apiDomain if not provided
  config.apiDomain = config.apiDomain && config.apiDomain !== '' ? config.apiDomain : 'api.loginradius.com';

  return {
    helper,

    // Group related APIs together for better organization
    accountApi: require(path.join(__dirname, '..', 'api', 'account', 'accountApi'))(config),
    roleApi: require(path.join(__dirname, '..', 'api', 'account', 'roleApi'))(config),
    sottApi: require(path.join(__dirname, '..', 'api', 'account', 'sottApi'))(config),
    configurationApi: require(path.join(__dirname, '..', 'api', 'advanced', 'configurationApi'))(config),
    customObjectApi: require(path.join(__dirname, '..', 'api', 'advanced', 'customObjectApi'))(config),
    multiFactorAuthenticationApi: require(path.join(
      __dirname,
      '..',
      'api',
      'advanced',
      'multiFactorAuthenticationApi'
    ))(config),
    webHookApi: require(path.join(__dirname, '..', 'api', 'advanced', 'webHookApi'))(config),
    consentManagementApi: require(path.join(__dirname, '..', 'api', 'advanced', 'consentManagementApi'))(config),
    reAuthenticationApi: require(path.join(__dirname, '..', 'api', 'advanced', 'reAuthenticationApi'))(config),
    authenticationApi: require(path.join(__dirname, '..', 'api', 'authentication', 'authenticationApi'))(config),
    oneTouchLoginApi: require(path.join(__dirname, '..', 'api', 'authentication', 'oneTouchLoginApi'))(config),
    passwordLessLoginApi: require(path.join(__dirname, '..', 'api', 'authentication', 'passwordLessLoginApi'))(config),
    phoneAuthenticationApi: require(path.join(__dirname, '..', 'api', 'authentication', 'phoneAuthenticationApi'))(config),
    riskBasedAuthenticationApi: require(path.join(
      __dirname,
      '..',
      'api',
      'authentication',
      'riskBasedAuthenticationApi'
    ))(config),
    pinAuthenticationApi: require(path.join(__dirname, '..', 'api', 'authentication', 'pinAuthenticationApi'))(config),
    smartLoginApi: require(path.join(__dirname, '..', 'api', 'authentication', 'smartLoginApi'))(config),
    nativeSocialApi: require(path.join(__dirname, '..', 'api', 'social', 'nativeSocialApi'))(config),
    socialApi: require(path.join(__dirname, '..', 'api', 'social', 'socialApi'))(config),
  };
};
