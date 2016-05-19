(function ()
{
    'use strict';

    angular
        .module('app.scanagent', ['app.authentication'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider, API_URL, USER_ROLES)
    {
        // State
        $stateProvider.state('app.scanagent', {
                url    : '/scanagent',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/scanagent/scanagent.html',
                        controller : 'ScanAgentController as vm'
                    }
                },
                resolve: {
                    AgentsData: function (msApi) {
                        return msApi.request('agent@getAgents');
                    }
                },
                requiresLogin:   false,
                authorizedRoles: [USER_ROLES.all]
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/scanagent');

        // Api
        msApiProvider.register('company', [API_URL + 'company/list', {}, {
            list: {method:'GET', params: {},  isArray: true}
        }]);
         // Api
        msApiProvider.register('agent', [API_URL + 'labo/scan-agents', {}, {
            getAgents: {method:'GET', params: {},  isArray: true}
        }]); 
        //msApiProvider.register('job', ['app/data/job/job.json']);

        msNavigationServiceProvider.saveItem('edentom.scanagent', {
            title    : 'Scan-Agents',
            icon     : 'icon-view-list',
            state    : 'app.scanagent',
            /*stateParams: {
                'param1': 'page'
             },*/
            translate: 'SCAN_AGENT.SCAN_AGENT_NAV',
            weight   : 2
        });
    }
})();