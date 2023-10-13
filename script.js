"use strict";

const createContactButton = document.getElementById('createContactButton');
const clearListButton = document.getElementById('clearListButton');

function validateInput(event) {
	const targetParent = event.target.parentNode;
	const textFields = targetParent.querySelectorAll('input[type="text"], input[type="tel"]');

	// Remove any previous error messages
	if (targetParent.querySelector('.errorMessage')) {
		targetParent.querySelector('.errorMessage').remove();
	}
	
	// Check for empty text fields
	for (const textField of textFields) {
		if (!textField.value) {
			console.log(`Text field '${textField.id}' / '${textField.className}' is empty`);

			let errorMessage = document.createElement('p');
			errorMessage.className = 'errorMessage';
			errorMessage.innerText = 'Kontakter får inte innehålla tomma fält';
			targetParent.appendChild(errorMessage);

			return false;
		}
	}
}

function createContact(event) {
	event.preventDefault();

	// Validate text fields, cancel if any are empty
	if (validateInput(event) === false) {
		return;
	}

	const createContactName = document.getElementById('createContactName');
	const createContactPhone = document.getElementById('createContactPhone');
	const contactList = document.getElementById('contactList');

	const listItem = document.createElement('li');
	listItem.innerHTML =
	`
		<input type="text" class="contactName" value="${createContactName.value}" disabled>
		<input type="tel" class="contactPhone" value="${createContactPhone.value}" disabled>
		<input type="button" class="editContactButton" value="Ändra">
		<input type="button" class="saveContactButton" value="Spara" hidden>
		<input type="button" class="deleteContactButton" value="Radera">
	`;
	listItem.getElementsByClassName('editContactButton')[0].addEventListener('click', toggleEditContact);
	listItem.getElementsByClassName('saveContactButton')[0].addEventListener('click', toggleEditContact);
	listItem.getElementsByClassName('deleteContactButton')[0].addEventListener('click', deleteContact);
	contactList.appendChild(listItem);

	console.log(`Created contact with name '${createContactName.value}' and phone number '${createContactPhone.value}'`);
}

function toggleEditContact(event) {
	const targetListItem = event.target.parentNode;

	// Validate text fields, cancel if any are empty
	if (validateInput(event) === false) {
		return;
	}

	// Toggle booleans
	targetListItem.children[0].disabled = !targetListItem.children[0].disabled;
	targetListItem.children[1].disabled = !targetListItem.children[1].disabled;
	targetListItem.children[2].hidden = !targetListItem.children[2].hidden;
	targetListItem.children[3].hidden = !targetListItem.children[3].hidden;

	targetListItem.children[0].disabled
		? console.log(`Saved contact '${targetListItem.children[0].value}'`)
		: console.log(`Edit mode enabled on contact '${targetListItem.children[0].value}'`)
	;
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