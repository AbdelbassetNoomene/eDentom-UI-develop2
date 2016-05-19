(function ()
{
    'use strict';

    angular
        .module('app.resource-management',[])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider,USER_ROLES)
    {
        // State
        $stateProvider
            .state('app.resource-management', {
                url    : '/resource-management', 
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/resource-management/resource-management.html',
                        controller : 'ResourceManagementController as vm'
                    }
                }, 
                requiresLogin:   false,
                authorizedRoles: [USER_ROLES.all] 
            })
            .state('app.resource-management.skills', {
                url    : '/resource-management/skills', 
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/resource-management/views/skills.html' 
                    }
                }, 
                requiresLogin:   false,
                authorizedRoles: [USER_ROLES.all] 
            })
            .state('app.resource-management.personel', {
                url    : '/resource-management/personel', 
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/resource-management/views/personel.html',
                        controller : 'ResourceManagementController as vm' 
                    }
                }, 
                requiresLogin:   false,
                authorizedRoles: [USER_ROLES.all] 
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/resource-management');

        // Api
        //msApiProvider.register('personel', ['app/data/resource-management/personel.json']);
      //msApiProvider.register('personel', ['app/data/resource-management/personel.json']);

        // Navigation 

        msNavigationServiceProvider.saveItem('phases.ressource', {
            title : 'ressource management',
            translate: 'RESOURCE_MANAGEMENT.RESOURCE_MANAGEMENT_NAV',
            icon     : 'icon-view-list',
            state : 'app.resource-management',
            weight: 7
        }); 
        msNavigationServiceProvider.saveItem('phases.ressource.competence', {
            title : 'competence', 
            translate: 'RESOURCE_MANAGEMENT.SKILLS.TITLE',
            weight: 1
        });

        msNavigationServiceProvider.saveItem('phases.ressource.personal', {
            title : 'personal', 
            translate: 'RESOURCE_MANAGEMENT.PERSONEL',
            weight: 2
        });
        msNavigationServiceProvider.saveItem('phases.ressource.instrument', {
            title : 'instrument',
            translate: 'RESOURCE_MANAGEMENT.INSTRUMENT', 
            weight: 3
        });
    
        msNavigationServiceProvider.saveItem('phases.ressource.availability-time', {
            title : 'availability time', 
            translate: 'RESOURCE_MANAGEMENT.Availability_Time',
            weight: 4
        });
        msNavigationServiceProvider.saveItem('phases.ressource.price', {
            title : 'price', 
            translate: 'RESOURCE_MANAGEMENT.PRICE',
            weight: 5
        });
    }
})();