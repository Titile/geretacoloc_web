angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

// .service('BlankService', [function(){
//
// }]);

.service('LoginService', function($q) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            if (name == 'user' && pw == 'secret') {
                deferred.resolve('Welcome ' + name + '!');
                // console.log('Vous avez réussi à vous logger'+name);
            } else {
                deferred.reject('Vos identifiants sont erronés');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
});
