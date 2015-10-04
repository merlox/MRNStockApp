'use strict';

/**
 * @ngdoc function
Ç * @name stockApp.controller:WatchlistCtrl
 * @description
 * # WatchlistCtrl
 * Controller of the stockApp
 */
angular.module('stockApp')
  .controller('WatchlistCtrl', function ($scope, $routeParams, $modal, WatchlistService, CompanyService) {
    //Iniciamos
    $scope.companies = CompanyService.query();
    $scope.watchlist = WatchlistService.query($routeParams.listId);
    $scope.stocks = $scope.watchlist.stocks;
    $scope.newStock = {};
    var addStockModal = $modal({
        scope: $scope,
        template: 'views/templates/addstock-modal.html',
        show: false
    });

    //Mostrar showstokmodal para ver via $scope
    $scope.showStockModal = function(){
        addStockModal.$promise.then(addStockModal.show);
    };

    //LLamar al watchlistmodel addstock y oculatar el modal
    $scope.addStock = function(){
        $scope.watchlist.addStock({
            listId: $routeParams.listId,
            company: $scope.newStock.company,
            shares: $scope.newStock.shares
        });
        addStockModal.hide();
        $scope.newStock = {};
    };
  });
