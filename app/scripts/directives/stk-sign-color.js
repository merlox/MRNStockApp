'use strict';

/**
 * @ngdoc directive
 * @name stockApp.directive:stkSignColor
 * @description
 * # stkSignColor
 */
angular.module('stockApp')
  .directive('stkSignColor', function () {
    return {
      restrict: 'A',
      link: function ($scope, $element, $attrs) {
        //use $observe para vigilar cambios
        $attrs.$observe('stkSignColor', function(newVal){
        	var newSign = parseFloat(newVal);
        	if(newSign > 0){
        		$element[0].style.color = 'Green';
        	}else{
        		$element[0].style.color = 'Red';
        	}
        });
      }
    };
  });
