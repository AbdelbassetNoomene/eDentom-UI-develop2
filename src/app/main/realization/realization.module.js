(function ()
{
    'use strict';

    angular
        .module('app.realization',[])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider,USER_ROLES)
    {
        // State
        $stateProvider
            .state('app.realization', {
                url    : '/realization',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/offer/offer.html'
                    }
                },
                requiresLogin:   false,
                authorizedRoles: [USER_ROLES.all]/*,
                resolve: {
                    SampleData: function (msApi)
                    {
                        return msApi.resolve('sample@get');
                    }
                }*/
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/realization');

        // Api
       // msApiProvider.register('sample', ['app/data/sample/sample.json']);

        // Navigation 

        msNavigationServiceProvider.saveItem('phases.realization', {
            title : 'realization ', 
            translate: 'REALIZATION.REALIZATION_NAV',
            icon     : 'icon-view-list',
            state : 'app.realization',
            weight: 4
        });
    }
})();