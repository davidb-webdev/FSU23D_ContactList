"use strict";

const createContactButton = document.getElementById('createContactButton');

function createContact(event) {
	event.preventDefault();

	const createContactName = document.getElementById('createContactName');
	const createContactPhone = document.getElementById('createContactPhone');
	const contactList = document.getElementById('contactList');

	console.log('Name: ' + createContactName.value);
	console.log('Phone: ' + createContactPhone.value);

	const contactListItem = document.createElement('li');
	contactListItem.innerHTML =
	`
		<input type="text" value="${createContactName.value}" disabled>
		<input type="text" value="${createContactPhone.value}" disabled>
		<input type="button" class="editContactButton" value="Ändra">
		<input type="button" class="saveContactButton" value="Spara" hidden>
		<input type="button" class="deleteContactButton" value="Radera">
	`;
	contactListItem.getElementsByClassName('editContactButton')[0].addEventListener('click', editContact);
	contactListItem.getElementsByClassName('saveContactButton')[0].addEventListener('click', saveContact);
	contactListItem.getElementsByClassName('deleteContactButton')[0].addEventListener('click', deleteContact);

	contactList.appendChild(contactListItem);
}

function editContact(event) {
	const targetListItem = event.target.parentNode;
	console.log(`Edit mode enabled on contact ${targetListItem.children[0].value}`);

	targetListItem.children[0].disabled = false;
	targetListItem.children[1].disabled = false;
	targetListItem.children[2].hidden = true;
	targetListItem.children[3].hidden = false;
}

function saveContact(event) {
	const targetListItem = event.target.parentNode;

	targetListItem.children[0].disabled = true;
	targetListItem.children[1].disabled = true;
	targetListItem.children[2].hidden = false;
	targetListItem.children[3].hidden = true;

	console.log(`Saved contact ${targetListItem.children[0].value}`);
}

function deleteContact(event) {
	const targetListItem = event.target.parentNode;
	targetListItem.remove();
	console.log(`Contact ${targetListItem.children[0].value} deleted`);
}

createContactButton.addEventListener('click', createContact);