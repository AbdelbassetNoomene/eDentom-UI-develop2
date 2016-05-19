(function ()
{
    'use strict';

    angular.module('app.offer')
        .controller('SchemaDialogController', SchemaDialogController);

    /** @ngInject */
    function SchemaDialogController($log, $mdDialog, typeOperation, $rootScope)
    {
        var vm = this;

        // Data
        vm.typeOperation = typeOperation;
        vm.offStateUrl   = '../assets/images/teeth/unselected/'; //folder contain list of teeth white color
        vm.onStateUrl    = '../assets/images/teeth/selected/'; //folder contain list of teeth blue color

        vm.up1 = '1-1UP';
        vm.up2 = '2-1UP';
        vm.up3 = '3-1UP'; 

        vm.down1 = '1-1DOWN';
        vm.down2 = '2-1DOWN';
        vm.down3 = '3-1DOWN'; 

        // Methods
         
        vm.closeDialog = closeDialog;
        vm.selectTooth = selectTooth;
        vm.validate    = validate;
        vm.teethList   = [];

        //////////

        var antagonist = function(toothNumber)
        {
            var dozens    = toothNumber.substring(1, 0),
                smallest  = toothNumber.substring(1, 2),
                antagonist ; 

            if (dozens === '1') { antagonist = '4' +smallest;}
            if (dozens === '2') { antagonist = '3' +smallest;}
            if (dozens === '3') { antagonist = '2' +smallest;}
            if (dozens === '4') { antagonist = '1' +smallest;} 

            return antagonist;
        };

        function closeDialog()
        {
            $mdDialog.hide();
        }

        function selectTooth(event)
        {
            var stateTooth = $(event.currentTarget).attr('status');

            var toothNumber = $(event.currentTarget).attr('id').split('-')[1];

            // adapter les fond des mourceaux selon le choix 

            var up1List = ['11','12','13','21','22','23'],
                up2List = ['14','15','16','17','18'],
                up3List = ['24','25','26','27','28'],

                down1List = ['31','32','33','41','42','43'],
                down2List = ['44','45','46','47','48'],
                down3List = ['34','35','36','37','38'];

            if  ( up1List.indexOf( toothNumber ) > -1) { vm.up1 = '1UP'; }
            if  ( up2List.indexOf( toothNumber ) > -1) { vm.up2 = '2UP'; }
            if  ( up3List.indexOf( toothNumber ) > -1) { vm.up3 = '3UP'; }

            if  ( down1List.indexOf( toothNumber ) > -1) { vm.down1 = '1DOWN'; }
            if  ( down2List.indexOf( toothNumber ) > -1) { vm.down2 = '2DOWN'; }
            if  ( down3List.indexOf( toothNumber ) > -1) { vm.down3 = '3DOWN'; }


            // l'opération Veneer ne  peut s'appliquer que pour veneerList des dents. ce qui explique ce test  
            if (typeOperation === 'Veneer') 
            {
                // this array contains the list of tooth's number which can support veneer operation
                var veneerList = ['11','12','13','21','22','23','31','32','33','41','42','43'];

                if  ( veneerList.indexOf( toothNumber ) > -1)
                {
                    if (stateTooth === 'off') {

                        $(event.currentTarget).attr('status','on');

                        stateTooth = $(event.currentTarget).attr('status');

                        $(event.currentTarget).attr('src',vm.onStateUrl +toothNumber +'.png' );

                        $log.debug('after clicking & current status '+stateTooth );
                    }
                    else if (stateTooth === 'on') {

                        $(event.currentTarget).attr('status','off');

                        stateTooth = $(event.currentTarget).attr('status');

                        $(event.currentTarget).attr('src',vm.offStateUrl +toothNumber +'.png' );

                        $log.debug('after clicking & current status '+stateTooth );
                    } 

                    vm.up2   = '2-1UP';
                    vm.up3   = '3-1UP';  
                    vm.down2 = '2-1DOWN';
                    vm.down3 = '3-1DOWN';   
                }
            } 

            else {

                if (stateTooth === 'off') {

                    $(event.currentTarget).attr('status','on');

                    stateTooth = $(event.currentTarget).attr('status');

                    $(event.currentTarget).attr('src',vm.onStateUrl +toothNumber +'.png' );

                    $log.debug('after clicking & current status '+stateTooth );
                }
                else if (stateTooth === 'on') {

                    $(event.currentTarget).attr('status','off');

                    stateTooth = $(event.currentTarget).attr('status');

                    $(event.currentTarget).attr('src',vm.offStateUrl +toothNumber +'.png' );

                    $log.debug('after clicking & current status '+stateTooth );
                } 
            } 
        } 

        function validate()
        { 

            $('#schema-dental-dialog').find('img').each(function (element) {

                
                if ($(this).attr('status') === 'on')
                {

                    var idTooth  = $(this).attr('id').split('-')[1];

                    var antatg = antagonist(idTooth); 

                    $log.debug('idTooth : ' +idTooth); 

                    $log.debug('antagonist : ' +antatg);   

                    if (typeOperation === 'Veneer')
                    {
                        $rootScope.teethOperation.veneer.teethList.push(idTooth);
                        $rootScope.teethOperation.veneer.antagonistList.push(antatg); 
                    }

                    if (typeOperation === 'Krone')
                    {
                        $rootScope.teethOperation.krone.teethList.push(idTooth);
                        $rootScope.teethOperation.krone.antagonistList.push(antatg); 
                    }

                    if (typeOperation === 'Brucke')
                    {
                        $rootScope.teethOperation.bridge.teethList.push(idTooth);
                        $rootScope.teethOperation.bridge.antagonistList.push(antatg); 
                    }
                    

                    if (typeOperation === 'In-Onlay')
                    {
                        $rootScope.teethOperation.inOnlay.teethList.push(idTooth);
                        $rootScope.teethOperation.inOnlay.antagonistList.push(antatg); 
                    }  

                    if (typeOperation === 'Implantat')
                    {
                        $rootScope.teethOperation.implantat.teethList.push(idTooth);
                        $rootScope.teethOperation.implantat.antagonistList.push(antatg); 
                    }  
                }  
            });

            $mdDialog.hide();
        } 
    }
})();
