(function ()
{
    'use strict';

    angular
        .module('app.offer', ['app.authentication'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider, API_URL, USER_ROLES)
    {
        // State
        $stateProvider
            .state('app.offer-mobileScanAgent', {
                url    : '/offer/mobileScanAgent',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/offer/offer.html',
                        controller : 'MobileScanAgentController as vm'
                    }
                }, 
                resolve: {
                    dataScanAgent: function (msApi) {
                        return msApi.request('listScanAgent@get');
                    }
                }, 
                requiresLogin:   false,
                authorizedRoles: [USER_ROLES.all]
            })
            .state('app.offer-DigitalImprint', {
                url    : '/offer/DigitalImprint',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/offer/offer.html',
                        controller : 'DigitalImprintController as vm'
                    }
                }, 
                resolve: {
                    dataDigitalImprint: function (msApi) {
                        return msApi.request('listLabo@get');
                    }
                }, 
                requiresLogin:   false,
                authorizedRoles: [USER_ROLES.all]
            })
            .state('app.offer-create', {
                url    : '/create-offer',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/offer/views/create-offer/create-offer.html',
                        controller : 'OfferManagementController as vm'
                    }
                },  
                requiresLogin:   false,
                authorizedRoles: [USER_ROLES.all]
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/offer');
        

        // Api
        msApiProvider.register('listScanAgent', [API_URL + 'labo/scan-agents/', {}, {
            get: {method:'GET', params: {},  isArray: true}
        }]); 

        // Api
        msApiProvider.register('listLabo', [API_URL + 'labo/labos', {}, {
            get: {method:'GET', params: {},  isArray: true}
        }]);  

        // Navigation
        msNavigationServiceProvider.saveItem('phases', {
            title : 'PHASES',
            group : true,
            weight: 0
        });

        msNavigationServiceProvider.saveItem('phases.offer', {
            title : 'offer',
            translate: 'OFFER.OFFER_NAV',
            icon     : 'icon-view-list',
            //state : 'app.offer-mobileScanAgent', 
            weight: 2
        });
        // Navigation
        msNavigationServiceProvider.saveItem('phases.offer.service-offer', {
            title : 'service offer',
            translate: 'OFFER.OFFER_SERVICE', 
            state : 'app.offer-create',
            weight: 1
        });
        msNavigationServiceProvider.saveItem('phases.offer.list-offer', {
            title : 'list offer',
            translate: 'OFFER.OFFER_LIST',
            state : 'app.offer-mobileScanAgent',
            /*badge : {
                content: vm.scanAgents.length,
                color  : '#F44336'
            },*/
            weight: 2
        }); 

       
        msNavigationServiceProvider.saveItem('phases.offer.status-offer', {
            title : 'offer status',
            translate: 'OFFER.OFFER_STATUS',
            //state : 'app.login',
            weight: 3
        });
        msNavigationServiceProvider.saveItem('phases.cad-cam', {
            title : 'CAD-CAM',
            translate: 'CAD_CAM.CAD_CAM_NAV',
            icon     : 'icon-view-list', 
            weight: 6
        });
        // Navigation
        msNavigationServiceProvider.saveItem('phases.cad-cam.instruments-availibilty', {
            title : 'instrument avalibility', 
            translate: 'CAD_CAM.INSTRUMENT_AVALIBILITY',
            weight: 1
        });

        msNavigationServiceProvider.saveItem('phases.cad-cam.number-of-sessions-per-restoration', {
            title : 'Number of sessions per restoration', 
            translate: 'CAD_CAM.SESSION_NUMBER',
            weight: 2
        });
        msNavigationServiceProvider.saveItem('phases.cad-cam.home-visit', {
            title : 'home visit', 
            translate: 'CAD_CAM.HOME_VISIT',
            weight: 3
        });
    }
})();