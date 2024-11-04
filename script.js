

const inputField = document.getElementById("inputField");
const addBtn = document.querySelector(".addBtn");
const itemBox = document.querySelector(".item");

const getItemlocal = () => {
    let item = JSON.parse(localStorage.getItem("items")) || [];
    return item;
}

let arrayBox = getItemlocal() || [];

function createListItem(item) {
    let divElm = document.createElement("div");
    divElm.innerHTML = `<p>${item}</p> <i class="fa-solid fa-pen"></i> <i class="fa-solid fa-trash dlt"></i>`;
    divElm.classList.add("new-item");
    itemBox.append(divElm);
    inputField.value = "";

    let deleteBtn = divElm.querySelector(".dlt");
    deleteBtn.addEventListener("click", () => {
        divElm.remove();
        updateitem(item);
    });

    let editBtn = divElm.querySelector(".fa-pen");
    editBtn.addEventListener("click", () => {
        editItem(divElm, item);
    }); 

}


const editItem = (divElm,oldItem) => {
    // Create an input field and populate it with the current item text 
    let editInput = document.createElement("input");
    editInput.classList.add("editInput")
    editInput.value = oldItem;
    divElm.innerHTML = ""; 

    // Append the input field and a save button
    divElm.append(editInput);

    
    let saveBtn = document.createElement("button");
    saveBtn.classList.add("save")
    saveBtn.innerText = "Save";
    divElm.append(saveBtn);

    // Handle the save action
    saveBtn.addEventListener("click", () => {
        let newItem = editInput.value.trim(); 

        if (newItem !== "" && !arrayBox.includes(newItem)) {
            // Update the array and local storage
            arrayBox[arrayBox.indexOf(oldItem)] = newItem; // Replace old item with new item
            localStorage.setItem("items", JSON.stringify(arrayBox));
            divElm.innerHTML = `<p>${newItem}</p> <i class="fa-solid fa-pen"></i> </i> <i class="fa-solid fa-trash dlt"></i>`;
            createEditAndDeleteListeners(divElm, newItem);
        } 

        else if (arrayBox.includes(newItem)) {
            alert("This value already exists.");
        }

         else {
            alert("Please write a valid value.");
        }
    });

}

const createEditAndDeleteListeners = (divElm, item) => {
    let deleteBtn = divElm.querySelector(".dlt");
    deleteBtn.addEventListener("click", () => {
        divElm.remove();
        updateitem(item);
    });

    let editBtn = divElm.querySelector(".fa-pen");
    editBtn.addEventListener("click", () => {
        editItem(divElm, item);
    });
}



const handelItem = () => {
    let todoItem = inputField.value.trim();
    if (inputField.value !== "" && !arrayBox.includes(todoItem)) {
        arrayBox.push(todoItem);
        arrayBox = [...new Set(arrayBox)];  // Remove duplicate items
        localStorage.setItem("items", JSON.stringify(arrayBox));
        createListItem(todoItem);
    } 
    else if (arrayBox.includes(todoItem)) {
        alert("These values are the same");
    } 
    else if (inputField.value == "") {
        alert("Please write the value");
    }
}

const showitem = () => {
    let value = getItemlocal();
    value.forEach((i) => {
        createListItem(i);
    });
}

showitem();

const updateitem = (item) => {
    arrayBox = arrayBox.filter((i) => {
        return i !== item;
    });
    localStorage.setItem("items", JSON.stringify(arrayBox));
}   

    



addBtn.addEventListener("click", handelItem);




