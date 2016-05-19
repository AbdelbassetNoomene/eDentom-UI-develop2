(function ()
{
    'use strict';

    angular
      .module('app.resource-management')
      .controller('ResourceManagementController', ResourceManagementController);

    /** @ngInject */
    function ResourceManagementController($log, $timeout)
    {
        var vm = this;

        // Data 
        vm.sidenav = true; 

        vm.query   = {order: 'id', limit: 5, page: 1};
        vm.columns = [  
            {},
            { name:    'Vorname', orderBy: 'firstname' }, 
            { name:    'Nachname', orderBy: 'lastname' }, 
            { name:    'E-mail', orderBy: 'email' }, 
            { name:    'Kompetenzen', orderBy: 'competence' },
            {},
            {} 
        ];
        vm.onPaginate = onPaginate;
        
        vm.personel =[
            {
                'firstname': 'Alice ',
                'lastname': 'Freeman',
                'avatar': 'assets/images/avatars/alice.jpg',
                'position': 'Software Engineer',
                'email': 'a.freeman@mail.com',
                'competence': 'Lokaler Scan-Agent'
            },
            {
                'firstname': 'Danielle ',
                'lastname': ' Obrien',
                'avatar': 'assets/images/avatars/danielle.jpg',
                'position': 'Accountant',
                'email': 'd.obrien@mail.com',
                'competence': '3D Designer'
            },
            {
                'firstname': 'Garry ',
                'lastname': ' Arnold',
                'avatar': 'assets/images/avatars/garry.jpg',
                'position': 'Senior Designer',
                'email': 'g.arnold@mail.com',
                'competence': 'Mobiler Scan-Agent'
            },
            {
                'firstname': 'James ',
                'lastname': ' Lewis',
                'avatar': 'assets/images/avatars/james.jpg',
                'position': 'Security',
                'email': 'j.lewis@mail.com',
                'competence': 'Simulationsprüfer'
            },
            {
                'firstname': 'Joyce ',
                'lastname': ' Walters',
                'avatar': 'assets/images/avatars/joyce.jpg',
                'position': 'Janitor',
                'email': 'j.walters@mail.com',
                'competence': 'CNC Fertiger'
            },
            {
                'firstname': 'Vincent ',
                'lastname': ' Munoz',
                'avatar': 'assets/images/avatars/vincent.jpg',
                'position': 'Junior Designer',
                'email': 'v.munoz@mail.com',
                'competence': 'Service Einkäufer'
            }
        ]; 

        function onPaginate(page, limit) {

        	$log.debug('Query.page: %s, Query.limit: %s' , vm.query.page , vm.query.limit);
        	$log.debug('Page: %s, Limit: %s',page, limit);
            vm.promise = $timeout(function () {}, 2000);
        }
    } 
})();
