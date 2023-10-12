"use strict";

const createContactButton = document.getElementById('createContactButton');
const clearListButton = document.getElementById('clearListButton');

function createContact(event) {
	event.preventDefault();

	const createContactName = document.getElementById('createContactName');
	const createContactPhone = document.getElementById('createContactPhone');
	const contactList = document.getElementById('contactList');

	const listItem = document.createElement('li');
	listItem.innerHTML =
	`
		<input type="text" value="${createContactName.value}" disabled>
		<input type="text" value="${createContactPhone.value}" disabled>
		<input type="button" class="editContactButton" value="Ändra">
		<input type="button" class="saveContactButton" value="Spara" hidden>
		<input type="button" class="deleteContactButton" value="Radera">
	`;
	listItem.getElementsByClassName('editContactButton')[0].addEventListener('click', editContact);
	listItem.getElementsByClassName('saveContactButton')[0].addEventListener('click', saveContact);
	listItem.getElementsByClassName('deleteContactButton')[0].addEventListener('click', deleteContact);

	contactList.appendChild(listItem);

	console.log(`Created contact with name '${createContactName.value}' and phone number '${createContactPhone.value}'`);
}

function editContact(event) {
	const targetListItem = event.target.parentNode;

	targetListItem.children[0].disabled = false;
	targetListItem.children[1].disabled = false;
	targetListItem.children[2].hidden = true;
	targetListItem.children[3].hidden = false;

	console.log(`Edit mode enabled on contact '${targetListItem.children[0].value}'`);
}

function saveContact(event) {
	const targetListItem = event.target.parentNode;

	targetListItem.children[0].disabled = true;
	targetListItem.children[1].disabled = true;
	targetListItem.children[2].hidden = false;
	targetListItem.children[3].hidden = true;

	console.log(`Saved contact '${targetListItem.children[0].value}'`);
}

function deleteContact(event) {
	const targetListItem = event.target.parentNode;
	
	targetListItem.remove();

	console.log(`Deleted contact '${targetListItem.children[0].value}'`);
}

function clearList() {
	const listItems = document.querySelectorAll('#contactList li');

	console.log(`Deleting all contacts...`);

	for (const listItem of listItems) {
		listItem.remove();
		console.log(`Deleted contact '${listItem.children[0].value}'`);
	}

	console.log(`All contacts deleted`);
}

createContactButton.addEventListener('click', createContact);
clearListButton.addEventListener('click', clearList);