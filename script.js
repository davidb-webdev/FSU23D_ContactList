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
		<input type="button" value="Ändra">
		<input type="button" value="Radera">
	`;
	contactList.appendChild(contactListItem);
}

createContactButton.addEventListener('click', createContact);