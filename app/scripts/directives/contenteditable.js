'use strict';

/**
 * @ngdoc directive
 * @name stockApp.directive:contenteditable
 * @description
 * # contenteditable
 */

var NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/;

angular.module('stockApp')
  .directive('contenteditable', function ($sce) {
  	//sce es strict contextual escaping para sanitize user input
    return {
      restrict: 'A',
      require: 'ngModel', //obtenemos el ngmodel controller
      link: function ($scope, $element, $attrs, ngModelCtrl) {
      	if(!ngModelCtrl){
      		return;
      	}//do nothing if no ng-model

      	//decimos como debe ser actualizada la UI
      	ngModelCtrl.$render = function(){
      		$element.html($sce.getTrustedHtml(ngModelCtrl.$viewValue || ''));
      	};

      	//Leer el valor del html, entonces escribir data en el model o actualizar la vista
      	var read = function(){
      		var value = $element.html();
      		if($attrs.type === 'number' && !NUMBER_REGEXP.test(value)){
      			ngModelCtrl.$render();
      		}else{
      			ngModelCtrl.$setViewValue(value);
      		}
      	};

      	//añadir custom parsed-based input type solo numeros
      	if($attrs.type === 'number'){
      		ngModelCtrl.$parsers.push(function(value){
      			return parseFloat(value);
      		});
      	}

      	//listen for change events to enable binding
      	$element.on('blur keyup change', function(){
      		$scope.$apply(read);
      	});
      }
    };
  });
