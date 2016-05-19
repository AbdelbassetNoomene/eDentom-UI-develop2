(function ()
{
    'use strict';

    angular.module('app.offer')
        .controller('OperationDialogController', OperationDialogController);

    /** @ngInject */
    function OperationDialogController($log, $mdDialog ,toothNumber, $rootScope)
    {
        var vm = this;

        // Data
        vm.toothNumber = toothNumber;
        $log.debug(toothNumber);

        // this array contains the list of tooth's number which can support veneer operation
        var    veneerList = ['11','12','13','21','22','23','31','32','33','41','42','43'];

        if  ( veneerList.indexOf( toothNumber ) > -1) {vm.selectedOperation ='Veneer';} 
        else {vm.selectedOperation='Krone';}

        // Methods
         
        vm.closeDialog     = closeDialog;
        vm.selectOperation = selectOperation;

        //////////

        function closeDialog()
        {
            $mdDialog.hide();
        }

        function selectOperation(event)

        { 
            
            if ( vm.selectedOperation === 'Veneer')   { $rootScope.teethOperation.veneer.teethList.push( toothNumber ); }
            if ( vm.selectedOperation === 'Krone' )   { $rootScope.teethOperation.krone.teethList.push( toothNumber ); }
            if ( vm.selectedOperation === 'Brucke' )  { $rootScope.teethOperation.bridge.teethList.push( toothNumber ); }
            if ( vm.selectedOperation === 'In-Onlay') { $rootScope.teethOperation.inOnlay.teethList.push( toothNumber ); }
            if ( vm.selectedOperation === 'Implantat'){ $rootScope.teethOperation.implantat.teethList.push( toothNumber ); } 
                  
            $mdDialog.hide();
        } 
    }
})();
