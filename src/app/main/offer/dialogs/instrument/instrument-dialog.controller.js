(function ()
{
    'use strict';

    angular.module('app.offer')
        .controller('InstrumentDialogController', InstrumentDialogController);

    /** @ngInject */
    function InstrumentDialogController($mdDialog)
    {
        var vm = this;

        // Data 

        // Methods
         
        vm.closeDialog = closeDialog;

        //////////

        function closeDialog()
        {
            $mdDialog.hide();
        } 
    }
})();
