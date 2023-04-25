
var edited=0;
var objId=-1;

function Main()
{
    var countries = SecurityManager.GetCountries();
        var cmb = document.getElementById('cmbCountries');
      
        for(var i=0;i<countries.length;i++)
        {
            var opt = document.createElement("option");
            opt.setAttribute("value",countries[i].CountryID);
            opt.innerText = countries[i].Name;

            cmb.appendChild(opt);
        }

        
        cmb.onchange = function(){

            var citycmb = document.getElementById('cmbCities');

            //Remove all child elements (e.g. options)
            citycmb.innerHTML = '';

            var cities = SecurityManager.GetCitiesByCountryId(cmb.value);
            for(var i=0;i<cities.length;i++)
            {
                var opt = document.createElement("option");
                opt.setAttribute("value",cities[i].Name);
                opt.innerText = cities[i].Name;

                citycmb.appendChild(opt);
            }   


        }//end of onchange

}

function Delete(id)
{
    console.log("in delete");
    var text="Are you sure you want to delete?";
    if(confirm(text)){
        SecurityManager.DeleteUser(id,successFunc,errorFunc);
        location.reload();
    }
    else
        return;    
}

function loadDataInForm(userId){

edited=1;
objId = userId;
var user = SecurityManager.GetUserById(userId);

document.getElementById('usr').value= user.Login;
document.getElementById('passwd').value = user.Password;
document.getElementById('name').value = user.Name;
document.getElementById('email').value=user.Email;
document.getElementById('cmbCountries').value=user.Country;
document.getElementById('cmbCities').value = user.City;


}

function showTable()
{
const Table = document.createElement('table');
Table.setAttribute('class','table-border');
Table.innerHTML="<tr><th>ID</th><th>Login</th><th>Email</th><th>Edit</th><th>Delete</th></tr>";

var users = SecurityManager.GetAllUsers();

for(var i=0; i<users.length;i++)
{
  
    var tr = document.createElement('tr');

    tr.innerHTML="<td>" + users[i].ID +"</td><td>"+users[i].Login +"</td><td>"+users[i].Email +"</td><td><a href='javascript:loadDataInForm("+users[i].ID+")'>edit</a></td><td><a href='javascript:Delete("+users[i].ID+")'>delete</a></td>";
    Table.appendChild(tr);
}

document.getElementById('table-div').appendChild(Table);
 
}

function successFunc(){
    alert("Sucess!");
}
function errorFunc(){
    alert("Error!");
}

function checkLogin()
{
var login = document.getElementById('usr').value;
var users= SecurityManager.GetAllUsers();

for(var i=0;i<users.length;i++)
{
    if(users[i].Login == login && users[i].ID !=objId){
        return false;
    }
}
return true;

}

function checkEmail(){
var email = document.getElementById('email').value;
var users= SecurityManager.GetAllUsers();

for(var i=0;i<users.length;i++)
{
    if(users[i].Email == email && users[i].ID !=objId){
        return false;
    }
}
    return true;
}


function validate()
{
    var login = document.getElementById('usr').value;
    var pass = document.getElementById('passwd').value;
    var name=document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var country = document.getElementById('cmbCountries').value;
    var city = document.getElementById('cmbCities').value;
    
    
    if(login=='')
    {
        document.getElementById('form-error').innerHTML="Login field Empty!";
        return false;
    }

    if(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(login))
    {
        document.getElementById('form-error').innerHTML="Login can't have special characters!";
        return false;
    
    }

    if(edited == 0)
    {
        if(!(checkLogin()))  //check login uniqueness
        {
        document.getElementById('form-error').innerHTML="This user already exists";
        return false;
        }
    }

    if(pass=='')
    {
        document.getElementById('form-error').innerHTML="Password field Empty!";
        return false;
    }
    if(name=='')
    {
        document.getElementById('form-error').innerHTML="Name field Empty!";
        return false;
    }

    if(/[0-9]/.test(name))
    {
        document.getElementById('form-error').innerHTML="Name can't contain a number!";
        return false;
    }

    if(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(name))
    {
        document.getElementById('form-error').innerHTML="Name can't contain any special character!";
        return false;
    }

    if(email=='')
    {
        document.getElementById('form-error').innerHTML="Email field Empty!";
        return false;
    }

    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)))
    {
        document.getElementById('form-error').innerHTML="Wrong email format!";
        return false;
    }

    if(edited==0)
    {
        if(!(checkEmail()))
        {
        document.getElementById('form-error').innerHTML="This email already exists";
        return false;
        }
    }

    if(country=='' || country=='Select')
    {
        document.getElementById('form-error').innerHTML="Select a Country!";
        return false;
    }
    if(city=='' || city=='Select')
    {
        document.getElementById('form-error').innerHTML="Select a City!";
        return false;
    }
    


    return true;
}

function submitData(event)
{

    event.preventDefault();
    var login = document.getElementById('usr').value;
    var pass = document.getElementById('passwd').value;
    var name=document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var country = document.getElementById('cmbCountries').value;
    var city = document.getElementById('cmbCities').value;
    


    if(validate())
    {
        if(edited==0)
        {
            var obj = {Login:login, Password:pass, Name: name, Email: email, Country:country, City:city};
            SecurityManager.SaveUser(obj,successFunc,errorFunc);
        }

        if(edited==1)
        {
            var obj = {ID:objId,Login:login, Password:pass, Name: name, Email: email, Country:country, City:city};


            if(!(checkLogin()))  //check login uniqueness
            {
                document.getElementById('form-error').innerHTML="This user already exists";
                return false;
            }
  
            if(!checkEmail())
            {
                document.getElementById('form-error').innerHTML="This email already exists";
                return false;                 
            }

 
            SecurityManager.SaveUser(obj,successFunc,errorFunc);
            
        }

        
        location.reload();    
    }


     edited=0;

    
}

function resetDropdown()
{
 document.getElementById('cmbCountries').value='';
 
 document.getElementById('cmbCities').value='';
 
 
}
