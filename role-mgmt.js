var edited=0;
var objId=-1;

function successFunc(){
    alert("Operation Successful!");
}
function errorFunc(){
    alert("Error!");
}


function showTable()
{
const Table = document.createElement('table');
Table.setAttribute('class','table-border');
Table.innerHTML="<tr><th>ID</th><th>Name</th><th>Description</th><th>Edit</th><th>Delete</th></tr>";

var roles = SecurityManager.GetAllRoles();

for(var i=0; i<roles.length;i++)
{
  
    var tr = document.createElement('tr');

    tr.innerHTML="<td>" + roles[i].ID +"</td><td>"+roles[i].RoleName +"</td><td>"+roles[i].Description +"</td><td><a href='javascript:loadDataInForm("+roles[i].ID+")'>edit</a></td><td><a href='javascript:Delete("+roles[i].ID+")'>delete</a></td>";
    Table.appendChild(tr);
}

document.getElementById('table-div').appendChild(Table);
 


}

function checkRole(){
var roleName = document.getElementById('role').value;
var roles= SecurityManager.GetAllRoles();

for(var i=0;i<roles.length;i++)
{
    if(roles[i].RoleName == roleName && roles[i].ID!=objId){
        return false;
    }
}
    return true;
}

function validate()
{
    var role = document.getElementById('role').value;
    var desc = document.getElementById('desc').value;

    if(role=='')
    {
        document.getElementById('form-error').innerHTML= 'Enter Role';
        return false;
    }

    if(edited==0){

        if(!checkRole())
        {
            document.getElementById('form-error').innerHTML= 'Role already exists';
            return false;
        }
    }

    if(desc=='')
    {
        document.getElementById('form-error').innerHTML= 'Enter Description';
        return false;
    }

    return true;
}

function loadDataInForm(roleId){

    edited=1;
    objId = roleId;
    var role = SecurityManager.GetRoleById(roleId);

    document.getElementById('role').value= role.RoleName;
    document.getElementById('desc').value = role.Description;
    
}

function submitRole(event)
{
    event.preventDefault();

    var role =document.getElementById('role').value;
    var desc = document.getElementById('desc').value ;

    if(validate())
    {
        
        if(edited==0)
        {
            var obj={RoleName:role, Description:desc };
            SecurityManager.SaveRole(obj,successFunc,errorFunc);
        }
        
        if(edited==1)
        {
            var obj={ID:objId, RoleName:role, Description:desc };
            if(!checkRole())
                {
                    document.getElementById('form-error').innerHTML= 'Role already exists';
                    return false;
                }   

            SecurityManager.SaveRole(obj,successFunc,errorFunc);
        }
        location.reload();
    }

     edited=0;

}

function Delete(id)
{
    var text="Are you sure you want to delete?";
    if(confirm(text)){
        SecurityManager.DeleteRole(id,successFunc,errorFunc);
        location.reload();
    }
    else
        return;    
}
