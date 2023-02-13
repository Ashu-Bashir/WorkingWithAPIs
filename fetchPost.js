const titleInput = document.querySelector("#title");
const bodyInput = document.querySelector("#body");
const postBtn = document.querySelector("#postBtn");
const heading = document.querySelector("#headingResult");
const output = document.querySelector("#output");
let clicked = false;


postBtn.addEventListener("click" , async(e)=>{
    e.preventDefault();

    if (titleInput.value === "" && bodyInput.value === "") {
        heading.innerHTML = "Please enter the credentials"
        return    
    }

      if (clicked) {
        return;
      }
    clicked = true;
    try {
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


        
    } catch (error) {
        console.error( error);
        
    } finally {
        clicked = false;
        postBtn.disabled = false;
        titleInput.value= "" ;
        bodyInput.value= "" ;
    }
})




