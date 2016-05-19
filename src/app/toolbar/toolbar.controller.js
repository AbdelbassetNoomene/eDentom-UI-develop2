(function ()
{
    'use strict';

    angular.module('app.toolbar').controller('ToolbarController', ToolbarController);

    /** @ngInject */
    function ToolbarController($rootScope, $mdSidenav, $translate, $mdToast, $log, AUTH_EVENTS)
    {
        var vm = this;

        // Data
        $rootScope.global = {
            search: ''
        };

        vm.bodyEl = angular.element('body');
        vm.userStatusOptions = [
            {
                'title': 'Online',
                'icon' : 'icon-checkbox-marked-circle',
                'color': '#4CAF50'
            },
            {
                'title': 'Away',
                'icon' : 'icon-clock',
                'color': '#FFC107'
            },
            {
                'title': 'Do not Disturb',
                'icon' : 'icon-minus-circle',
                'color': '#F44336'
            },
            {
                'title': 'Invisible',
                'icon' : 'icon-checkbox-blank-circle-outline',
                'color': '#BDBDBD'
            },
            {
                'title': 'Offline',
                'icon' : 'icon-checkbox-blank-circle-outline',
                'color': '#616161'
            }
        ];
        vm.languages = {
            en: {
                'title'      : 'English',
                'translation': 'TOOLBAR.ENGLISH',
                'code'       : 'en',
                'flag'       : 'us'
            }, 
            de: {
                'title'      : 'Deutsch',
                'translation': 'TOOLBAR.DEUTSCH',
                'code'       : 'de',
                'flag'       : 'de'
            }
        };

        // Methods
        vm.toggleSidenav              = toggleSidenav;
        vm.logout                     = logout;
        vm.changeLanguage             = changeLanguage;
        vm.setUserStatus              = setUserStatus;
        vm.toggleHorizontalMobileMenu = toggleHorizontalMobileMenu;

        //////////
        init();
        vm.changeLanguage(vm.languages['de']);

        /**
         * Initialize
         */
        function init()
        {
            // Select the first status as a default
            vm.userStatus = vm.userStatusOptions[0];

            // Get the selected language directly from angular-translate module setting
            vm.selectedLanguage = vm.languages[$translate.preferredLanguage()];
        }


        /**
         * Toggle sidenav
         *
         * @param sidenavId
         */
        function toggleSidenav(sidenavId)
        {
            $mdSidenav(sidenavId).toggle();
        }

        /**
         * Sets User Status
         * @param status
         */
        function setUserStatus(status)
        {
            vm.userStatus = status;
        }

        /**
         * Logout Function
         */
        function logout()
        {
        	$rootScope.$broadcast(AUTH_EVENTS.logoutWanted);
        }

        /**
         * Change Language
         */
        function changeLanguage(lang)
        {
            vm.selectedLanguage = lang; 

            // Change the language
            $translate.use(lang.code);
	    $log.debug('change language to: ' + JSON.stringify(lang));
        }

        /**
         * Toggle horizontal mobile menu
         */
        function toggleHorizontalMobileMenu()
        {
            vm.bodyEl.toggleClass('ms-navigation-horizontal-mobile-menu-active');
        }
    }

})();
