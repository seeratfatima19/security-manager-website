var edited=0;
var objId=-1;

function successFunc()
{
    alert("Operation Successful!");
}

function errorFunc()
{
    alert("Error!");
}

function showTable()
{
 const Table = document.createElement('table');
Table.setAttribute('class','table-border');
Table.innerHTML="<tr><th>ID</th><th>Name</th><th>Description</th><th>Edit</th><th>Delete</th></tr>";

var perms = SecurityManager.GetAllPermissions();

for(var i=0; i<perms.length;i++)
{

    var tr = document.createElement('tr');

    tr.innerHTML="<td>" + perms[i].ID +"</td><td>"+perms[i].PermName +"</td><td>"+perms[i].Description +"</td><td><a href='javascript:loadDataInForm("+perms[i].ID+")'>edit</a></td><td><a href='javascript:Delete("+perms[i].ID+")'>delete</a></td>";
    Table.appendChild(tr);
}

document.getElementById('table-div').appendChild(Table);

}

function checkPermission(){
var permName = document.getElementById('perm').value;
var permissions= SecurityManager.GetAllPermissions();

for(var i=0;i<permissions.length;i++)
{
    if(permissions[i].PermName == permName &&permissions[i].ID!=objId){
        return false;
    }
}
    return true;
}


function loadDataInForm(permId)
{
edited=1;
objId = permId;
var permission = SecurityManager.GetPermissionById(permId);

document.getElementById('perm').value= permission.PermName;
document.getElementById('desc').value = permission.Description;

}

function validate()
{
var perm = document.getElementById('perm').value;
var desc = document.getElementById('desc').value;

if(perm=='')
{
    document.getElementById('form-error').innerHTML= 'Enter Permission name';
    return false;
}

if(edited==0)
{
    if(!checkPermission())
    {
        document.getElementById('form-error').innerHTML= 'Permission already exists';
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

function savePermission(event)
{
event.preventDefault();

var permission =document.getElementById('perm').value;
var desc = document.getElementById('desc').value ;

if(validate())
{
    if(edited==0)
    {
        var obj={PermName:permission, Description:desc};
        SecurityManager.SavePermission(obj,successFunc,errorFunc);
    }

    if(edited==1)
    {
        var obj={ID:objId, PermName:permission, Description:desc};

        if(!checkPermission())
        {
            document.getElementById('form-error').innerHTML= 'Permission already exists';
            return false;
        }
        SecurityManager.SavePermission(obj,successFunc,errorFunc);

    }
    
    location.reload();
}

else
 edited=0;

}

function Delete(id)
{
    var text="Are you sure you want to delete?";
    if(confirm(text)){
        SecurityManager.DeletePermission(id,successFunc,errorFunc);
        location.reload();
}
else
    return;    
}

