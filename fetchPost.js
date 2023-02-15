const titleInput = document.querySelector("#title");
const bodyInput = document.querySelector("#body");
const postBtn = document.querySelector("#postBtn");
const heading = document.querySelector("#headingResult");
const output = document.querySelector("#output");
const editBtn = document.querySelector("#editBtn");
const deleteBtn = document.querySelector("#deleteBtn");
const saveBtn = document.querySelector("#saveBtn");

postBtn.addEventListener("click" , async(e)=>{
    e.preventDefault();

    if (titleInput.value === "" && bodyInput.value === "") {
        heading.innerHTML = "Please enter the credentials"
        output.innerHTML = ""
        return    
    }

    try {
      postBtn.disabled = true;
        const response =  await fetch('https://jsonplaceholder.typicode.com/posts' , {
            method: "POST", 
            headers : {
                'Content-type': 'application/json; charset=UTF-8',
                        },
            body : JSON.stringify({
                title: titleInput.value , 
                body : bodyInput.value , 
            })
        });

        const data = await response.json();
        heading.innerHTML = `The Title is <i><b>${data.title}</b></i>`        
        output.innerHTML = `The content is <i><b>${data.body}</b></i>`
        editBtn.hidden = false;
        deleteBtn.hidden = false;


          //ADDING DELETE BUTTON TO DELETE THE LOG

          const hideDeleteMessage = () => {
            setTimeout(() => {
              heading.innerHTML = "";
            }, 3000); 
          }

        deleteBtn.addEventListener("click", async (e) => {
            e.preventDefault();
          
            try {
              const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${data.id}`,{
                  method: "DELETE",
                }
              );
          
              if (response.ok) {
                heading.innerHTML = "The log is Deleted";
                output.innerHTML = "";
                deleteBtn.hidden = true;
                editBtn.hidden = true;
                titleInput.value= "";
                bodyInput.value = "";
                hideDeleteMessage();
              }
            } catch (error) {
              console.error("i am delete", error);
            }
          });

          //ADDING EDIT BUTTON TO EDIT THE LOG

          editBtn.addEventListener("click", (e) => {
            e.preventDefault();

            titleInput.value = data.title;
            bodyInput.value = data.body;
            editBtn.hidden = true;
            deleteBtn.hidden = true;
            saveBtn.hidden = false;
            saveBtn.disabled= false;
          
            saveBtn.addEventListener("click", async (e) => {
              e.preventDefault(); 
              try {
                saveBtn.disabled = true     
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts/1`,{
                // const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${data.id}`,{

                    method: "PUT",
                    headers: {
                      "Content-type": "application/json; charset=UTF-8",
                    },
                    body: JSON.stringify({
                      title: titleInput.value,
                      body: bodyInput.value,
                    }),
                  });
          
                const updatedData = await response.json();
                heading.innerHTML = `The Title is <i><b>${updatedData.title}</b></i>`;
                output.innerHTML = `The content is <i><b>${updatedData.body}</b></i>`;
                saveBtn.hidden= true;
                deleteBtn.hidden = false;
                editBtn.hidden = false;
                titleInput.value = updatedData.title;
                bodyInput.value = updatedData.body;
              } catch (error) {
                console.error(error);
              }
            });
          });

    } catch (error) {
        console.error( error);
        
    } finally {
        postBtn.disabled = false;
        saveBtn.disabled = false;
        titleInput.value= "" ;
        bodyInput.value= "" ;
        
    }
})



  


