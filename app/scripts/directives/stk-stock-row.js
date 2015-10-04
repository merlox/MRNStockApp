'use strict';

/**
 * @ngdoc directive
 * @name stockApp.directive:stkStockRow
 * @description
 * # stkStockRow
 */
angular.module('stockApp')
  .directive('stkStockRow', function ($timeout, QuoteService) {
    return {
      restrict: 'A',
      require: '^stkStockTable',
      scope: {
      	stock: '=',
      	isLast: '='
      },
      link: function ($scope, $element, $attrs, stockTableCtrl) {
      	//creamos un tooltip para el stock row
        $element.tooltip({
        	placement: 'left',
        	title: $scope.stock.company.name
        });
        //añadir esta row al table controler
        stockTableCtrl.addRow($scope);
        //registrar esta accion de bolsa con el QuoteService
        QuoteService.register($scope.stock);
        //borrar del registro la compania del quoteservice al destruir
        $scope.$on('$destroy', function(){
        	stockTableCtrl.removeRow($scope);
        	QuoteService.deregister($scope.stock);
        });
        //si es la ultima stock-row, traer quoter
        if($scope.isLast){
        	$timeout(QuoteService.fetch);
        }
        //vigilar por si hay cambios en shares y recalcular los campos
        $scope.$watch('stock.shares', function(){
        	$scope.stock.marketValue = $scope.stock.shares * 
        		parseFloat($scope.stock.change);
        	$scope.stock.save();
        });
      }
    };
  });
