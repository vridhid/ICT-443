
var myItems = new Array();

var uniqueItemID = 10; 

var currentEditItem = -1;

var source;

var space = document.createElement('br');
var space1 = document.createElement('br');
var space2 = document.createElement('br');
var space3 = document.createElement('br');
var space4 = document.createElement('br');
var space5 = document.createElement('br'); 

function radioProcess(){
    
  //  var form_sel = document.getElementsByClassName('Form Box');
    var home_sel = document.getElementsByClassName('Home box');
    var work_sel = document.getElementsByClassName('Work box');
    var school_sel = document.getElementsByClassName('School box');
    var other_sel = document.getElementsByClassName('Else box');
    
    var radio_sel;

    
   document.getElementById('Form Box').style.display = 'block';

    
    if (document.getElementById('Home').checked) {
        radio_sel = document.getElementById('Home').value;
        for (var i=0; i<home_sel.length; i+=1){
            home_sel[i].style.display = 'block';
            work_sel[i].style.display = 'none';
            school_sel[i].style.display = 'none';
            other_sel[i].style.display = 'none';
        } 
    } else if (document.getElementById('Work').checked) {
        radio_sel = document.getElementById('Work').value;
        for (var i=0; i<work_sel.length; i+=1){
            home_sel[i].style.display = 'none';
            work_sel[i].style.display = 'block';
            school_sel[i].style.display = 'none';
            other_sel[i].style.display = 'none';
        }
    } else if (document.getElementById('School').checked) {
        radio_sel = document.getElementById('School').value;
        for (var i=0; i<school_sel.length; i+=1){
            home_sel[i].style.display = 'none';
            work_sel[i].style.display = 'none';
            school_sel[i].style.display = 'block';
            other_sel[i].style.display = 'none';
        }
    } else if (document.getElementById('Else').checked) {
        radio_sel = document.getElementById('Else').value;
        for (var i=0; i<other_sel.length; i+=1){
            home_sel[i].style.display = 'none';
            work_sel[i].style.display = 'none';
            school_sel[i].style.display = 'none';
            other_sel[i].style.display = 'block';
        } }
    
    console.log(radio_sel);

    }

function addItem(frm) {
    
	var itemName,ItemCount,itemType,itemOrder,itemCat;
    
	itemName = document.getElementById("nameTxt").value;
    itemCount = document.getElementById("countTxt").value;
	itemType = document.getElementById("typeTxt").value;
	itemOrder = document.getElementById("orderTxt").value;
    itemCat = document.getElementById("catTxt").value;
	
	
	// create work, home, school or other task 
	
	var myItem;
	
	if(itemType == "Work") {
		myItem = new workItem("work");
    } else if (itemType == "Home") {
        myItem = new homeItem("home"); 
    } else if (itemType == "School") {
        myItem = new schoolItem("school");   
	} else {
		myItem = new otherItem();
	}
	
			
	myItem.itemName = itemName;
	myItem.itemCount = itemCount;
	myItem.uniqueID = uniqueItemID;
	myItem.itemOrder = itemOrder;
    myItem.itemCat = itemCat;
	
	//add the newly created myItem instance to the myItems global array. 
	myItems.push(myItem);

	orderItemsArray();
	console.log(myItems);
	
	uniqueItemID++;
	
	return false;
}

//define custom object Item

function Item(name,count,order,cat) {
	this.itemName = "";
	this.itemCount = "";
	this.uniqueID = "";
	this.itemOrder = "";
    this.itemCat = "";
}


function workItem(category) {
	this.itemType = "Work";
	this.category = category;
}

function homeItem(category) {
	this.itemType = "Home";
	this.category = category;
}

function schoolItem(category) {
	this.itemType = "School";
	this.category = category;
}

function otherItem() {
	this.itemType = "Other";
	this.optional = "yes";
}

//create inheritance relationship between footItem and otherItem from parent Item
workItem.prototype = new Item();
homeItem.prototype = new Item();
schoolItem.prototype = new Item();
otherItem.prototype = new Item();


