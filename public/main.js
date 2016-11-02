'use strict'
let counter=0;
let counter2=0;
const a=$("#hey");
const b=$("#Button");
const c=$("#TextBox");
const d=$("#TextBox2");
const e=$("#Button3");


$.ajax({
url:"/todosupdate",
type:"get",
success:function(b){
  const a=JSON.parse(b);
  for(let i=0;i<a.Sent.length;i++){
    if(a.Sent[i].STATUS===false){
  $("#list").append("<li >"+a.Sent[i].NewMess+"<input onclick=\"CheckBox("+a.Sent[i].STATUS+","+a.Sent[i].id+")\" style=\"margin-left:35px\" type=\"checkbox\" ></input>"+"<button onclick=\"Delete("+a.Sent[i].id+")\">Delete</button>"+"</li>");
}
else if(a.Sent[i].STATUS===true){
  $("#list").append("<li >"+a.Sent[i].NewMess+"<input onclick=\"CheckBox("+a.Sent[i].STATUS+","+a.Sent[i].id+")\" style=\"margin-left:35px\" type=\"checkbox\" checked=\"checked\"></input>"+"<button onclick=\"Delete("+a.Sent[i].id+")\">Delete</button>"+"</li>");


}//end of else

}
},
error:function(){
  alert("error");
}



});//end of first get request















const Delete =function(ID){
$.ajax({
url:"/todos",
type:"delete",
data:JSON.stringify({
id:ID
}),
success:function(NewList){
  const a=JSON.parse(NewList);
  $("#list").find("li").remove();
  $("#list2").find("li").remove();
  for(let i=0;i<a.Added.length;i++){
    if(a.Added[i].STATUS===false){
  $("#list").append("<li>"+a.Added[i].NewMess+"<input onclick=\"CheckBox("+a.Added[i].STATUS+","+a.Added[i].id+")\" style=\"margin-left:35px\" type=\"checkbox\" ></input>"+"<button onclick=\"Delete("+a.Added[i].id+")\">Delete</button>"+"</li>");
}
else if(a.Added[i].STATUS===true){
  $("#list").append("<li>"+a.Added[i].NewMess+"<input onclick=\"CheckBox("+a.Added[i].STATUS+","+a.Added[i].id+")\" style=\"margin-left:35px\" type=\"checkbox\" checked=\"checked\"></input>"+"<button onclick=\"Delete("+a.Added[i].id+")\">Delete</button>"+"</li>");


}//end of else

}//end of for
},//end of function
error:function(){
  alert("error");
}







})


}//end of delete

const CheckBox=function(STATUS,ID){
let state='';
if(STATUS===false){
  state=true;
}
else{
  state=false;
}
$.ajax({
url:"/todoChangeState",
type:"post",
data:JSON.stringify({
id:ID,
STATUS:state

}),
success:function(Success){
  alert(Success);// to be deleted
},
error: function(){
alert("error");
}



})//end of ajax
}//end of function









b.on("click",function(){
  if(counter===0){
    $("#TextBox").val("");
  }
if($("#TextBox").val()===""){
  alert("You cannot imput empty text");
  return "";
}
$.ajax({
url:"/todos",
type:'post',
data:JSON.stringify({
NewMess:$("#TextBox").val(),
STATUS:false,
id:""
}),
contentType : "application/json; charset=utf-8",
success: function(param){
const a=JSON.parse(param);
if(a.Added.STATUS===false){
$("#list").append("<li>"+a.Added.NewMess+"<input onclick=\"CheckBox("+a.Added.STATUS+","+a.Added.id+")\" style=\"margin-left:35px\" type=\"checkbox\" ></input>"+"<button onclick=\"Delete("+a.Added.id+")\">Delete</button>"+"</li>");
}//end of if
else if(a.Added.STATUS===true){
$("#list").append("<li>"+a.Added.NewMess+"<input onclick=\"CheckBox("+a.Added.STATUS+","+a.Added.id+")\" style=\"margin-left:35px\" type=\"checkbox\" checked=\"checked\"></input>"+"<button onclick=\"Delete("+a.Added.id+")\">Delete</button>"+"</li>");

}//end of else

},
error: function(){
alert("error");
}
}
);//end of ajax
$("#TextBox").val("");
});





c.on("click",function(){
if(counter===0){
$("#TextBox").val("");
counter++;
}

});

d.on("click",function(){
if(counter2===0){
$("#TextBox2").val("");
counter++;
}

});

e.on("click",function(){
  if(counter===0){
    $("#TextBox2").val("");
  }
if($("#TextBox2").val()===""){
  alert("You cannot imput empty text");
  return "";
}
$.ajax({
url:"/todos",
type:'put',
data:JSON.stringify({
NewMess:$("#TextBox2").val()
}),
contentType : "application/json; charset=utf-8",
success: function(param){
const a=JSON.parse(param);
$("#list2").find("li").remove();
if(typeof(a.Result)==="string"){
$("#list2").append("<li>"+a.Result+"</li>");
}
else if(typeof(a.Result)==="object"){
  for(let i=0;i<a.Result.length;i++){
    if(a.Result[i].STATUS===false){
    $("#list2").append("<li>"+a.Result[i].NewMess+"<input onclick=\"CheckBox("+a.Result[i].STATUS+","+a.Result[i].id+")\" style=\"margin-left:35px\" type=\"checkbox\"></input>"+"<button onclick=\"Delete("+a.Result[i].id+")\">Delete</button>"+"</li>");
}
   else if(a.Result[i].STATUS===true){
     $("#list2").append("<li>"+a.Result[i].NewMess+"<input onclick=\"CheckBox("+a.Result[i].STATUS+","+a.Result[i].id+")\" style=\"margin-left:35px\" type=\"checkbox\" checked=\"checked\"></input>"+"<button onclick=\"Delete("+a.Result[i].id+")\">Delete</button>"+"</li>");
   }

  }//end of for
}//end of else
},
error: function(){
alert("error");
}
}
);//end of ajax
$("#TextBox2").val("");
});
