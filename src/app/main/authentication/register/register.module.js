(function ()
{
    'use strict';

    angular
        .module('app.authentication.register', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider)
    {
        // State
        $stateProvider.state('app.register', {
            url      : '/register', 
            views  : {
                'content@app': { //app.login
                    templateUrl: 'app/main/authentication/register/register.html',
                    controller : 'RegisterController as vm'
                }
            },
            bodyClass: 'register', 
            requiresLogin:   false,
            authorizedRoles: ['*']
        }); 

        // Translate
        $translatePartialLoaderProvider.addPart('app/main/authentication/register'); 
    }

})();