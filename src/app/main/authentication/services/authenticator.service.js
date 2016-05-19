(function() {
	'use strict';

	angular.module('app.authentication')
		   .factory('authenticator', authenticator);

	/** @ngInject */
    function authenticator($cookies, $location, $rootScope, $filter, Base64, $sanitize, API_URL, AUTH_EVENTS, authService, jwtHelper) {

    	return {
            authenticate:       authenticate,
            deleteToken:        deleteToken,
            deleteUserSettings: deleteUserSettings,
            getDecodedToken:    getDecodedToken,
            getExpirationDate:  getExpirationDate,
            getToken:           getToken,
            getUser:            getUser,
            hasRole:            hasRole,
            isAuthenticated:    isAuthenticated,
            isAuthorized:       isAuthorized,
            logout:             logout,
            setToken:           setToken
        };

        function authenticate (loginRequest, callback) {

            console.log('credentials, userName: ' + loginRequest.userName);
            var credentials = Base64.encode(loginRequest.userName + ':' + loginRequest.password);
            console.log('Base64 encrypted credentials: ' + credentials);

            if(isAuthenticated()) {
                console.log('User is already authenticated: ' + getUser().userName);
                $location.path('/scanagent'); //$location.path('/');
            } else {
                window.$.ajax({ // agent123, agent2,agent33, agent44, doc1,doc2,doc3,doc4,doc5, david, daria, ghazi
                	            // doc1    123
                	            // agent44 123
                    url: API_URL + 'authentification/login',
                    type: 'POST',
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader('Authorization', 'Basic ' + credentials);
                    },
                    dataType: 'json',
                    success: function (data) {
                    	console.log('Data: ' + JSON.stringify(data));
                        setToken(JSON.parse(JSON.stringify(data)).token);
                        console.log('authenticator: login successful (current token: <' + JSON.stringify(getToken()) + '>)');
                        authService.loginConfirmed();
                        callback(data, false);
                    },
                    error: function (data, status) {
                        deleteToken();
                        console.log('authenticator: login failed (data: ' + JSON.stringify(data) + ')');
                        $rootScope.$apply();
                        $rootScope.$broadcast(AUTH_EVENTS.loginFailed, status);
                        callback(data, true);
                    }
                });
            }
        }

        function deleteToken () {
			$cookies.remove('token');
        }

        function deleteUserSettings () {
			$cookies.remove('pisStatisticsParameters');
            $cookies.remove('scanAgentsParameters');
        }

        function getDecodedToken () {
        	var token = $cookies.getObject('token');
			if (token) {
                return jwtHelper.decodeToken(token);
            }
            return null;
        }

        function getExpirationDate () {
            var token = $cookies.getObject('token'); //getDecodedToken();
            if (token) {
                return jwtHelper.getTokenExpirationDate(token); //new Date(token.exp * 1000);
                //var isExpired = jwtHelper.isTokenExpired(token);
            }
            return null;
        }

        function getToken () {
			return $cookies.getObject('token');
        }

        function getUser () {
            var token = getDecodedToken();
            if ((token !== null) && (token !== undefined)) {
                console.log('decoded token = ' + JSON.stringify(token));
                return JSON.parse(token.SUB);
            }
            return null;
        }

        function hasRole (role) {
            if (getUser()) {
                var filteredRoles = $filter('filter')(getUser().roles, function(entry) {
                    if(entry === role){
                        return true;
                    }
                });
                return (filteredRoles.length > 0);
            }
            return null;
        }

        function isAuthenticated() {
            var boolean = getUser() && !!getUser().userName;
            console.log('--isAuthenticated: ' + boolean);
            return boolean;
        }

        function isAuthorized (authorizedRoles) {
        	console.log('isAuthorized for authorizedRoles = ' + JSON.stringify(authorizedRoles) + '?');

            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            if(authorizedRoles[0] === '*') {
            	return true;
            }
            var boolean = isAuthenticated() && ($filter('filter')(getUser().roles, function(entry) {
                //console.log('This User has Role: ' + JSON.stringify(entry));
                if (authorizedRoles.indexOf(entry) !== -1){
                    return true;
                }
            }).length > 0);
            console.log('This User has Roles: ' + JSON.stringify(getUser().roles) + ' --> isAuthorized = ' + boolean + ' ---> for ' + JSON.stringify(authorizedRoles));
            return boolean;
        }

        function logout () {
            $rootScope.user = null;
            deleteToken();
            deleteUserSettings(); // in our case, Settings for 'Report Values'
            console.log('authenticator: logout successful (current token: <' + JSON.stringify(getToken()) + '>)');
            //--$location.path('/login');
            //$rootScope.$broadcast(AUTH_EVENTS.loginRequired);
            //--$window.location.reload();
        }

        function setToken (token) {
            $cookies.putObject('token', token); //<-- to have the possibility to do a logout when the user closed the tab/browser and than want to log in
            $rootScope.$broadcast(AUTH_EVENTS.tokenChanged, token);
        }
}

})();
