angular.module('ttaControllers', [])

.controller('mainController', function ($scope, $http, $location, $window) {
    $scope.items = [];
    
    // location = '#home';  // Go back to home on refresh
    
    var i = 0;
    $scope.items[i++] = { link : "home", caption : "Home" };
    // $scope.items[i++] = { link : "sportsRegistration", caption : "2018 Sports Registration" };
    $scope.items[i++] = { link : "culturalRegistration", caption : "Diwali Cultural Registration" };
    $scope.items[i++] = { link : "memberRegistration", caption : "Member Registration" };
    $scope.items[i++] = { link : "stallRegistration", caption : "Diwali Stall Registration" };
    $scope.items[i++] = { link : "sponsorship", caption : "Sponsorship" };
    // $scope.items[i++] = { link : "aboutus", caption : "About Us" };
    $scope.items[i++] = { link : "vision", caption : "Our Vision" };
    $scope.items[i++] = { link : "contact", caption : "Contact" };
    
    $scope.active = $scope.items[0]; // for onload first element active
    $scope.activate = function (item) {
        $scope.active = item;
    };

    $http.get('../server/ads.php').success(function(data) {
          $scope.ads = data;
    });
    
})

.controller('sportsCtrl', function($scope, $http, $location) {
	$scope.events = [ "Volleyball", "Throwball", "Tennis"];
	$scope.paramTO = {};
	$scope.paramTO.game = "Volleyball";
	$scope.paramTO.gameType = "Senior";
	$scope.numPlayers = 8;
	$scope.paramTO.fee = 80.00;
	$scope.bShowPayment = false;
	$scope.bDisplayError = false;
	$scope.regId = 0;
	$scope.paramTO.team_name = "";
	$scope.paramTO.captain = "";
	$scope.paramTO.phone = "";
	$scope.paramTO.email = "";
	$scope.paramTO.reg_num = "";
	$scope.paramTO.player1 = "";
	$scope.paramTO.player2 = "";
	$scope.paramTO.player3 = "";
	$scope.paramTO.player4 = "";
	$scope.paramTO.player5 = "";
	$scope.paramTO.player6 = "";
	$scope.paramTO.player7 = "";
	$scope.regMessage = "Successfully Registered !!";
	$scope.paid = false;
        
        $scope.registrationFee = function() {
            return parseFloat($scope.paramTO.fee) + parseFloat($scope.paramTO.fee) * 0.029 + 0.3;
        }
        
	$scope.changeGame = function() {
		if ( $scope.paramTO.game === "Tennis" ) {
			$scope.numPlayers = 2;
			$scope.paramTO.fee = 10;
		}  else {
			$scope.numPlayers = 8;
			if ( $scope.paramTO.game === "Throwball" )
				$scope.paramTO.fee = 40;
			else // Vollyball
				$scope.paramTO.fee = 80;
		}
	};
	
        $scope.retriveRegistration = function() {
            if ( Number($scope.paramTO.reg_num) <= 0 || $scope.paramTO.email.length === 0 ) {
                $scope.displayError = true;
                $scope.errorMessage = "Please provide valid Registration # and Email";
                return;
            }

            $http.post("../server/sportsRegistration.php", $scope.paramTO)
        	.success(function (data) {
                    if ( data.type === "exists" ) {
                        $scope.bShowPayment = true;
                        $scope.paid = !( data.row.paid_status === "not paid" );
                        $scope.paramTO = data.row;
                    } else {
                        $scope.displayError = true;
                        $scope.errorMessage = "Registration # with Email provided is not registered";
                    }
        	})
        	.error(function () {
        		$scope.bDisplayError = true;
        	});
        };
        
	$scope.submitRegistration = function() {
		if ( $scope.paramTO.captain.length === 0 || $scope.paramTO.phone.length === 0 
				|| $scope.paramTO.email.length === 0 ) {
			$scope.displayError = true;
			$scope.errorMessage = "Please provide valid Captain Name, Phone and Email";
			return;
		}
		
		$http.post("../server/sportsRegistration.php", $scope.paramTO)
        	.success(function (data, response, header) {
        		$scope.bShowPayment = true;
        		$scope.paramTO.reg_num = data.regId;
        		if ( data.type === "exists" ) {
                            $scope.regMessage = "User Already Registered !";
                            $scope.paid = !( data.row.paid_status === "not paid" );
                            $scope.paramTO = data.row;
        		}
                })
        	.error(function (data, status, headers, config) {
        		$scope.bDisplayError = true;
        	});
	}
        
        $scope.payNow = function() {

            $scope.paypalInput.first_name = $scope.paramTO.captain;
            $scope.paypalInput.amount = $scope.registrationFee();
            $scope.paypalInput.payer_email = $scope.paramTO.email;
            $scope.paypalInput.item_number = $scope.paramTO.reg_num;

            // build form
            var form = $('<form></form>');
            form.attr("action", "https://www.paypal.com/cgi-bin/webscr");
            form.attr("method", "POST");
            form.attr("target", "_top");
            addFormFields(form, $scope.paypalInput);
            $("body").append(form);

            form.submit();
            form.remove();
        }

        $scope.paypalInput = {};
        $scope.paypalInput.cmd = "_xclick";
        $scope.paypalInput.business = "bizindia5to5@gmail.com";
        $scope.paypalInput.no_note = "1";
        $scope.paypalInput.lc = "USA";
        $scope.paypalInput.currency_code = "USD";
        $scope.paypalInput.item_name = "TTA Sports Event";
        $scope.paypalInput.last_name = "";
        $scope.paypalInput.receiver_email = "info@troytelugu.org";
        $scope.paypalInput.return = "http://troytelugu.org/views/tta.html#/response?event=sports18&status=Successful";
        $scope.paypalInput.cancel_return = "http://troytelugu.org/views/tta.html#/response?event=sports18&status=cancelled";
        $scope.paypalInput.notify_url = "http://troytelugu.org/server/sportsRegistration.php";

        // utility methods
        addFormFields = function (form, data) {
            if (data !== null) {
                $.each(data, function (name, value) {
                    if (value !== null) {
                        var input = $("<input></input>").attr("type", "hidden").attr("name", name).val(value);
                        form.append(input);
                    }
                });
            }
        };

})

