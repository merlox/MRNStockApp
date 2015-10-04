'use strict';

/**
 * @ngdoc directive
 * @name stockdogApp.directive:stkWatchlistPanel
 * @description
 * # stkWatchlistPanel
 */
angular.module('stockApp')
	//1 registrar directivas y dependencias de inyeccion
  .directive('stkWatchlistPanel', function ($location, $modal, $routeParams, WatchlistService) {
    return {
      templateUrl: 'views/templates/watchlist-panel.html',
      restrict: 'E',
      scope: {},
      link: function ($scope) {
      	//2 iniciar variables
        $scope.watchlist = {};
        var addListModal = $modal({
        	scope: $scope,
        	template: 'views/templates/addlist-modal.html',
        	show: false,
        });
        //3 enlazar modelo del servicio a este scope
        $scope.watchlists = WatchlistService.query();
        //4 mostrar el modal addlist
        $scope.showModal = function(){
        	addListModal.$promise.then(addListModal.show);
        };
        //5 crear una nueva lista de los campos del modal
        $scope.createList = function(){
        	WatchlistService.save($scope.watchlist);
        	addListModal.hide();
        	$scope.watchlist = {};
        };
        //6 eliminar las listas deseadas y volver a inicio
        $scope.deleteList = function(list){
        	WatchlistService.remove(list);
        	$location.path('/');
        };
        $scope.currentList = $routeParams.listId;
        $scope.gotoList = function (listId){
          $location.path('watchlist/'+listId);
        };
      }
    };
  });
