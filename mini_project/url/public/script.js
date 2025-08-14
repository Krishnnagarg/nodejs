let form = document.querySelector("#shorten-form");

form.addEventListener("submit" , (event) =>{
    event.preventDefault();

    const formData = new FormData(event.target);//creates a FormData obj
    const url = formData.get('url');//formData.get return first Value
    const shortCode = formData.get('shortCode');

    console.log(url , shortCode);

})