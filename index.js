(function () {
  angular
    .module('angular', [])

    .controller('loginController', ['$scope', 'auth', function ($scope, auth) {

      $scope.user = {};
      $scope.isAuth = false;

      $scope.login = function () {
        const form = {
          username: $scope.username,
          password: $scope.password,
        };

        auth.login(form, user => {
          $scope.$apply(() => {
            $scope.user = user;
            $scope.isAuth = typeof user.token === 'string';
          });
          if (user) localStorage.setItem('token', user.token);
          else localStorage.removeItem('token');
        });
      }
    }])

    .service('auth', function () {
      this.login = function (form, callback) {
        fetch('./user.json')
          .then(data => data.json())
          .then(user => {
            const matchUsername = user.username === form.username;
            const matchPassword = user.password === form.password;
  
            if (matchUsername && matchPassword) callback(user);
            else callback(false);
          });
      };
    })

    .directive('reactApp', function () {
      return {
        template: '<div id="reactApp"></div>',
        scope: {user: '<'},
        link: function ($scope) {
          $scope.$watch('user', function (user) {
            if (angular.isDefined(user)) {
              renderReact(
                createReactElement(ReactApp, {user}),
                document.getElementById('reactApp'),
              );
            }
          }, true);
        }
      }
    });
})();
