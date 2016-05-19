(function ()
{
    'use strict';

    angular.module('app.authentication').constant('USER_ROLES', {
            admin: 'ROLE_ADMIN',
            user:  'ROLE_USER',
            doc:   'ROLE_DOC',
            agent: 'ROLE_AGENT',
            all:   '*'
    });

})();
