var objId=-1;
var edited=0; //not in editing mode

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

    var perms= SecurityManager.GetAllPermissions();
    var permission = document.getElementById('perm')
    for(var i=0;i<perms.length;i++)
        {
            var opt = document.createElement("option");
            opt.setAttribute("value",perms[i].PermName);
            opt.innerText = perms[i].PermName;

            permission.appendChild(opt);
        }


        

}

function successFunc()
{
    alert("Success");

}
function errorFunc()
{
    alert("Operation Failed");
    
}


function loadDataInForm(rolePermId)
{
    objId = rolePermId;
    edited=1;
    var rolePerm = SecurityManager.GetRolePermissionById(rolePermId);
    
    document.getElementById('role').value = rolePerm.Role;
    document.getElementById('perm').value = rolePerm.Permission;
    
  }

function showTable()
   {
        const Table = document.createElement('table');
        Table.setAttribute('class','table-border');
        Table.innerHTML="<tr><th>ID</th><th>Role</th><th>Permission</th><th>Edit</th><th>Delete</th></tr>";

        var role_perm = SecurityManager.GetAllRolePermissions();
    
        for(var i=0; i<role_perm.length;i++)
        {
        
            var tr = document.createElement('tr');

            tr.innerHTML="<td>" + role_perm[i].ID +"</td><td>"+role_perm[i].Role +"</td><td>"+role_perm[i].Permission +"</td><td><a href='javascript:loadDataInForm("+role_perm[i].ID+")'>edit</a></td><td><a href='javascript:Delete("+role_perm[i].ID+")'>delete</a></td>";
            Table.appendChild(tr);
        }

        document.getElementById('table-div').appendChild(Table);
        
   }

   function isRedundant(role,permission)
   {
        var role_perm = SecurityManager.GetAllRolePermissions();

        for(var i=0;i<role_perm.length;i++)
        {
            if(role== role_perm[i].Role && permission == role_perm[i].Permission)
                return true;
        }

        return false;
   }

   function validate()
   {
 
    var role=document.getElementById('role').value;
    var permission = document.getElementById('perm').value;
    if(role=='' || role=='Select')
    {
            document.getElementById('form-error').innerHTML="Select a Role!";
            return false;
    }

    if(permission=='' || permission=='Select')
    {
            document.getElementById('form-error').innerHTML="Select a Permission!";
            return false;
    }

    if(edited==0)
    {
        if(isRedundant(role,permission))
        {
            document.getElementById('form-error').innerHTML="This record exists!";
            return false;
        }
    }

    return true;

   }




   function submitData(event)
   {
        event.preventDefault();

        var role = document.getElementById('role').value;
        var permission = document.getElementById('perm').value;

      if(validate())
      {
          var obj = {ID:objId, Role:role, Permission:permission};
        SecurityManager.SaveRolePermission(obj,successFunc,errorFunc);
        location.reload();
      } 
 

   }

   function Delete(id)
   {
        var text="Are you sure you want to delete?";
        if(confirm(text)){
            SecurityManager.DeleteRolePermission(id,successFunc,errorFunc);
            location.reload();
        }
        else
            return;    
   }

   function resetDropdown()
   {
    document.getElementById('role').value='';
    
    document.getElementById('perm').value='';
    
    
   }
