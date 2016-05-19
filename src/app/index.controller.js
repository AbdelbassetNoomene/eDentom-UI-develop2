(function ()
{
    'use strict';

    angular.module('edentom')
        .controller('IndexController', IndexController);

    /** @ngInject */
    function IndexController(fuseTheming, $scope, $rootScope, $filter, $log, $location, $mdDialog, $document, authenticator, AUTH_EVENTS)
    {
    	// Data
        var vm                    = this;
        vm.themes                 = fuseTheming.themes;
        $rootScope.user           = authenticator.getUser();
        $rootScope.expirationDate = $filter('date')(authenticator.getExpirationDate(), 'dd.MM.yyyy HH:mm:ss');
 	    $rootScope.hasRole        = hasRole;

    	//----------------Implementation details
	    function hasRole(role) {
		    return authenticator.hasRole(role);
	    }

	    /**
	     * Logout in the Frontend (client side)
	     */
	    function uiLogout(doRedirect) {
   		    $log.debug('Delete Tokens and Logout in the Frontend');
	    	authenticator.logout();
	    	if(doRedirect) {
	    		$location.path('/login');
	    	}
	    }

	    /**
	     * show the received accessError or authError from the Server to the user
	     */
	    function showErrorDialog(message, isAuthError) {

	    	$rootScope.$broadcast('msSplashScreen::remove'); //remove the splashScreen because it hides the dialog

			// Appending dialog to document.body
		    var confirm = $mdDialog.confirm()
		          .title('Achtung')
		          .textContent(message)
		          .ariaLabel('Achtung')
		          //.targetEvent(ev)
		          .clickOutsideToClose(false)
		          .parent(angular.element(document.body))
		          .ok('Ok');
		          //.cancel('Nicht einloggen');

		    $mdDialog.show(confirm).then(function() {
		    	if(isAuthError) {
		    		$log.debug('Sie wollen sich einloggen');
			    	uiLogout(true);
		    	}
		    }, function() {
		    	if(isAuthError) {
		    		uiLogout(false);
		    	}
		    });
		}

	    /**
	     * check authError
	     */
		$scope.$watch('authError', function(newValue, oldValue) {
            if(newValue && (newValue !== '')) {
                $log.debug('authError changed: ' + oldValue + ' --> ' + newValue);
                showErrorDialog($rootScope.authError, true);
            }
        });
		/**
		 * check accessError
		 */
		$scope.$watch('accessError', function(newValue, oldValue) {
            if(newValue && (newValue !== '')) {
                $log.debug('accessError changed: ' + oldValue + ' --> ' + newValue);
                showErrorDialog($rootScope.accessError, false);
            }
        });
		//<div class="alert alert-danger" ng-show="accessError" ng-bind="accessError"></div>

		/**
         * Show logout dialog
         * @param event
         */
		function showLogoutDialog(event) {
		$mdDialog.show({
	            controller         : 'LogoutController',
	            controllerAs       : 'vm',
	            templateUrl        : 'app/main/authentication/logout/logout.dialog.html',
	            parent             : angular.element($document.body),
	            targetEvent        : event,
	            clickOutsideToClose: true
	        }).then(function (response) {
	        	$mdDialog.cancel();
	        });
		}

		$scope.$on(AUTH_EVENTS.logoutWanted, function (event) {

			$log.debug(AUTH_EVENTS.logoutWanted + ' event received');
			showLogoutDialog(event);
		});

		$scope.$on(AUTH_EVENTS.tokenChanged, function (event) {

			$log.debug(AUTH_EVENTS.tokenChanged + ' event received');
			$rootScope.expirationDate = $filter('date')(authenticator.getExpirationDate(), 'dd.MM.yyyy HH:mm:ss');
		});
    }
})();
