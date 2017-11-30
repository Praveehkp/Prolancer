
var app = angular.module('angularApp', ['chart.js']);
app.controller('myController', function($scope,retriveJson) {

    var update_chart = function(response){
			names = [];
			dollar_rate = []; 
			console.log(response)
			for (let i=0;i<response.length;i++){
				names.push(response[i].id)
				dollar_rate.push(response[i].price_usd)
				console.log(dollar_rate)
			}
			$scope.labels = names
			$scope.series = ['Exchange rate'];
			$scope.data = dollar_rate
	}


    retriveJson.fetch().then(function(response){
		    update_chart(response)
	 })
			

   		
		

setInterval(function(){
retriveJson.fetch().then(function(response){
		update_chart(response)    
	 })
},300000)		
   
});

app.factory('retriveJson', function($q, $timeout, $http) {
	//var url = "https://api.coinmarketcap.com/v1/ticker/";
	var url = "https://api.coinmarketcap.com/v1/ticker/?limit=10";
  var __LretriveJson = {
    fetch: function(callback) {
      return $http.get(url).then(function(response) {
        return response.data;
      });
    }
  };
  return __LretriveJson;
});

