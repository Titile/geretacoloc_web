angular.module('app.controllers', [])

// Controller pour le login de l'application
.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
  $scope.data = {};

  $scope.logIn = function(){
    console.log("LOGIN user : " + $scope.data.username + "-PW : " + $scope.data.password);

      LoginService.loginUser($scope.data.username, $scope.data.password)
      .success(function(data) {$state.go('home');})
      .error(function(data) {
          var alertPopup = $ionicPopup.alert({
              title: 'Echec authentifiacation!',
              template: 'Veuillez vérifier vos identifiants!'
          });
      });
  }

})

// Controller pour l'inscription
.controller('signupCtrl', function($scope) {

})

.controller('homeCtrl', function($scope) {

})

// Controller du Menu slide
.controller('menuCtrl', function($scope,$ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };
})


.controller('TachesCtrl', function($scope) {


})

.controller('ChargesCtrl', function($scope,$http, $ionicPopup) {

  $scope.showPopup_ajouter_charge = function() {
    // console.log(data)
    $scope.data= {};

    var popupCharge = $ionicPopup.show({
      template:'Entrer le nom de la charge<input "type=text" ng-model="data.nom_charge"> <br> Entrer le montant de la charge <input "type=text" ng-model="data.montant_charge" >',
      subtitle:'Une fois ajouter, vous pourrez supprimer cette charge à tout moment',
      title:'Entrer les informations sur la nouvelle charge',
      scope: $scope,
      buttons: [
        {text: 'Annuler'},
        {
          text: '<b>Ajouter</b>',
          type: '',
          onTap: function(e){
              // return $scope.data;

              console.log($scope.data.nom_charge);
              console.log($scope.data.montant_charge);

              $http.get('colocataires/coloc.json').success(function(data_out) {
                var coloc = data_out;

                var new_charge={"id":"4", "nameCharge":"papier", "montant":"25.6"};
                //ajouter une charges dans le menu charges
                // coloc.charges.push(new_charge);
                });
              popupCharge.close();
          }
        }
      ]
    });
  };

})

.controller('ColocListCtrl', ['$scope', '$http', function($scope, $http) {

  $http.get('colocataires/coloc.json').success(function(data) {
    // console.log(data)
    $scope.coloc = data;

    var charge_totale = 0;
    var charge_pers=0;

    angular.forEach($scope.coloc.charges, function(value,key){
      charge_totale+=parseFloat(value.montant,10);
    });
    $scope.montant_total = charge_totale;

    // compter le nombre de user d'une colocation
    var nb_users=0;
    angular.forEach($scope.coloc.users, function(value,key){
      nb_users++;
    });
    $scope.nb_users = nb_users;


  });
  $scope.orderProp = 'name';

}])

.controller('ReglesCtrl', function($scope) {


  // angular.forEach($scope.coloc.users, function(value,key){
  //   nb_users++;
  // });
  $scope.data= {};


  var nvl_regle="";
  $scope.ajouterRegle = function(){
      nvl_regle=$scope.data.nouvelle_regle;
  }
  $scope.new_regle = nvl_regle;


})


/*----------------------------------------------------------------------

                      GESTION DU CALENDRIER

// ---------------------------------------------------------------------*/

.controller('DateCtrl', function($scope,$http ){

  $http.get('colocataires/calendar_gestion.json').success(function(data) {
    $scope.date = data;
    console.log(data)

  });

  $scope.mois_actuel = new Date();


})
