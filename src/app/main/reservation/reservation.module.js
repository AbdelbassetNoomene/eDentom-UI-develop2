(function ()
{
    'use strict';

    angular
        .module('app.reservation',[])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider,USER_ROLES)
    {
        // State
        $stateProvider
            .state('app.reservation', {
                url    : '/reservation',
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
        $translatePartialLoaderProvider.addPart('app/main/reservation');

        // Api
        //msApiProvider.register('sample', ['app/data/sample/sample.json']);

        // Navigation 

        msNavigationServiceProvider.saveItem('phases.reservation', {
            title : 'reservation ', 
            translate: 'RESERVATION.RESERVATION_NAV',
            icon     : 'icon-view-list',
            state : 'app.reservation',
            weight: 3
        });
    }
})();