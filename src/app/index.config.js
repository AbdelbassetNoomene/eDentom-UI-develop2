(function ()
{
    'use strict';

    angular
        .module('edentom')
        .config(config);

    /** @ngInject */
    function config($httpProvider, $compileProvider)
    {
        // Put your custom configurations here
    	$httpProvider.useApplyAsync(true); // use the $applyAsync feature introduced with Angular 1.3
    	$httpProvider.interceptors.push('authenticationInterceptor'); //'jwtInterceptor'

    	$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|blob):/); //|ftp|mailto|tel|file //<---- to enable receiving PDF-Files from REST-Server
    }

})();