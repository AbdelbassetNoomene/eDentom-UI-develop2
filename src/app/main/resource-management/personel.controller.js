(function ()
{
    'use strict';

    angular
        .module('app.resource-management')
        .controller('PersonelController', PersonelController);

    /** @ngInject */
    function PersonelController($log, $mdDialog, $scope)
    {
        var vm = this;

        // Data 
        vm.sidenav = true;
        vm.dtOptions = {
            dom       : '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
            pagingType: 'simple',
            autoWidth : false,
            responsive: true,
            order     : [1, 'asc'],
            columnDefs: [
                {
                    width    : '40',
                    orderable: false
                },
                {
                    width  : '20%',
                    targets: [1, 2, 3, 4, 5,6,7]
                }
            ]
        }; 
        
        vm.personel =[
            {
              'firstname': 'Alice ',
              'lastname': 'Freeman',
              'avatar': 'assets/images/avatars/alice.jpg',
              'position': 'Software Engineer',
              'email': 'a.freeman@mail.com',
              'competance': 'Lokaler Scan-Agent'
            },
            {
              firstname: 'Danielle ',
              lastname: ' Obrien',
              avatar: 'assets/images/avatars/danielle.jpg',
              position: 'Accountant',
              email: 'd.obrien@mail.com',
              competance: '3D Designer'
            },
            {
              firstname: 'Garry ',
              lastname: ' Arnold',
              avatar: 'assets/images/avatars/garry.jpg',
              position: 'Senior Designer',
              email: 'g.arnold@mail.com',
              competance: 'Mobiler Scan-Agent'
            },
            {
              firstname: 'James ',
              lastname: ' Lewis',
              avatar: 'assets/images/avatars/james.jpg',
              position: 'Security',
              email: 'j.lewis@mail.com',
              competance: 'Simulationsprüfer'
            },
            {
              firstname: 'Joyce ',
              lastname: ' Walters',
              avatar: 'assets/images/avatars/joyce.jpg',
              position: 'Janitor',
              email: 'j.walters@mail.com',
              competance: 'CNC Fertiger'
            },
            {
              firstname: 'Vincent ',
              lastname: ' Munoz',
              avatar: 'assets/images/avatars/vincent.jpg',
              position: 'Junior Designer',
              email: 'v.munoz@mail.com',
              competance: 'Service Einkäufer'
            }
        ];
         
        $log.info('personel '+JSON.stringify(vm.personel, null, '    '));
    }

})();
