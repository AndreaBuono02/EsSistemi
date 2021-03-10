function caricamentoDati(){
    var employees = new XMLHttpRequest();
    employees.onreadystatechange = function() { 
        if (employees.readyState == 4 && employees.status == 200)
            callback(employees.responseText);
    }
    employees.open("GET", "http://localhost:8080/swagger-ui.html" , true); 
    for (let index = 0; index < 5; index++) {
        document.getElementById("tabella").innerHTML += "<tr><td>" + JSON.parse(employees.responseBody)[index].firstName + "</td><td>" + JSON.parse(employees.responseBody)[index].email + "</td><td>"+ JSON.parse(employees.responseBody)[index].firstName + "</td><td>" + JSON.parse(employees.responseBody)[index].phone;
        
    }
    
}