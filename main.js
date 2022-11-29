
//GETTING HTML ELEMENTS
const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", (e) => {
e.preventDefault();
const cost = document.getElementById("cost").value;
const description = document.getElementById("movie").value;
const category = document.getElementById("selectList").value;
if (description.length > 0 && cost.length) {
const object = {
cost : cost,
description: description,   
category: category,
};

 //POSTING DATA TO CRUD CRUD REST API
 async function postUser() {
 try {
  const exp = await axios.post("https://crudcrud.com/api/f86429d8166341458a9a6c7ffbfe1143/expenseTracker",  object)
  console.log(exp.data);
  addNewLineElement(exp.data);
  }  
  catch(error) {  
    document.body.innerHTML = document.body.innerHTML ="<h4>Something went Wrong</h4>"; 
    console.log('error');
  }
};
  postUser();
}
});

// GETTING DATA FROM CRUD CRUD REST API
async function fetchUser() {
  const res = await fetch('https://crudcrud.com/api/f86429d8166341458a9a6c7ffbfe1143/expenseTracker');
  const data = await res.json();
  console.log(data);
  data.forEach((key) => {
        console.log(key);
        addNewLineElement(key);
  }
 )};
fetchUser();

// SHOWING DATA ON WINDOW SCREEN
  function addNewLineElement(object) {
  const ul = document.getElementById("ExpenseItem");
  const li = document.createElement("li");
  li.appendChild(
    document.createTextNode( " Rs. " + object.cost + " " + object.description + " " + object.category + " ")
  );
  
  // CREATEING EDIT BUTTON 
  const ebtn = document.createElement("input");
  ebtn.id = "ExpenseEditBtn";
  ebtn.type = "button";
  ebtn.value = "Edit Expense";
  li.appendChild(ebtn);

  ebtn.addEventListener("click", () => {
  document.getElementById("cost").value = object.cost;
  document.getElementById("movie").value = object.description;
  document.getElementById("selectList").value = object.category;

    // EDITING USER 
    async function EditUser(){
    const edit = await axios.delete(`https://crudcrud.com/api/f86429d8166341458a9a6c7ffbfe1143/expenseTracker/${object._id}`)
    try {
      console.log(edit);
    }  
    catch(error){
      console.log(error);
    }
    }
    EditUser();
    li.remove();
    });
  
  // CREATING DELETE BUTTON
  const delBtn = document.createElement("input");
  delBtn.id = "ExpenseDeleteBtn"
  delBtn.type = "button";
  delBtn.value = "Delete Expense";
  li.appendChild(delBtn);

  // DELETE USER 
  delBtn.addEventListener("click", () => {
    async function deleteUser() {
      try {
        const del = await axios.delete(`https://crudcrud.com/api/f86429d8166341458a9a6c7ffbfe1143/expenseTracker/${object._id}`)
        console.log(del);
      }  
      catch(error) {
        console.log(error);
      }
    }
  deleteUser();
  li.remove();
  });
  
  // ADDING UL ELEMENT 
  ul.appendChild(li);
}
