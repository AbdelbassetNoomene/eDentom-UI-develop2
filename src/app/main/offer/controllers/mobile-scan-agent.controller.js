(function ()
{
    'use strict';

    angular
        .module('app.offer')
        .controller('MobileScanAgentController', TaskOfferController);

    /** @ngInject */
    function TaskOfferController($log, $rootScope, $mdDialog, $interval, msNavigationService, dataScanAgent )
    {
        var vm = this;  

        var up1List = ['11','12','13','21','22','23'],
            up2List = ['14','15','16','17','18'],
            up3List = ['24','25','26','27','28'],

            down1List = ['31','32','33','41','42','43'],
            down2List = ['44','45','46','47','48'],
            down3List = ['34','35','36','37','38']; 

        vm.up1   = '1-1UP';
        vm.up2   = '2-1UP';
        vm.up3   = '3-1UP'; 

        vm.down1 = '1-1DOWN';
        vm.down2 = '2-1DOWN';
        vm.down3 = '3-1DOWN';  

        vm.showCookiesWindows = true;

        vm.query              = {order: 'id', limit: 6, page: 1};
        vm.onPaginate         = onPaginate;

        vm.offStateUrl = '../assets/images/teeth/unselected/'; //folder contains list of teeth white color
        vm.onStateUrl  = '../assets/images/teeth/selected/'; //folder contains list of teeth blue color    

        vm.scanAgents = dataScanAgent; 

        vm.cards = []; 

        /*msNavigationService.saveItem('phases.offer.list-offer', {
            title : 'list offer',
            translate: 'OFFER.OFFER_LIST',
            state : 'app.offer',
            badge : {
                content: vm.scanAgents.length,
                color  : '#F44336'
            },
            weight: 2
        }); */

        // Methods
        
        vm.init                 = init; 
        vm.getDetails           = getDetails;
        vm.openInstrumentDialog = openInstrumentDialog;
        vm.openOperationDialog  = openOperationDialog;
        vm.openSchemaDialog     = openSchemaDialog;
        vm.removeCookiesWindows = removeCookiesWindows;

        ////////// 
        
        initializeMap();

        init();  

        function onPaginate(page, limit) {
           
        	$log.debug('Query.page: %s, Query.limit: %s' , vm.query.page , vm.query.limit);
        	$log.debug('Page: %s, Limit: %s',page, limit); 

            vm.promise = $interval(function () {}, 2000);
        }

        function getDetails(event) {
           
            var idAgent = $(event.currentTarget).attr('id');
            $log.debug('Page: %s ',idAgent); 
        } 

        function initializeMap() 
        {

            var map, 
            mapOptions = {
                zoom: 13,
                options: { scrollwheel: true }, 
                center: new google.maps.LatLng( 54.350106, 10.148231)
            }; 

            map = new google.maps.Map(document.getElementById('map_canvas'),mapOptions);  
           
            for (var i=0; i<  vm.scanAgents.length ; i++) { 
                new google.maps.Marker({ 

                    id: vm.scanAgents[i].id, 
                    fullName: vm.scanAgents[i].firstName +' ' +  vm.scanAgents[i].lastName,
                    email    : vm.scanAgents[i].mail, 
                    adress    : vm.scanAgents[i].address.streetNumber +' ' + vm.scanAgents[i].address.street +'.' + vm.scanAgents[i].address.postalCode +' ' + vm.scanAgents[i].address.city  +'.' + vm.scanAgents[i].address.country,
                    position: {
                        lat:  vm.scanAgents[i].address.currentLatitude,
                        lng:  vm.scanAgents[i].address.currentLongitude
                      },
                    map: map, 
                    icon: 'assets/images/doc/'+vm.scanAgents[i].picture, 
                    optimized:false,
                })
                .addListener('click', getDetailOffer);
            } 

            var myoverlay = new google.maps.OverlayView();

            myoverlay.draw = function () {
                this.getPanes().markerLayer.id='markerLayer';
            };
            
            myoverlay.setMap(map);
        }

        function getDetailOffer() 
        {
            alert('hello');
        }  

        /**
         * init function 
         *
         */
        function init()
        { 
            /**
             * update views every 200 ms
             *
             */  
            $interval
            (
                function updateView() 
                {

                    for ( var oper in  $rootScope.teethOperation) 
                    {
                        
                        var teethListOperation = $rootScope.teethOperation[oper].teethList;

                        for ( var tooth  in  teethListOperation) 
                        {
                            // update the shema dental in left side 

                            $('#schema-dental').find('#tooth-'+ teethListOperation[tooth]).each(function (element) {

                                // adapter les fond des mourceaux selon le choix 

                                if  ( up2List.indexOf( teethListOperation[tooth] ) > -1) { vm.up1 = '1UP'; }
                                if  ( up2List.indexOf( teethListOperation[tooth] ) > -1) { vm.up2 = '2UP'; }
                                if  ( up3List.indexOf( teethListOperation[tooth] ) > -1) { vm.up3 = '3UP'; }

                                if  ( down1List.indexOf( teethListOperation[tooth] ) > -1) { vm.down1 = '1DOWN'; }
                                if  ( down2List.indexOf( teethListOperation[tooth] ) > -1) { vm.down2 = '2DOWN'; }
                                if  ( down3List.indexOf( teethListOperation[tooth] ) > -1) { vm.down3 = '3DOWN'; }

                                $(this).attr('src',vm.onStateUrl + teethListOperation[tooth] +'.png' ) ; 
                            });
                        }
                    } 
                },
                200
            ); 

            angular.forEach(dataScanAgent, function(agent) { 

                var card = {
                    'id': agent.id,
                    'labo': agent.laboratory.nameLabo,
                    'dentistName':agent.firstName+ ' ' +agent.lastName,
                    'adress': agent.address.district,
                    'town': agent.address.city+ ' ' +agent.address.postalCode,
                    'tel': agent.phone,
                    'competence': agent.competences[0].competenceName,
                    
                    'media': {
                        'image': {
                            'src': 'assets/images/avatars/agents/'+agent.picture,
                            'alt': 'Mobile Scan Agent'
                        }
                    }
                };
                $log.info('competence '+ JSON.stringify(agent.competences,null, '   '));
                $log.info('agent '+ JSON.stringify(agent,null, '   '));

                vm.cards.push(card);
            });  

            $log.info('dataScanAgent'+ JSON.stringify(dataScanAgent,null, '   ')); 
            $log.info('vm.cards'+ JSON.stringify(vm.cards,null, '   ')); 
        } 
 
        /**
         * Open schema-dental dialog
         *
         * @param ev 
         */
        function openSchemaDialog(event)
        {
            var typeOperation = $(event.currentTarget).attr('title');

            $log.debug(typeOperation);

            $mdDialog.show({
                controller         : 'SchemaDialogController',
                controllerAs       : 'vm',
                templateUrl        : 'app/main/offer/dialogs/schema-dental/schema-dialog.html',
                parent             : angular.element('body'),
                targetEvent        : event,
                clickOutsideToClose: true,
                locals: { 
                    typeOperation: typeOperation 
                }   
            });
        }

        /**
         * Open chooser-operation dialog
         *
         * @param ev 
         */
        function openOperationDialog(event)
        {
            var toothNumber = $(event.currentTarget).attr('id').split('-')[1];

            $log.debug(toothNumber);

            $mdDialog.show({
                controller         : 'OperationDialogController',
                controllerAs       : 'vm',
                templateUrl        : 'app/main/offer/dialogs/chooser-operation/operation-dialog.html',
                parent             : angular.element('body'),
                targetEvent        : event,
                clickOutsideToClose: true,
                locals: { 
                    toothNumber: toothNumber 
                } 
            });
        }

        /**
         * Open image - instrument dialog 
         *
         * @param ev
         */
        function openInstrumentDialog(event)
        {
            var idInstrument = $(event.currentTarget).attr('id'); 

            $mdDialog.show({
                controller         : 'InstrumentDialogController',
                controllerAs       : 'vm',
                templateUrl        : 'app/main/offer/dialogs/chooser-operation/instrument-dialog.html',
                parent             : angular.element('body'),
                targetEvent        : event,
                clickOutsideToClose: true 
            });
        }

        /**
         * remove cookies windows 
         *
         */
        function removeCookiesWindows()
        {
            vm.showCookiesWindows = false;    
        } 
    } 
})();
