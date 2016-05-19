(function ()
{
    'use strict';

    angular
        .module('app.authentication.register')
        .controller('RegisterController', RegisterController);

    /** @ngInject */
    function RegisterController($log, $scope)
    {
        // Data
    	//var vm          = this;
    	//vm.imageCharged = imageCharged;

        // Methods 

        // i used  $scope methode because we can't AS vm syntax here "angular.element(this).scope().imageCharged(event);" vm can't replace scope 
        $scope.imageCharged = function(event) {
        	$log.debug( event.currentTarget.value);

            var imgName = $(event.currentTarget.value);

            $log.debug( imgName.selector.split('\\')[2]); 
               
        }; 

        //////////

        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        function success(pos) {
            var crd = pos.coords;

            $log.debug('Your current position is:');
            $log.debug('Latitude : ' + crd.latitude);
            $log.debug('Longitude: ' + crd.longitude);
            $log.debug('More or less ' + crd.accuracy + ' meters.');
        } 

        function error(err) {
            $log.warn('ERROR(' + err.code + '): ' + err.message);
        }

        navigator.geolocation.getCurrentPosition(success, error, options);
    }
})();