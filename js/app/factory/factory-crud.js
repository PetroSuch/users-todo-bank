app.factory('FactoryCrud', function($http){
    var factory = {};
    factory.post = function(data,url_create){
        return $http.post(url_create,data);
    };
    factory.get = function(url_read){
        return $http.get(url_read);
    };
    factory.update = function(arr_upd,url_update){
        return $http.post(url_update,arr_upd);
    };
    factory.delete = function(url_delet){
        return $http.get(url_delet);
    };


    factory.post_jq = function(arr_post,url_post){
        return $http.post(url_post,arr_post,{
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        });
    };
    
    return factory;
}); 