function addItemToDom(itm) {
	var itemDiv = document.createElement("DIV");
	
	itemDiv.setAttribute("style","border:1px solid black; border-radius:15px; padding-left:15px; font-size: 17px; padding-top:10px; width:200px; height:170px;");
	itemDiv.setAttribute("id",itm.uniqueID);
	
		//set the attributes to make the div tag draggable
				
		itemDiv.setAttribute("draggable","true");
		itemDiv.setAttribute("ondragstart","dragStarted(event)");
		itemDiv.setAttribute("ondragover","draggingOver(event)");
		itemDiv.setAttribute("ondrop","dropped(event)");
	
	
	var nameTxt,countTxt,typeTxt,br, deleteLink, editLink,orderTxt;
	
	nameTxt = document.createTextNode("Task Name: " + itm.itemName );
    
	countTxt = document.createTextNode("Task Description: " + itm.itemCount);
    
	typeTxt = document.createTextNode("Category: " + itm.itemType);
    
	orderTxt = document.createTextNode("Urgency: " + itm.itemOrder);
    
    catTxt = document.createTextNode("Task Date: " + itm.itemCat);
	
	
	br = document.createElement("DIV");
    br.setAttribute("style","height:5px;width:30px;")
	
	
	 //delete link
                
      deleteLink = document.createElement("A");
      deleteLink.setAttribute("href",("javaScript:deleteItem(" + itm.uniqueID + ")"));
      deleteLink.innerHTML = "Delete Item";
	
	
	 //edit link
                
      editLink = document.createElement("A");
      editLink.setAttribute("href",("javaScript:editItem(" + itm.uniqueID + ")"));
      editLink.innerHTML = "Edit Item";
	
	
	itemDiv.appendChild(nameTxt);
	itemDiv.appendChild(br);
    
    itemDiv.appendChild(space);
	
	itemDiv.appendChild(countTxt);
	itemDiv.appendChild(br);
    
    itemDiv.appendChild(space1);
    
	itemDiv.appendChild(typeTxt);
	itemDiv.appendChild(br);
    
    itemDiv.appendChild(space2);
	
	itemDiv.appendChild(orderTxt);
	itemDiv.appendChild(br);
    
    itemDiv.appendChild(space3);

	itemDiv.appendChild(catTxt);
	itemDiv.appendChild(br);
    
    itemDiv.appendChild(space4);

    itemDiv.appendChild(br);
    itemDiv.appendChild(deleteLink);
        
    itemDiv.appendChild(br);
    itemDiv.appendChild(editLink);
                
	
	var shoppingListDiv = document.getElementById("shoppingListDiv");
	shoppingListDiv.appendChild(itemDiv);	
}


function deleteItem(id) {
	
	//traverse through the array and look for the item with id that was passed in
	
	console.log("before delete");
	console.log(myItems);
	
	for(var i = 0; i < myItems.length; i++) {
        
        var item = myItems[i];
        
        if(item.uniqueID == id) {
            
            myItems.splice(i,1);
							
				 //now delete the associated div
                
                var itemDiv = document.getElementById(id)
                var shoppingListDiv = document.getElementById("shoppingListDiv");
                shoppingListDiv.removeChild(itemDiv);
				
				break;
				
			}
		}	
	
	console.log("after delete");
	console.log(myItems);
	
	orderItemsArray();
}


function editItem(id) {
	
	var item;
	
	currentEditItem = id;
	
	for(var i = 0; i < myItems.length; i++) {
			item = myItems[i];

			if(item.uniqueID == id) {
				
				break;
				
			}
		}
		
		document.getElementById("nameTxt").value = item.itemName;
        document.getElementById("typeTxt").value = item.itemType ;
        document.getElementById("countTxt").value = item.itemCount;
		document.getElementById("orderTxt").value = item.itemOrder;
		document.getElementById("catTxt").value = item.itemCat;

}



function updateItem() {
	
	for(var i = 0; i < myItems.length; i++) {
			item = myItems[i];


			if(item.uniqueID == currentEditItem) {
				
				var itemName,itemType,ItemCount,itemOrder,itemCat;
                
                itemName = document.getElementById("nameTxt").value;
                itemType = document.getElementById("typeTxt").value;
                itemCount = document.getElementById("countTxt").value;
				itemOrder = document.getElementById("orderTxt").value;
                itemCat = document.getElementById("catTxt").value;
				
                                                
                myItems[i].itemName = itemName;
                myItems[i].itemType = itemType;
                myItems[i].itemCount = itemCount;
				myItems[i].itemOrder = itemOrder;
                myItems[i].itemCat = itemCat;
				
				
				//update the dom
				
				oldItemDiv = document.getElementById(currentEditItem);
            	
                var itemDiv = document.createElement("DIV");
                
                itemDiv.setAttribute("style","border:1px solid black; width:200px;height:170px;");
                
                var nameTxt,countTxt,typeTxt,br,uniqueIDTxt,deleteLink,editLink;
                
                nameTxt = document.createTextNode("Task Name: " + item.itemName); 
                
                countTxt = document.createTextNode("Task Description: " + item.itemCount);
                
                typeTxt = document.createTextNode("Category: " + item.itemType);
                
                orderTxt = document.createTextNode("Item Order: " + item.itemOrder);
                
                catTxt = document.createTextNode("Task Date: " + item.itemCat);
                
				uniqueIDTxt = document.createTextNode("Unique ID : " + item.uniqueID);
                
                
                //delete link
                
                deleteLink = document.createElement("A");
                deleteLink.setAttribute("href",("javaScript:deleteItem(" + item.uniqueID + ")"));
                deleteLink.innerHTML = "Delete Item";
                
                //edit link
                
                editLink = document.createElement("A");
                editLink.setAttribute("href",("javaScript:editItem(" + item.uniqueID + ")"));
                editLink.innerHTML = "Edit Item";
                           
                 
                br = document.createElement("DIV");
                br.setAttribute("style","height:5px;width:30px;")
                                
                itemDiv.appendChild(nameTxt);
                itemDiv.appendChild(br);
                
                itemDiv.appendChild(space);
                
                itemDiv.appendChild(countTxt);
                itemDiv.appendChild(br);
                
                itemDiv.appendChild(space1);
                
                itemDiv.appendChild(typeTxt);
                itemDiv.appendChild(br);
                
                itemDiv.appendChild(space2);
				
				itemDiv.appendChild(orderTxt);
                itemDiv.appendChild(br);
                
                itemDiv.appendChild(space3);
				
                itemDiv.appendChild(catTxt);
                itemDiv.appendChild(br);
                
                itemDiv.appendChild(space4);
                
                itemDiv.appendChild(uniqueIDTxt);
                itemDiv.appendChild(br);
                
                itemDiv.appendChild(space5);
                
                itemDiv.appendChild(br);
                itemDiv.appendChild(deleteLink);
                                
                itemDiv.appendChild(br);
                itemDiv.appendChild(editLink);
                
                
                itemDiv.setAttribute("id",item.uniqueID);
				
				//set the attributes to make the div tag draggable
				
				itemDiv.setAttribute("draggable","true");
				itemDiv.setAttribute("ondragstart","dragStarted(event)");
				itemDiv.setAttribute("ondragover","draggingOver(event)");
				itemDiv.setAttribute("ondrop","dropped(event)");
				

                var shoppingListDiv = document.getElementById("shoppingListDiv");
                
                shoppingListDiv.replaceChild(itemDiv,oldItemDiv);
                
				
				console.log("after update");
				console.log(myItems);

				break;
				
			}
		}
	
	orderItemsArray();
}



