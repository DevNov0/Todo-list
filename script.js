// Item trida: Prvek ktery budeme pridavat do listu
class Item {
    constructor(title, text, itemid){
        this.title = title;
        this.text = text;
        this.itemid = itemid;
    }
}
//UI trida: Spravujeme zde vsechny potrebne eventy
class UI {

    //Metoda kde pracujeme v DOM a pridavame item jako radek do nasi tabulky
    static addItemToList(item){
        const list = document.querySelector("#todo-list");

        const row = document.createElement('tr');
        row.classList.add("itemClass")

        row.innerHTML = `
        <td>${item.title}</td>
        <td>${item.text}</td>
        <td>${item.itemid}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `; 

        list.appendChild(row);
    }

    //Event odstraneni itemu
    static deleteItem(el) {
      if(el.classList.contains('delete')) {
        //odstranujeme nadrazene elementy na druhe vrstve, abychom odstranili cely radek informaci
        el.parentElement.parentElement.remove();
      }      
    }

    //Po pridani tasku smazeme hodnoty inputu
    static clearInputs(){
        document.querySelector('#title').value = '';
        document.querySelector('#text').value = '';
        document.querySelector('#itemid').value = '';
    }

    //Kontrolujeme zda je formular vyplnen
    static required(){
        const x = document.forms["myform"]["titleName"].value;
        
        if(x == ""){
            alert("Titulek musi bzt vyplnen");
            return false;
        }
    }
        
    
   
}

//Event: Cekame klik na submit tlacitko a pak zavolame metodu "addItemToList" tridy "UI"
document.querySelector("#todo-form").addEventListener("submit", (e) => {

    //Prevent submit
    e.preventDefault();

    //Nacteme hodnoty z formulare
    const title = document.querySelector("#title").value;
    const text = document.querySelector("#text").value;
    const itemid = document.querySelector("#itemid").value;

    //Vytvorime instanci nasi tridy Item
    const item = new Item(title, text, itemid);

    //Pridame item do naseho UI
    UI.required();
    UI.addItemToList(item);
    UI.clearInputs();
    UI.checkForm();
    
    
 
});

//Event: pouzijeme event listener pro current target pro presne zjisteni elementu na ktery bylo kliknuto a na nej pouzijeme metodu deleteItem
document.querySelector("#todo-list").addEventListener("click", (e) => {
    UI.deleteItem(e.target)
    
});

