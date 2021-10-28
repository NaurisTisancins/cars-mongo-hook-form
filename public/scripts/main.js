const listNode = document.getElementById('cars-list');

(async() => {
  
  try {
    const response = await fetch('/api/v1/cars');
    
    if(!response.ok) throw response;
    const data = await response.json();
    console.log(data);
    const frag = document.createDocumentFragment();
    for(const car of data) {
      const li = document.createElement('li');
      li.textContent = car.name;
      frag.append(li);
    }
    listNode.innerHTML="";
    listNode.append(frag);
  } catch (err) {
    console.log(err)
  }
  

})();