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

    // $timeout(function() {
    //   popupCharge.close(); //close the popup after 3 seconds for some reason
    // }, 1000000);

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

}]);
// .controller("CalendarEventController", function ($scope, EventService) {
//
//     EventService.getEvents().then(function (events) {
//         $scope.events = events;
//     });
// });
//
// .controller('CalendarPopupController', function ($scope, $ionicPopup, $timeout) {
//
//       // Triggered on a button click, or some other target
//       $scope.showPopup = function ($event, day) {
//           $scope.data = {}
//
//           if (day.events.length > 0) {
//               //show popup only if events on day cell
//
//               var $element = $event.currentTarget;
//
//               // An elaborate, custom popup
//               var myPopup = $ionicPopup.show({
//                   templateUrl: 'templates/calendar/calendar-event-popup-template.html',
//                   title: '' + day.date,
//                   subTitle: '',
//                   scope: $scope,
//                   buttons: [{
//                       text: '<b>Close</b>',
//                       type: 'button-positive',
//                       onTap: function (e) {
//                           return 'cancel button'
//                       }
//                   }, ]
//               });
//               myPopup.then(function (res) {
//
//               });
//           }
//
//       };
//
//       $scope.sendEvent = function () {
//           var startDate = new Date(2014, 10, 15, 18, 30, 0, 0, 0); // beware: month 0 = january, 11 = december
//           var endDate = new Date(2014, 10, 15, 19, 30, 0, 0, 0);
//           var title = "My nice event";
//           var location = "Home";
//           var notes = "Some notes about this event.";
//           var success = function (message) {
//               alert("Success: " + JSON.stringify(message));
//           };
//           var error = function (message) {
//               alert("Error: " + message);
//           };
//
//           window.plugins.calendar.createEventInteractively(title,location,notes,startDate,endDate,success,error);
//       }
//
//   });
