(function ()
{
    'use strict';

    angular.module('edentom')
           .controller('ReviseController', ReviseController);

    /** @ngInject */
    function ReviseController($mdDialog, $log, error)
    {
    	// Data
        var vm         = this;
        vm.closeDialog = closeDialog;
	    var data       = {
			title:         'Revidieren von Änderungen',
			message:       'Sollen die Änderungen revidiert werden. Damit stehen sie für keinen weiteren Lauf zur Verfügung?',
			confirmButton: 'Revidieren'
		};
		vm.confirm       = confirm;
		vm.confirmButton = data.confirmButton;
		vm.error         = error;
		vm.message       = data.message;
		vm.title         = data.title;

		//---------------------Implementation details
		function confirm() {
        	vm.message = '';
        	vm.error = '';
			$log.debug('Die Änderungen revidieren');
			$mdDialog.hide({message: '', error: '', revise: true});
		}

		function closeDialog() {
			$mdDialog.candel();
		}
	}

})();
