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
    
 //posting objects to cru crud rest API
     axios.post("https://crudcrud.com/api/b8f28564823d487cac624ee99a2f030f/expenseTracker",  object)
    .then((response) => {
       addNewLineElement(response.data);
       console.log(response.data)
     })
     .catch((err)=> {
       document.body.innerHTML = document.body.innerHTML ="<h4>Something went Wrong</h4>"; 
       console.log(err)
     })
 }
});

//getting array of object from crud crud
axios.get("https://crudcrud.com/api/b8f28564823d487cac624ee99a2f030f/expenseTracker")
.then((response) => {
    console.log(response.data);
    response.data.forEach((key) => {
    console.log(key);
    addNewLineElement(key);
    for(let i=0;i<response.data.length;i++)
    { 
      const para = document.createElement("p");
      para.setAttribute('id','uid');
      para.textContent = response.data[i]._id;
      document.body.appendChild(para).style.visibility="hidden";
    }
    });
});


  function addNewLineElement(object) {
    const ul = document.getElementById("ExpenseItem");
    const li = document.createElement("li");
    li.appendChild(
      document.createTextNode( object.cost + " " + object.description + " " + object.category + " ")
    );

    const vr = document.createElement("input");
    vr.id = "ExpenseBtn";
    vr.type = "button";
    vr.value = "Edit Expense";
    vr.addEventListener("click", () => {
      document.getElementById("cost").value = object.cost;
      document.getElementById("movie").value = object.description;
      document.getElementById("selectList").value = object.category;


      // Editing the objects of crud crud
      axios.delete(`https://crudcrud.com/api/b8f28564823d487cac624ee99a2f030f/expenseTracker/${object._id}`)
      .then((response) => {
        console.log(response);
      })  
      .catch((err) => {
        console.log(err);
      })
      li.remove();
    });
      li.appendChild(vr);
  
    const delBtn = document.createElement("input");
    delBtn.type = "button";
    delBtn.value = "Delete Expense";
    delBtn.addEventListener("click", () => {

      axios.delete(`https://crudcrud.com/api/b8f28564823d487cac624ee99a2f030f/${object._id}`)
      .then((response) => {
        console.log(response);
      })  
      .catch((err) => {
        console.log(err);
      })
      li.remove();
    });
    li.appendChild(delBtn);
    ul.appendChild(li);
  }
  