.controller('homeController', function($scope) {
    $scope.myInterval = 3500;
    $scope.slides = [
      { image: '../resources/images/deepavali-2018.jpg'  }
    ];
})

.controller('culturalRegController', function($scope, $http) {
    $scope.resetValues = function() {
        $scope.cultural = {};
        $scope.cultural.typeofevent = 'Dancing';
        $scope.cultural.duration = 5;
    };
    $scope.resetValues();
    $scope.form = true;
    $scope.acceptance = true;
    // $scope.form = false;
    // $scope.message = "Enrollments for Ugadi have been closed, in case of any questions please write an email to cultural@troytelugu.org";
    $scope.submitCulturalRegistration = function () {
        $http({
            method: 'POST',
            url: '../server/culturalRegistration.php',
            data: $scope.cultural,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (data) {
            $scope.message = data.data;
            $scope.form = false;
        }, function () {
            $scope.message = "Error while registering, please send details to cultural@troytelugu.org"
            $scope.form = false;
        });
    };

})

.controller('contactController', function($scope, $http) {
    $scope.contact = {};
    $scope.message = "";
    $scope.sendContact = function () {
        $http({
            method: 'POST',
            url: '../server/contact.php',
            data: $scope.contact,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (data) {
            $scope.message = data.data;
        }, function () {
            $scope.message = "Error while registering, please send details to cultural@troytelugu.org"
        });
    };
})

.controller('eventController', function($scope, $http) {
    $scope.photos = [];
    $scope.events = [];
    $scope.showPics = false;
    
    $http({
        method: 'GET',
        url: '../server/imgFiles.php',
        params: {folder : 'events'},
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function (data) {
        $scope.photos = [];
        angular.forEach(data.data, function(value) {
            $scope.events.push({event: value, desc: value.replace(/_/g,' ')});
        });
    }, function () {
        $scope.message = "Error while getting images, please check back later!";
    });
    
    $scope.displayEventPics = function(event) {
        $scope.showPics = false;
        $http({
            method: 'GET',
            url: '../server/imgFiles.php',
            params: {folder : 'events/' + event},
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (data) {
            $scope.photos = [];
            angular.forEach(data.data, function(value) {
                $scope.photos.push({ src: '../resources/images/events/' + event + "/" + value, desc: value});
            });
            $scope.showPics = true;
        }, function () {
            $scope.message = "Error while getting images, please check back later!";
        });
    };
})

.controller('memberRegController', function($scope, $http) {
    $scope.member = {};
    $scope.message = "";
    $scope.childernOption = [
        { value:0, opt:"None" },
        { value:1, opt:"1 - One" },
        { value:2, opt:"2 - Two" },
        { value:3, opt:"3 - Three" },
        { value:4, opt:"4 - Four" },
        { value:5, opt:"5 - Five" }
    ];
    $scope.member.noOfChildren = 0;

    $scope.memberRegistration = function () {
        $http({
            method: 'POST',
            url: '../server/memberRegistration.php',
            data: $scope.member,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (data) {
            $scope.message = data.data;
        }, function () {
            $scope.message = "Error while registering, please send details to cultural@troytelugu.org";
        });
        $scope.form = false;
    };
})

.controller('stallsCtrl', function($scope, $http, $location) {
    $scope.paramTO = {};
    $scope.paramTO.stallFee = 250.00 * 1;
    $scope.bDisplayError = false;
    $scope.regId = 0;
    $scope.paramTO.owner = "";
    $scope.paramTO.phone = "";
    $scope.paramTO.email = "";
    $scope.paramTO.info = "";
    $scope.regMessage = "Successfully Registered !!  \n\nAn email with details will be sent across shortly ...";
    $scope.paid = false;

    $scope.paypalInput = {};
    $scope.paypalInput.cmd = "_xclick";
    $scope.paypalInput.business = "bizindia5to5@gmail.com";
    $scope.paypalInput.no_note = "1";
    $scope.paypalInput.lc = "USA";
    $scope.paypalInput.currency_code = "USD";
    $scope.paypalInput.item_name = "TTA Ugadi Stall";
    $scope.paypalInput.last_name = "";
    $scope.paypalInput.receiver_email = "info@troytelugu.org";
    $scope.paypalInput.return = "http://troytelugu.org/views/tta.html#/response?event=sports18&status=Successful";
    $scope.paypalInput.cancel_return = "http://troytelugu.org/views/tta.html#/response?event=sports18&status=cancelled";
    $scope.paypalInput.notify_url = "http://troytelugu.org/server/stallsRegistration.php";

    // utility methods
    addFormFields = function (form, data) {
        if (data != null) {
            $.each(data, function (name, value) {
                if (value != null) {
                    var input = $("<input></input>").attr("type", "hidden").attr("name", name).val(value);
                    form.append(input);
                }
            });
        }
    }

    $scope.submitRegistration = function() {
        if ( $scope.paramTO.owner.length === 0 || $scope.paramTO.phone.length === 0 
                        || $scope.paramTO.email.length === 0 ) {
                $scope.displayError = true;
                $scope.errorMessage = "Please provide valid Business Owner Name, Phone and Email";
                return;
        }

        $http.post("../server/stallsRegistration.php", $scope.paramTO)
        .success(function (data, response, header) {
                $scope.bShowPayment = true;
                $scope.paramTO.reg_num = data.reg_num;
                if ( data.type === "exists" ) {
                    $scope.regMessage = "User Already Registered !";
                    $scope.paid = !( data.row.paid_status === "not paid" );
                    $scope.paramTO = data.row;
                }
        })
        .error(function (data, status, headers, config) {
                $scope.bDisplayError = true;
        });

        $scope.paypalInput.first_name = $scope.paramTO.owner;
        $scope.paypalInput.amount = $scope.paramTO.stallFee;
        $scope.paypalInput.payer_email = $scope.paramTO.email;
        $scope.paypalInput.item_number = $scope.paramTO.reg_num;

        // build form
        var form = $('<form></form>');
        form.attr("action", "https://www.paypal.com/cgi-bin/webscr");
        form.attr("method", "POST");
        form.attr("target", "_top");
        addFormFields(form, $scope.paypalInput);
        $("body").append(form);

        form.submit();
        form.remove();

    }

})

.controller('paypalCtrl', function($scope, $routeParams) {
    $scope.event = "TTA Event";
    if ( $routeParams.event === "sports18" ) {
        $scope.event = "2018 TTA Sports Registration"
    }
    $scope.status = $routeParams.status;
});

