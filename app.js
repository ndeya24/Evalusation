//Document est le DOM accessible dans la console avec document.window.
// L'arbre est du haut, html, corps, p etc.

//Problème : L'interaction de l'utilisateur ne fournit pas les résultats corrects.
//Solution: Add interactivity so the user can manage daily tasks.
//Solution : Ajouter de l'interactivité pour que l'utilisateur puisse gérer les tâches quotidiennes.

//La gestion des événements, sous l'interaction, est ce qui démarre l'exécution du code.

var taskInput=document.getElementById("new-task");//Ajouter une nouvelle tâche.
var addButton=document.getElementsByTagName("button")[0];//premier bouton
var incompleteTaskHolder=document.getElementById("incomplete-tasks");//ul de tâches incomplètes
var completedTasksHolder=document.getElementById("completed-tasks");//tâches terminées


//Nouvel élément de la liste des tâches
var createNewTaskElement=function(taskString){

	var listItem=document.createElement("li");

	//saisie (case à cocher)
	var checkBox=document.createElement("input");//case à cocher
	//label
	var label=document.createElement("label");//étiqueter
	//Texte de saisie)
	var editInput=document.createElement("input");//texte
	
	//bouton.modifier

	var editButton=document.createElement("button");//modification button

	//boutton supprimer
	var deleteButton=document.createElement("button");//supprimer boutton

	label.innerText=taskString;

	//Chaque élément doit être ajouté
	checkBox.type="checkbox";
	editInput.type="text";

	editButton.innerText="Edit";//Le texte interne en code les caractères spéciaux, pas le HTML.
	editButton.className="edit";
	deleteButton.innerText="Delete";
	deleteButton.className="delete";



	//et en annexe.
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	return listItem;
}



var addTask=function(){
	console.log("Add Task...");
	//Créez un nouvel élément de liste avec le texte de la nouvelle tâche :
	var listItem=createNewTaskElement(taskInput.value);

	//Ajouter un élément de liste au titulaire de tâche incomplet
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	taskInput.value="";

}

//Modifier une tâche existante.

var editTask=function(){
console.log("Edit Task...");
console.log("Change 'edit' to 'save'");


var listItem=this.parentNode;

var editInput=listItem.querySelector('input[type=text]');
var label=listItem.querySelector("label");
var containsClass=listItem.classList.contains("editMode");
		//Si la classe du parent est en mode édition
		if(containsClass){

		//passer en mode édition
		//label devient la valeur d'entrée.
			label.innerText=editInput.value;
		}else{
			editInput.value=label.innerText;
		}

		//basculer le mode d'édition sur le parent.
		listItem.classList.toggle("editMode");
}




//Supprimer la tâche.
var deleteTask=function(){
		console.log("Delete Task...");

		var listItem=this.parentNode;
		var ul=listItem.parentNode;
		//Supprimez l'élément de liste parent de l'ul.
		ul.removeChild(listItem);

}


//Marquer la tâche comme terminée
var taskCompleted=function(){
		console.log("Complete Task...");
	
	//Append the task list item to the #completed-tasks
	var listItem=this.parentNode;
	completedTasksHolder.appendChild(listItem);
				bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
		console.log("Incomplete Task...");
//Marquer la tâche comme incomplète.
	//Lorsque la case est décochée
		//Ajoutez l'élément de la liste des tâches aux tâches incomplètes.
		var listItem=this.parentNode;
	incompleteTaskHolder.appendChild(listItem);
			bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
	console.log("AJAX Request");
}

//La colle pour maintenir le tout ensemble.


//Définissez le gestionnaire de clic sur la fonction d'ajout de tâche.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
	console.log("bind list item events");
//sélectionner les éléments de liste enfants
	var checkBox=taskListItem.querySelector("input[type=checkbox]");
	var editButton=taskListItem.querySelector("button.edit");
	var deleteButton=taskListItem.querySelector("button.delete");


			//Lier la tâche de modification au bouton de modification.
			editButton.onclick=editTask;
			//Lier supprimer la tâche pour supprimer le bouton.
			deleteButton.onclick=deleteTask;
			//Tâche de liaison terminée pour cocher le gestionnaire d'événements de la case.
			checkBox.onchange=checkBoxEventHandler;
}

//parcourir les éléments incomplets de la liste ul du titulaire de la tâche
	//pour chaque élément de la liste
	for (var i=0; i<incompleteTaskHolder.children.length;i++){

		//lier des événements à des éléments de liste enfants (tâches terminées)
		bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
	}




//cycle sur les tâches terminées Titulaire ul éléments de la liste
	for (var i=0; i<completedTasksHolder.children.length;i++){
	//lier des événements aux éléments de la liste chldren (tâches incomplètes)
		bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
	}




	+
// Les problèmes d'utilisation ne sont pas visibles tant qu'ils ne sont pas devant un testeur humain.
//empêcher la création de tâches vides.

//Changez d'édition pour enregistrer lorsque vous êtes en mode édition.