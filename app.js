var app = angular.module('employeeApp', []);

app.controller('EmployeeController', function ($scope, $http) {
  $scope.employees = [];

  // Fetch employee data from JSON file
  $http.get('employees.json').then(
    function (response) {
      $scope.employees = response.data;
    },
    function (error) {
      console.error('Error fetching employee data:', error);
    }
  );
});

// Custom filter to search by name or department
app.filter('employeeSearch', function () {
  return function (employees, searchText) {
    if (!searchText) return employees;

    searchText = searchText.toLowerCase();

    return employees.filter(function (emp) {
      return (
        emp.name.toLowerCase().includes(searchText) ||
        emp.department.toLowerCase().includes(searchText)
      );
    });
  };
});