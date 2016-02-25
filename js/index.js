var reminder=angular.module('reminder', []);
reminder.filter('search',function(){
	return function(e,key){
		var r=[];
        var test=function(items){
            for(var i=0;i<items.length;i++){
            	if(items[i].title.indexOf(key)!=-1){
            		return true;
            	}
            }
            return false;
        }
		for(var i=0;i<e.length;i++){
			if(e[i].name.indexOf(key)!=-1||test(e[i].items)){
				r.push(e[i]);
			}
		}
		return r;
	}
});
reminder.controller('rdCtrl', ['$scope', function($scope){
	//localStorage.clear();
	var d = localStorage.data;
	$scope.shijianliebiao = d?JSON.parse(d):[{name:'新列表',color:'purple',items:[]}];
	$scope.colors = ['purple','green','blue','yellow','brow','pink','orange'];
	$scope.cindex = 0;
	$scope.key=""
	$scope.setItem = function(index) {
		$scope.cindex = index;
	}
	$scope.addItem=function(){
		var data = {
			name:'新列表' + ($scope.shijianliebiao.length+1),
			color:$scope.colors[$scope.shijianliebiao.length%7],
			items:[]
		};
		$scope.shijianliebiao.push(data);
		localStorage.data = JSON.stringify($scope.shijianliebiao);
	}
	$scope.addtiaomu=function(){
		var cu = $scope.shijianliebiao[$scope.cindex];
	    var data = {title:'新条目'+(cu.items.length+1),isDone:false};
	    cu.items.push(data);
	    localStorage.data = JSON.stringify($scope.shijianliebiao);
	}
	$scope.setColor=function(index){
        $scope.shijianliebiao[$scope.cindex].color=$scope.colors[index];
	}
	var selectlist=document.querySelector("#select");
	$scope.showSelect=function(){
        if(selectlist.style.display=="block"){
        	selectlist.style.display="none";
        }else{
        	selectlist.style.display="block";
        }
	}
	$scope.huanyuan=function(index){
		$scope.shijianliebiao[index].color=$scope.colors[index%7];
	}
	$scope.deleteList=function(){
		var kongarr=[];
		for(var i=0;i<$scope.shijianliebiao.length;i++){
			if($scope.shijianliebiao.length==1){
				alert("这是最后一条提醒不能删除");
				return;
			}
			if(i!=$scope.cindex){
				kongarr.push($scope.shijianliebiao[i]);
			}
		}
		$scope.shijianliebiao=kongarr;
		$scope.cindex=0;
		selectlist.style.display="none";
		localStorage.data=JSON.stringify($scope.shijianliebiao);
	}
	$scope.aa='新列表'||$scope.shijianliebiao[$scope.cindex].name;
	$scope.finsh=function(){
		selectlist.style.display="none";
		$scope.shijianliebiao[$scope.cindex].name=$scope.aa;
	}
	//判断已完成数
	$scope.countDown=function(){
		var lis=$scope.shijianliebiao[$scope.cindex].items;
		var num=0;
		for(var i=0;i<lis.length;i++){
			if(lis[i].isDone==true){
				num+=1;
			}
		}
		return num;
	}
	//删除条目
	$scope.deletetiaomu = function(index) {
	  var r=[];
	  var cu=$scope.shijianliebiao[$scope.cindex]; 
	  for(var i=0 ; i<cu.items.length; i++){
	    if(i!=index){
	      r.push(cu.items[i]);
	    }
	  } 
	  $scope.shijianliebiao[$scope.cindex].items=r; 
	  localStorage.data=JSON.stringify($scope.shijianliebiao);
	}
	//更改完成情况isDone
	$scope.change=function(index){
        $scope.shijianliebiao[$scope.cindex].items[index].isDone=!$scope.shijianliebiao[$scope.cindex].items[index].isDone;
	}
	$scope.save = function() {
    localStorage.data = JSON.stringify($scope.shijianliebiao);
  }
}])