(function ()
{
    'use strict';

    angular
        .module('app.request',[])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider,USER_ROLES)
    {
        // State
        $stateProvider
            .state('app.request', {
                url    : '/request',
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
        $translatePartialLoaderProvider.addPart('app/main/request');

        // Api
        //msApiProvider.register('sample', ['app/data/sample/sample.json']);

        // Navigation 

        msNavigationServiceProvider.saveItem('phases.request', {
            title : 'request', 
            translate: 'REQUEST.REQUEST_NAV',
            icon     : 'icon-view-list',
            weight: 1
        });
        // Navigation
        msNavigationServiceProvider.saveItem('phases.request.service-request', {
            title : 'service request', 
            translate: 'REQUEST.REQUEST_SERVICE',
            state : 'app.login',
            weight: 1
        });

        msNavigationServiceProvider.saveItem('phases.request.list-request', {
            title : 'list request',
            translate: 'REQUEST.REQUEST_LIST',
            state : 'app.request',
            weight: 2
        });
    }
})();