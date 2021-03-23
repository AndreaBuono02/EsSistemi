var risposta;
function caricamentoDati(){
    var xhr = new XMLHttpRequest()
    xhr.open("GET", "http://localhost:8080/api/tutorial/1.0/employees", true)
    xhr.setRequestHeader("Accept", "*/*")

    xhr.onreadystatechange = function() {
  	if (xhr.readyState === xhr.DONE && xhr.status === 200) {
        risposta = JSON.parse(xhr.response)
        console.log(risposta)
        risposta.forEach(impiegato => {
        document.getElementById("tabella").innerHTML += "<tr><td>"+impiegato.firstName+" "+impiegato.lastName+"</td><td>"+impiegato.email+"</td><td>"+impiegato.phone+"</td><td><input type='button' value='rimuovi' style='background-color: lightcoral; color: white;' onclick='rimuovi("+impiegato.employeeId+")'></td></tr>"
      });
    }
  };
  xhr.send();
}

function accesso(){
    var xhr = new XMLHttpRequest()
    xhr.open("GET", "http://localhost:8080/api/tutorial/1.0/employees", true)
    xhr.setRequestHeader("Accept", "*/*")
    xhr.onreadystatechange = function() {
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
        risposta = JSON.parse(xhr.response)
        console.log(risposta)
    }
  }
  xhr.send();
  return risposta;
}

async function inserimento(){
    var xhr = new XMLHttpRequest()
    xhr.open("POST", "http://localhost:8080/api/tutorial/1.0/employees", true)
    xhr.setRequestHeader("Accept", "*/*")
    xhr.setRequestHeader("Content-Type", "application/json")
  
    risposta = await accesso();
    await sleep(300);
    let impiegatoId = 0;
    if(document.getElementById('nome').value == "" ||  document.getElementById('cognome').value == "" || document.getElementById('email').value == "" || document.getElementById('telefono').value == "")
    {
      document.getElementById("errore").innerHTML = "Errore alcuni caratteri non sono stati rimepiti";
    }
    else{
      risposta.forEach(impiegato => {
        if(impiegato.employeeId > impiegatoId)impiegatoId = impiegato.employeeId;
      })
      impiegatoId += 1;
    
      let nome = document.getElementById('nome').value; 
      let cognome = document.getElementById('cognome').value; 
      let email = document.getElementById('email').value; 
      let phone = document.getElementById('telefono').value; 
    
      let data = {
        "employeeId": impiegatoId,
        "firstName": nome,
        "lastName": cognome,
        "email": email,
        "phone": phone
      };
    
      xhr.onreadystatechange = function() {
          if(xhr.readyState === xhr.DONE && xhr.status === 201) {
          window.location.reload();
          
            }else if(xhr.readyState === xhr.DONE && xhr.status !== 201){
          document.getElementById("response").innerHTML = "Errore"
          console.log(xhr.status)
        }
      };
      xhr.send(JSON.stringify(data));
      window.location.replace("index.html");
    }
  }

  function rimuovi(impiegatoId){
    var xhr = new XMLHttpRequest()
    xhr.open("DELETE", "http://localhost:8080/api/tutorial/1.0/employees/"+impiegatoId, true)
    xhr.setRequestHeader("Accept", "*/*")
  
    xhr.onreadystatechange = function() {
        if(xhr.readyState === xhr.DONE && xhr.status === 200) {
        window.location.reload();
        
          }else if(xhr.readyState === xhr.DONE && xhr.status !== 200){
        document.getElementById("response").innerHTML = "Errore"
      }
    };
    xhr.send();
  }

  
  function apriPagina() {
    window.location.replace("inserisci.html");
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
