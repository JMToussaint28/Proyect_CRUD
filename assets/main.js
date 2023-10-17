function validateForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var pueblo = document.getElementById("pueblo").value;

    if (name == "") {
        alert("El campo nombre es requerido");
        return false;
    }

    if (email == "") {
        alert("El campo Corrreo electrónico es requerido");
        return false;
    } else if (!email.includes("@")) {
        alert("Correo no valido")
        return false;
    }

    if (phone == "") {
        alert("El campo teléfono es requerido");
        return false;
    }


    if (pueblo == "") {
        alert("El campo pueblo es requerido");
        return false;
    }

    return true;

}

function showData() {
    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    var html = "";

    peopleList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.email + "</td>";
        html += "<td>" + element.phone + "</td>";
        html += "<td>" + element.pueblo + "</td>";
        html += '<td> <button onclick= "deleteData(' + index + ')" class = "btn btn-danger">Delete</button><button onclick= "updateData(' + index + ')" class = "btn btn-warning m-2">Edit</button></td>';
        html += "</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = html

}

document.onload = showData();

function AddData() {
    if (validateForm() == true) {
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var pueblo = document.getElementById("pueblo").value;

        var peopleList
        if (localStorage.getItem("peopleList") == null) {
            peopleList = [];
        } else {
            peopleList = JSON.parse(localStorage.getItem("peopleList"));
        }

        peopleList.push({
            name: name,
            email: email,
            phone: phone,
            pueblo: pueblo
        });

        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("pueblo").value = "";

    }
}

// Funcion para eliminar Datos de localStorage

function deleteData(index) {
    var peopleList
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }
    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
}

// Funcion para editar de LocalStorage

function updateData(index){
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    var peopleList
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("email").value = peopleList[index].email;
    document.getElementById("phone").value = peopleList[index].phone;
    document.getElementById("pueblo").value = peopleList[index].pueblo;

    document.querySelector("#Update").onclick = function () {
        if (validateForm() == true) {
            peopleList[index].name = document.getElementById("name").value;
            peopleList[index].email = document.getElementById("email").value;
            peopleList[index].phone = document.getElementById("phone").value;
            peopleList[index].pueblo = document.getElementById("pueblo").value;

            localStorage.setItem("peopleList", JSON.stringify(peopleList));

            showData();

            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("phone").value = "";
            document.getElementById("pueblo").value = "";

            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";
        }
    }

}

