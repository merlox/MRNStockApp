'use strict';

/**
 * @ngdoc service
 * @name stockApp.CompanyService
 * @description
 * # CompanyService
 * Service in the stockApp.
 */
angular.module('stockApp')
  .service('CompanyService', function CompanyService($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return $resource('companies.json');
  });
