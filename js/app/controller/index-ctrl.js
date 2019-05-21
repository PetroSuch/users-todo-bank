app.controller('indexCtrl', function($scope,$rootScope,FactoryCrud,$timeout) {
    $scope.users = [];
    $scope.fields = [];
    $scope.newUser = {};
    $scope.popUp_AddNew = false;
    $scope.popUp_Profile = false;
    $scope.loader = false;
    $scope.validateForm = false;
    $scope.singleUser = [];
    $scope.submission = {};

    FactoryCrud.get('users.json').then((users_res)=>{
        FactoryCrud.get('items.json').then((fields_res)=>{
            var users = users_res.data
            var fields = fields_res.data
            $scope.fields = fields
            for(var k in users){
                var item = {};
                for (var i = 0; i < users[k].length; i++) {
                    item[fields[i]['name']] = users[k][i]
                }
                $scope.users.push(item)
            }
            console.log($scope.users)
            console.log($scope.fields)
        })  
    })

    $scope.deleteUser = function(id_person){
        var confir = confirm("Удалить ?")
        if(confir){
            for(var k in $scope.users){
                if($scope.users[k]['IDPERSON'] == id_person){
                    $scope.users.splice(k,1)
                }
                //HTTP запрос на бекенд, удаления пользователя из БД 
                // FactoryCrud.post(url,{id_person:id_person}).then((res)=>{})
            }
        }
    }
    
    $scope.addNewUser = function(form){
        if($scope.formAddNew.$valid){
            $scope.loader = true;
            var obj = {}
            /*Цикл ниже нужен мне для того что бы добавитт в массив поля которых нету в форме*/
            /*Statusname,Acc1num,Cardtemplname и тд*/
            /*Этот цикл не нужен будет когда прийдет ответ от сервера ниже FactoryCrud.post()*/
            for(var k in $scope.fields){
                obj[$scope.fields[k]['name']] = ''
                for(var y in $scope.newUser){
                    if(y == $scope.fields[k]['name']){
                        obj[y] = $scope.newUser[y];
                    }
                }
            }
            /*Делаем http запрос на сервер , сохраняем юзера ы сервер возвращает полный массив юзера*/
            // FactoryCrud.post(url,{obj:obj}).then((res)=>{
            //     $scope.users.reverse();
            //     $scope.users.push(red.data.obj)
            //     $scope.users.reverse();
            // })
            // Здесь тестово добавляю в массив нового юзера
            $timeout(()=>{                
                $scope.users.reverse();
                $scope.users.push(obj)
                $scope.users.reverse();
                $scope.loader = false
                $scope.popUp_AddNew = false;
            },3000)
            
                
        }else{
            $scope.validateForm = true;
        }      
    }

    $scope.closeOutsideAddNew = function(event){
        var popup = document.getElementById('form');
        if(!popup.contains(event.target)){ 
            console.log(event.target)
            $scope.popUp_AddNew = false;
        }
    }
    $scope.closeOutsideProfile = function(event){
        var popup = document.getElementById('profile');
        if(!popup.contains(event.target)){ 
            console.log(event.target)
            $scope.popUp_Profile = false;
        }
    }

    $scope.showProfileUser = function(id_person){
        for(var k in $scope.users){
            if($scope.users[k]['IDPERSON'] == id_person){
                $scope.popUp_Profile = true
                $scope.singleUser = $scope.users[k]
            }
        }
    }

});
