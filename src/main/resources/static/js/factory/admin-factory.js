lmsApp.factory("lmsFactory",function($http){
  return {

      readAllObjects : function(url){
            var listObjects = {};
             return $http.get(url,{
                headers: {'Content-type': 'application/json'}
            }).success(function(data){
               listObjects = data;
            }).then(function(data){
                return listObjects;
            })
      },
      saveAllObjects : function(url,obj){
            var listObjects = {};
             return $http.post(url,obj).success(function(data){
               listObjects = data;
            }).then(function(data){
                return listObjects;
            })
      }
  }
})
