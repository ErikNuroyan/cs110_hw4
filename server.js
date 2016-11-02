'use strict'
const http=require("http");
const fs=require("fs");




let TodoList=[];
let counter=0;
let ident=0;

const Delete=function(List1,ID){

for(let i=0;i<List1.length;i++){
  if(List1[i].id===ID){
    List1[i]="";
  }
}//end of for

return List1;
};//end of delete


const ChangeState=function(List,ID,state){
for(let i=0;i<List.length;i++){
  if(List[i].id===ID){
    List[i].STATUS=state;
  }

}


};



const Lowercaser=function(ARRAY){      //Working fine
let ReturnArray=[]
for(let i=0;i<ARRAY.length;i++){
  if(ARRAY[i].NewMess!=undefined){
ReturnArray[i]={NewMess:ARRAY[i].NewMess.toLowerCase()}
}
}
  return ReturnArray;
}



const SearchingFunc=function(AnArray,Keyword,Original){     //Working fine
let ArrayToBeReturned=[];
let counter=0;
for(let i=0;i<AnArray.length;i++){
if(AnArray[i]!=undefined){
if(AnArray[i].NewMess.search(Keyword.toLowerCase())!=-1/*||AnArray[i].search(Keyword.toUpperCase())!=-1*/){
  ArrayToBeReturned[counter++]=Original[i];
     }
}
}
if(counter===0){
  return -1;
}
else{

  return ArrayToBeReturned;
}

}//end of search function



const MyServer=http.createServer(function(req,res){
if(req.url==="/"||req.url==="/index.html"){
fs.readFile('./public/index.html',function(err,data){
if(err){
res.statusCode=404;
res.end("Oops,the requested file was not found");
}
else{
res.statusCode=200;
res.end(data);
}

});
}
else if(req.url==='/todos'){
if(req.method==="POST"){     //Adding new Todos

let NewMessage='';
req.on('data',function(NewMess){
NewMessage=JSON.parse(NewMess);
NewMessage.id=ident++;
});
req.on('end',function(){
let Resp=NewMessage;
TodoList.push(Resp);
counter++;
return res.end(JSON.stringify({Added:Resp}));
});
}
else if(req.method==="DELETE"){             //Deleting todos
let TDelete="";
req.on("data",function(ToBeDeleted){
  TDelete=JSON.parse(ToBeDeleted);
})//end of function
req.on("end",function(){

res.end(JSON.stringify({Added:Delete(TodoList,TDelete.id)}));

})//end of function

}//end of Delete

else if(req.method==="PUT"){     //Searching ToDos

let NewSearch='';
req.on('data',function(NewMess){
NewSearch=JSON.parse(NewMess);
});
req.on('end',function(){
const ToBeSearched=NewSearch.NewMess;
if(SearchingFunc(Lowercaser(TodoList),ToBeSearched,TodoList)===-1){
  res.end(JSON.stringify({Result:"Nothing was found"}));
}

  res.end(JSON.stringify({Result:SearchingFunc(Lowercaser(TodoList),ToBeSearched,TodoList)}));

});
}


}//end of todos
else if(req.url === "/todoChangeState" && req.method==="POST"){  //Changing the state
let GetElement='';
req.on("data",function(Element){
GetElement=JSON.parse(Element);
ChangeState(TodoList,GetElement.id,GetElement.STATUS);

})
res.end("Success");//to be deleted


}//end of change state

else if(req.url==="/todosupdate" && req.method==="GET"){
res.end(JSON.stringify({Sent:TodoList}));

}



else{
fs.readFile('./public'+req.url,function(err,data){
if(err){
res.statusCode=404;
res.end("Oops,the requested file was not found");
}
else{
res.statusCode=200;
res.end(data);
}
}//end of readfile
)


}//end of else
}).listen("7777",console.log("Server is listening to port 7777"));
