(function ()
{
    'use strict';

    /**
     * Main module of edentom
     */
    angular
        .module('edentom', [

            // Core
            'app.core',

            // Navigation
            'app.navigation',

            // Toolbar
            'app.toolbar',

            // Quick panel
            'app.quick-panel',

            // Help
            'app.help',

            // apps

            'app.offer',
            'app.request',
            'app.reservation',
            'app.realization',
            'app.resource-management',
            
            'app.authentication',
            'app.clearances',
            'app.scanagent',

            // Module Dependencies

            'datatables', 
            'moment-picker',
            'uiGmapgoogle-maps',
            'angular-jwt',
            'ngCookies',
            'http-auth-interceptor',
            'md.data.table',
            'nvd3',
            'ui.router'
        ]);
})();