function orderItemsArray() {
	
	//order the array
	myItems.sort(function(a,b){return a.itemOrder - b.itemOrder});
	
	//order the dom
	
	var shoppingListDiv = document.getElementById("shoppingListDiv");
	
	// console.log(shoppingListDiv.hasChildNodes());
	
	while(shoppingListDiv.hasChildNodes()) {
		shoppingListDiv.removeChild(shoppingListDiv.childNodes[0]);	
	}
	
	for(var i = 0; i < myItems.length; i++)	{
			addItemToDom(myItems[i]);
		}
}

function saveList1(){
    
    console.log ("Saved to Local Storage");
    saveList();
}

function saveList() {
    
	var myItemsJSON = JSON.stringify(myItems);
	localStorage.savedList = myItemsJSON;

}


// Functions for drag and drop

function dragStarted(evt) {
	//which element is being dragged
	
	source = evt.target;
	
	//set the data to be dragged (the html code of the div element)
	
	evt.dataTransfer.setData("text/plain",evt.target.innerHTML);
	
	//specify what effects are allowed
	
	evt.dataTransfer.effectAllowed = "move";
	
}


function draggingOver(evt) {
	//prevent default action such as highlight text during dragStarted
	
	evt.preventDefault();
	
	//specify what we are during with dragOver
	
	evt.dataTransfer.dropEffect = "move";
	
}


function dropped(evt) {
	evt.preventDefault();
	
	var saveSourceID = source.id;
	
	source.innerHTML = evt.target.innerHTML;
	source.id = evt.target.id;
	
	
	evt.target.innerHTML = evt.dataTransfer.getData("text/plain");
	evt.target.id = saveSourceID;
	
	
	saveOrder();
}

function saveOrder() {
	
	//get reference to the container div that contains all the items
	var container=document.getElementById("shoppingListDiv");
	
	
	//get all the items that are child divs inside the shoppingListDiv. 
	var items = container.querySelectorAll("div");
	
	var itemsArray = new Array();
	
	for(var i = 0; i < items.length; i++) {
		//itemsArray[i] = {"id":items[i].id, "html":tasks[i].innerHTML};
		
		for(var j = 0; j < myItems.length; j++) {
			if(myItems[j].uniqueID == items[i].id) {
				myItems[j].itemOrder = i;
			}
			
		}
		
	}
	
	myItems.sort(function(a,b){return a.itemOrder - b.itemOrder})
}


function deleteAll(){
    
	myItems.length = 0;
    // console.log(myItems.length);
		
	var visibileItems = document.getElementById("shoppingListDiv");
    
    
	if (myItems.length == 0){
		document.getElementById("shoppingListDiv").remove("*");
        
        /* 
        var myWindow = window.open("", "MsgWindow", "width=100,height=100");
		myWindow.document.write("<p> To add tasks to list, close this window and refresh the page. </p>");
		document.write("Double-click on Add-item to start adding tasks!");
	*/
    }
    saveList();
    
    localStorage.clear();
    console.log ("Local storage has been cleared");
    show_LS();

}

function show_LS(){
    console.log(localStorage);
}

function showHome(){
    document.getElementById('Form Box').style.dispay = "block";
    
}