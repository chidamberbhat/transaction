// Application module
var monthlyApp = angular.module('monthlyApp',[]);

monthlyApp.controller("DbController", function($scope, $http) {

	$scope.search_query = ' ';
	// Function to get employee details from the database
	getInfo();

	function getInfo() {
		$http.get('accounts/getAll').then(function(data){
			$scope.details = data.data;
		});
	}

	$scope.insertInfo = function(info){
		$http.post('databaseFiles/insertDetails.php',{"name":info.name,"email":info.email,"address":info.address,"gender":info.gender}).success(function(data){
			if (data == true) {
				getInfo();
				// Hide details insertion form
				$('#empForm').css('display', 'none');
			}
		});
	}
	
	$scope.currentUser = {};
	
	$scope.editInfo = function(info){
		$scope.currentUser = info;
		$('#empForm').slideUp();
		$('#editForm').slideToggle();
	}
	
	$scope.UpdateInfo = function(info){
		$http.post('databaseFiles/updateDetails.php',{"id":info.emp_id,"name":info.emp_name,"email":info.emp_email,"address":info.emp_address,"gender":info.emp_gender}).success(function(data){
			$scope.show_form = true;
			if (data == true) {
				getInfo();
			}
		});
	}
	
	$scope.deleteInfo = function(info){
		$http.post('databaseFiles/deleteDetails.php',{"del_id":info.emp_id}).success(function(data){
			if (data == true) {
				getInfo();
			}
		});
	}
});