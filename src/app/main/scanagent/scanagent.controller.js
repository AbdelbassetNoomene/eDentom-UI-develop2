(function ()
{
    'use strict';

    angular
        .module('app.scanagent')
        .controller('ScanAgentController', ScanAgentController);

    /** @ngInject */
    function ScanAgentController($cookies, $filter, $log, $rootScope, $timeout, msApi, AgentsData)
    {
        var vm                   = this;
        var ALL_JOBS             = 'alle anzeigen';
        var NOT_DROPPED_JOBS     = 'Keine verworfenen';
        var CLEARED_JOBS         = 'Keine fehlende Freigabe';
        var APPROVED_JOBS        = 'APPROVAL';
        var ABANDONED_JOBS       = 'ABANDON';
        var scanAgentsParameters = $cookies.getObject('scanAgentsParameters');
        $rootScope.companyList   = [];//CompanyData;
        vm.message               = '';
        vm.error                 = '';
    	vm.protocolFileContent   = null;
    	vm.protocolFileError     = '';
    	vm.protocolFileURL       = '';
        vm.searchQuery           = {};
    	vm.searchOptions         = {};
    	$log.debug('totalResult: ' + AgentsData.totalResults);
        vm.scanAgents            = AgentsData.results;//[];
        vm.scanAgentIds          = [];
        vm.filteredEntries       = [];
        vm.examine               = examine;
        vm.search                = search;
        vm.showPis               = showPis;
        vm.status                = {STOPPED: 'gestoppt', COMPLETED: 'beendet', ABANDONED: 'verworfen'};
        vm.selected              = [];
        vm.query                 = {order: 'id', limit: 10, page: 1};
        vm.onPaginate            = onPaginate;
        vm.log                   = log;
        vm.deselect              = deselect;
        vm.loadStuff             = loadStuff;
        vm.onReorder             = onReorder;
        vm.columns               = [{
            name:    'ID',
  		    orderBy: 'id',
            numeric: true
        }, {
            name:    'username',
  		    orderBy: 'username'
        }, {
            name:    'firstName',
  		    orderBy: 'firstName'
        }, {
            name:    'mail',
  		    orderBy: 'mail'
        }, {
            name:    'phone',
  		    orderBy: 'phone'
        }, {
            name:    'streetNumber',
  		    orderBy: 'streetNumber'
        }, {
            name:    'district',
  		    orderBy: 'district'
        }, {
            name:    'Freigabe',
  		    orderBy: 'clearanceStatus'
        }, {
            name:    'Freigabe/Verwurf-Datum',
  		    orderBy: 'clearanceDate'
        }, {
            name:    'Freigabe durch',
  		    orderBy: 'clearanceUser'
      }];

      //-----------------Methods
      function errorCallback(response) {
          $log.debug('Server response: ' + JSON.stringify(response));
          vm.error = response.data.code + ': ' + response.data.error;
      }

      function search() {
            vm.message = '';
            vm.error = '';
    		$log.debug('SearchOptions: ' + JSON.stringify(vm.searchOptions));

    		//msApi.request('jobs@search', vm.searchOptions, function (response) {

    			//$log.debug('Nb Jobs = ' + response.length);
    		    //vm.scanAgents = response;
    			vm.scanAgents = AgentsData.results;

                if(scanAgentsParameters && scanAgentsParameters.nbResult) {
                    $log.debug('scanAgentsParameters: ' + JSON.stringify(scanAgentsParameters));
                    vm.scanAgents = response.slice(0, scanAgentsParameters.nbResult); // display only the nbResult given in report-values (Report-Werte)
                }
                vm.filteredEntries = vm.scanAgents;
    			if(scanAgentsParameters && scanAgentsParameters.display) {
    				$log.debug('scanAgentsParameters: ' + JSON.stringify(scanAgentsParameters));
    				// display only the 'display' given in report-values (Report-Werte)
    				vm.filteredEntries = $filter('filter')(vm.scanAgents, function(entry) {
    					if(scanAgentsParameters.display === NOT_DROPPED_JOBS) {
    						if (entry.clearanceStatus === ABANDONED_JOBS) {
    							return false; 
    						}
    						return true;
    					} else if(scanAgentsParameters.display === CLEARED_JOBS) {
    						if ((entry.clearanceStatus !== APPROVED_JOBS) && (entry.clearanceStatus !== ABANDONED_JOBS)) {
    							return false; 
    						}
    						return true;
    					} else if(scanAgentsParameters.display === ALL_JOBS) {
    						return true;
    					}
                    });
                    $log.debug('Nb Entries after filter: ' + vm.filteredEntries.length);
                }
    		//}, errorCallback);
        }
        vm.search(); // initialize with search

        function examine(id) {
            $log.debug('examine() scanAgent ID: ' + id);
            /*msApi.request('jobs@getProtocolFile',{urlSuffix: 'protocolfile', id: id}, function (data) {
            //JobService.getProtocolFile({urlSuffix: 'protocolfile', id: id}, function(data) {

    		    vm.protocolFileError   = '';
    		    vm.protocolFileURL     = URL.createObjectURL(data.response);
    		    vm.protocolFileContent = $sce.trustAsResourceUrl(vm.protocolFileURL);
    			$log.debug('ProtocolFile URL: ' + vm.protocolFileURL);

            }, function(data) {
                $log.debug('Server response: ' + JSON.stringify(data));
    			if(data.status === 404) { // NetworkError: 404 Not Found
    				vm.protocolFileError = 'EC_FE_004: Auf das Protokoll-File kann nicht zugegriffen werden';
    			}
    			//vm.protocolFileError = data.data.code + ': ' + data.data.error;
            });*/
        }

        function showPis(selectedScanAgents) {
            $log.debug('showPis() ' + selectedScanAgents[0].id);
        }
      
      //-----------------Configuration for md-data-table
    	function onPaginate(page, limit) {
    		$log.debug('Query.page: ' + vm.query.page + ' Query.limit: ' + vm.query.limit);
    		$log.debug('Page: ' + page + ' Limit: ' + limit);
    	    vm.promise = $timeout(function () {}, 2000);
    	}

    	function log(item) {
    		$log.debug(item.id, 'was selected');
    	    vm.selected = [item];
    	    vm.protocolFileError = '';
    	}

    	function deselect(item) {
    		$log.debug(item.id, 'was deselected');
    	    vm.selected = [];
    	}

    	function loadStuff() {
    		vm.promise = $timeout(function () {}, 2000);
        }

    	function onReorder(order) {
    		$log.debug('Query.order: ' + vm.query.order);
    		$log.debug('Order: ' + order);
    	    vm.promise = $timeout(function () {}, 2000);
    	}
    }
})();
