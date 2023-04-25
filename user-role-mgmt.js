var objId=-1;
var edited=0;

function successFunc()
{
alert("Success");

}
function errorFunc()
{
alert("Operation Failed");

}

    function Main()
    {
        var roles = SecurityManager.GetAllRoles();
    var role = document.getElementById('role');
    for(var i=0;i<roles.length;i++)
    {
        var opt = document.createElement("option");
        opt.setAttribute("value",roles[i].RoleName);
        opt.innerText = roles[i].RoleName;

        role.appendChild(opt);
    }

var users= SecurityManager.GetAllUsers();
    console.log("Users:");
console.log(users);
var user = document.getElementById('user');

for(var i=0;i<users.length;i++)
    {
        var opt = document.createElement("option");
        opt.setAttribute("value",users[i].Login);
        opt.innerText = users[i].Login;

        user.appendChild(opt);
    }

    }

    function loadDataInForm(userRoleId)
    {
        objId = userRoleId;
        edited=1;
        var userRole = SecurityManager.GetUserRoleById(userRoleId);
        
        document.getElementById('role').value = userRole.Role;
        document.getElementById('user').value = userRole.User;


    }


function showTable()
{
    const Table = document.createElement('table');
    Table.setAttribute('class','table-border');
    Table.innerHTML="<tr><th>ID</th><th>Role</th><th>User</th><th>Edit</th><th>Delete</th></tr>";

    var user_role = SecurityManager.GetAllUserRoles();

    for(var i=0; i<user_role.length;i++)
    {
    
        var tr = document.createElement('tr');

        tr.innerHTML="<td>" + user_role[i].ID +"</td><td>"+user_role[i].Role +"</td><td>"+user_role[i].User +"</td><td><a href='javascript:loadDataInForm("+user_role[i].ID+")'>edit</a></td><td><a href='javascript:Delete("+user_role[i].ID+")'>delete</a></td>";
        Table.appendChild(tr);
    }

    document.getElementById('table-div').appendChild(Table);
    
}

function isRedundant(user,role)
{
     var user_role = SecurityManager.GetAllUserRoles();

     for(var i=0;i<user_role.length;i++)
     {
         if(role== user_role[i].Role && user == user_role[i].User)
             return true;
     }

     return false;
}

function validate()
{

 var role= document.getElementById('role').value;
 var user= document.getElementById('user').value;

if(role=='' || role=='Select')
{
        document.getElementById('form-error').innerHTML="Select a Role!";
        return false;
}

if(user=='' || user=='Select')
{
        document.getElementById('form-error').innerHTML="Select a User!";
        return false;
}

if(edited==0)
{
    if(isRedundant(user,role))
    {
        document.getElementById('form-error').innerHTML="Record already exists!";
        return false;
    }
}

return true;

}

function submitData(event)
{
    event.preventDefault();

    var role= document.getElementById('role').value;
    var user= document.getElementById('user').value;
   
  if(validate())
  {
    event.preventDefault();

    var obj = {ID:objId, Role:role, User:user};
    SecurityManager.SaveUserRole(obj,successFunc,errorFunc);
    location.reload();
  } 



}

function Delete(id)
{
    var text="Are you sure you want to delete?";
    if(confirm(text)){
        SecurityManager.DeleteUserRole(id,successFunc,errorFunc);
        location.reload();
    }
    else
        return;    
}

function resetDropdown()
{
 document.getElementById('role').value='';
 
 document.getElementById('user').value='';
 
 
}