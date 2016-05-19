
(function(){
	'use strict';

	var DATE_FORMAT = 'yyyy-MM-ddT13:mm:ss.sssZ'; //'yyyy-MM-ddTHH:mm:ss.sssZ'   var TIMEZONE = 'UTC';

	angular.module('edentom').directive('monthPicker', MonthPickerDirective);

	/*************************************************************************************************************************
	* The monthPicker directive is to be used like this:
	*     if 'day' is not given, the first day of the month will be selected
	*
	*     <month-picker day="last" label="" bind="month" maxDate="maxMonth" minDate="minMonth" disable="false"></month-picker>
	*
	**************************************************************************************************************************/
	angular.module('edentom').directive('mdYear', mdYearSelector);
	
	/** @ngInject */
	function MonthPickerDirective () {

		/** @ngInject */
		function MonthPickerCtrl($scope, $filter) {
		    $scope.year = (new Date()).getFullYear(); // initialize the current year
			$scope.months = [{id:0, name:'Jan'}, {id:1,  name:'Feb'}, {id:2,  name:'Mrz'},
							 {id:3, name:'Apr'}, {id:4,  name:'Mai'}, {id:5,  name:'Jun'},
							 {id:6, name:'Jul'}, {id:7,  name:'Aug'}, {id:8,  name:'Sep'},
							 {id:9, name:'Okt'}, {id:10, name:'Nov'}, {id:11, name:'Dez'}];

			$scope.setMonth = function(monthId){
				if(angular.isNumber(monthId)) {
					$scope.month     = {id: monthId};
					$scope.monthYear = new Date($scope.year, monthId, 1);
					if($scope.day === 'last') {
						$scope.monthYear = new Date($scope.year, (monthId+1), 0); // to get a date with the last day of monthId
					}
					//--> when TIMEZONE is used, the the returned date 'resultDate' will be decrement by 1 day
					$scope.resultDate = new Date($filter('date') ($scope.monthYear, DATE_FORMAT));//, TIMEZONE
					//$log.debug('--resultDate: ' + $scope.resultDate);

					$scope.monthYear = $filter('date') ($scope.monthYear, 'MM.yyyy');
					//$log.debug('--monthYear: ' + $scope.monthYear);
				}
			};
			this.setYear = function(nestedDirective) {
				//$log.debug('--year changed: ' + $scope.year + ' --> ' + nestedDirective.year + ', month= ' + JSON.stringify($scope.month));

				if(!($scope.resultDate && angular.isDate($scope.resultDate) && !isNaN($scope.resultDate.valueOf())) ||
				    (($scope.year !== nestedDirective.year)) && !nestedDirective.initialized) { // 'resultDate was not initialized' or 'just the year is changed'

					//$log.debug('--$scope.resultDate is not initialized || just the year is changed --> initialized=' + nestedDirective.initialized);
					$scope.year = nestedDirective.year;
				    if($scope.month && angular.isNumber($scope.month.id)) {
				        $scope.setMonth($scope.month.id);
				    }
				}
			};
			$scope.$watch('monthYear', function (newValue, oldValue) {

				//$log.debug('$scope.monthYear changed: ' + oldValue + ' --> ' + newValue + ', isNaN = ' + isNaN(newValue));
				//$log.debug('$scope.resultDate: ' + $scope.resultDate);

				if(!isNaN(oldValue) && (isNaN(newValue) || !newValue)) { // the user is deleting monthYear manually
				    //$log.debug('--the user is deleting monthYear manually or he is giving an invalid monthYear');
				    $scope.month      = undefined;
					$scope.resultDate = null;
				} else {
					// !isNaN($scope.resultDate.valueOf()) to detect 'Invalid Date' instance
					if($scope.resultDate && angular.isDate($scope.resultDate) && !isNaN($scope.resultDate.valueOf())) { // to show an initialized month-picker

						//$log.debug('--$scope.resultDate isDate: ' + $scope.resultDate);
						$scope.year = $scope.resultDate.getFullYear();
						$scope.setMonth($scope.resultDate.getMonth());
					} else {
						//$log.debug('--the user is giving monthYear manually');
						// newValue is a String
						if(newValue && (newValue.length === 7) && (newValue !== oldValue)) {

							//$log.debug('monthYear changed: ' + oldValue + ' --> ' + newValue);
							var m = Number(newValue.slice(0,2)) - 1,
								y = Number(newValue.slice(3,7));
							if((m > -1) && (m < 12)) {  // a valid month
								$scope.year = y;
								//$log.debug('--getMonth(), getFullYear(): ' + m + ', ' + $scope.year);
								$scope.setMonth(m);
							} else {
								//$log.debug('--the given month is invalid');
								//$scope.month      = undefined;
								//$scope.resultDate = null;
							}
						} else {
							//$log.debug('--the given monthYear is invalid');
							//$scope.month      = undefined;
							//$scope.resultDate = null;
						}
					}
			    }
			});
			/**
			 * Checks if a date is within a min and max range.
			 * If minDate or maxDate are not dates, they are ignored.
			 * @param {month} month
			 * @param {year}  year
			 * @param {Date}  minDate
			 * @param {Date}  maxDate
			 */
			$scope.isDateWithinRange = function(month, year, minDate, maxDate) {

				var date = new Date(year, month, 1);
				if($scope.day === 'last') {
					date = new Date(year, (month+1), 0); // to get a date with the last day of month.id
				}

				/*if(angular.isDate(minDate) || angular.isDate(maxDate)) {
					//$log.debug('--minDate: ' + minDate);
					//$log.debug('--maxDate: ' + maxDate);
				}*/
				return (!angular.isDate(minDate) || minDate <= date) && (!angular.isDate(maxDate) || maxDate >= date);
			};
			/*$scope.$watch('minDate', function (value) {
				$scope.minDate = value;
				$log.debug('--minDate changed: ' + value);
			});
			$scope.$watch('maxDate', function (value) {
				$scope.maxDate = value;
				$log.debug('--maxDate changed: ' + value);
			});*/
	}
	//MonthPickerCtrl.$inject = ['$scope', '$filter'];

	return {
		restrict: 'E',
		//transclude: true,
		scope: {
			disable:   '=',
			label:      '@',
			day:        '@',
			year:       '@',
			minDate:    '=?minDate',
			maxDate:    '=?maxDate',
			monthYear:  '@',
			resultDate: '=bind'
		},
		controller: MonthPickerCtrl,
		template: '<div layout="row" ng-disabled="disable">' +
					'<md-menu-bar ng-disabled="disable"><md-menu>' +
						'<button ng-disabled="disable" ng-click="$mdOpenMenu()">' + //{{label}} <span ng-if="monthYear">{{month.name}} {{year}}</span>
							'<md-icon md-svg-icon="md-calendar"></md-icon>' +
						'</button>' +
						'<md-menu-content>' +
							'<md-menu-item>' +
								'<md-year layout="row" layout-align="center center" year="year"></md-year>' +
							'</md-menu-item>' +
							'<md-menu-divider></md-menu-divider>' +
							'<div layout="row">' +
								'<md-menu-item class="md-indent" ng-repeat="mon in months.slice(0,3)">' +
									'<md-button ng-click="setMonth(mon.id)" ng-disabled="!isDateWithinRange(mon.id, year, minDate, maxDate)">{{mon.name}}</md-button>' +
								'</md-menu-item>' +
							'</div>' +
							'<div layout="row">' +
								'<md-menu-item class="md-indent" ng-repeat="mon in months.slice(3,6)">' +
									'<md-button ng-click="setMonth(mon.id)">{{mon.name}}</md-button>' +
								'</md-menu-item>' +
							'</div>' +
							'<div layout="row">' +
								'<md-menu-item class="md-indent" ng-repeat="mon in months.slice(6,9)">' +
									'<md-button ng-click="setMonth(mon.id)">{{mon.name}}</md-button>' +
								'</md-menu-item>' +
							'</div>' +
							'<div layout="row">' +
								'<md-menu-item class="md-indent" ng-repeat="mon in months.slice(9,12)">' +
									'<md-button ng-click="setMonth(mon.id)">{{mon.name}}</md-button>' +
								'</md-menu-item>' +
							'</div>' +
						'</md-menu-content>' +
					'</md-menu></md-menu-bar>' +
					'<div class="md-datepicker-input-container">' +
					    //'<form name="dateForm">' +
						    '<input name="date" type="text" ng-disabled="disable" ng-model="monthYear" placeholder="mm.yyyy" ng-maxlength="7" ng-minlength="7" aria-haspopup="true" class="md-datepicker-input" size="1"/>' +
							//ng-pattern="/^(0[1-9]|1[0-2])\.(\d{4})$/"
						    //'<div ng-messages="dateForm.date.$error" role="alert" multiple role="alert">' +
                                //'<div ng-message="pattern" class="my-message">Das sieht nicht wie ein gültiges Datum.</div>' +
                                //'<div ng-message="md-maxlength" class="my-message">Don\'t use the long version silly...we don\'t need to be that specific...</div>' +
						    //'</div>' +
						//'</form>' +
					'</div>' +
				  '</div>'
	};
}

/** @ngInject */
function mdYearSelector() {
  
	/** @ngInject */
	function Controller($attrs, $scope) {

		$scope.limit = (new Date()).getFullYear(); // current year is the last year to show
		//$scope.year = (new Date()).getFullYear();
    
		$scope.hasNext = function () {
			return $scope.year < $scope.limit;
		};
    
		$scope.hasPrevious = function () {
			return $scope.year > 1900; // 1900 is the first year to show
		};
    
		$scope.next = function () {
			++$scope.year;
		};
    
		$scope.previous = function () {
			--$scope.year;
		};

		$scope.setYear = function(y){
			$scope.year = y;
		};
	}
  	//Controller.$inject = ['$attrs', '$scope'];
  
	return {
		controller: Controller,
		restrict:   'E',
		scope:      {year: '='},
		require:    '^monthPicker',
		link:       function(scope, element, attrs, monthPickerCtrl) {

						scope.$watch('year', function (newValue, oldValue) {
							if((oldValue !== newValue) && angular.isNumber(newValue)) {
								//$log.debug('--year changed: ' + oldValue + ' --> ' + newValue);
								scope.initialized = false;
							    monthPickerCtrl.setYear(scope);
							}
							else if(angular.isNumber(newValue)){
								//$log.debug('--year initialized: ' + newValue);
								scope.initialized = true;
							    monthPickerCtrl.setYear(scope);
							} /*else {
								//$log.debug('--invalid year: ' + newValue);
							}*/
						});
					},
		template: 	'<md-button class="md-icon-button" type="button" md-prevent-menu-close="true" ng-click="previous()" aria-label="Previous">' +//ng-disabled="!hasPrevious()"
						'<md-icon md-svg-icon="navigate-before.svg"></md-icon>' +
					'</md-button>' +
					'<md-button ng-click="setYear(year)">{{year}}</md-button>' +
					'<md-button class="md-icon-button" type="button" md-prevent-menu-close="true" ng-click="next()" aria-label="Next">' +//ng-disabled="!hasNext()"
						'<md-icon md-svg-icon="navigate-next.svg"></md-icon>' +
					'</md-button>'
	};
}

})();