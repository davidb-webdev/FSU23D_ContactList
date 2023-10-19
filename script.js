'use strict';

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
			textField.parentNode.appendChild(errorMessage);

			return false;
		}
	}
}


function createContact(event) {
	event.preventDefault();

	// Validate text fields
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
		<input type="button" class="deleteContactButton" value="Radera">
	`;
	listItem.getElementsByClassName('editContactButton')[0].addEventListener('click', toggleEditContact);
	listItem.getElementsByClassName('deleteContactButton')[0].addEventListener('click', deleteContact);
	contactList.appendChild(listItem);

	console.log(`Created contact with name '${createContactName.value}' and phone number '${createContactPhone.value}'`);

	// Hide contact form
	toggleCreateContactForm();
}


function toggleEditContact(event) {
	const targetListItem = event.target.parentNode;

	// Validate text fields
	if (validateInput(event) === false) {
		return;
	}

	// Toggle edit mode
	targetListItem.children[0].disabled = !targetListItem.children[0].disabled;
	targetListItem.children[1].disabled = !targetListItem.children[1].disabled;

	if (targetListItem.children[2].value === 'Ändra') {
		targetListItem.children[2].value = 'Spara';
	} else {
		targetListItem.children[2].value = 'Ändra';
	}

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


function clearContactList() {
	const listItems = document.querySelectorAll('#contactList li');

	console.log(`Deleting all contacts...`);
	for (const listItem of listItems) {
		listItem.remove();
		console.log(`Deleted contact '${listItem.children[0].value}'`);
	}
	console.log(`All contacts deleted`);
}


function toggleCreateContactForm() {
	const createContactForm = document.getElementById('createContactForm');

	if (!createContactForm.classList.contains('hidden')) {
		const createContactName = document.getElementById('createContactName');
		const createContactPhone = document.getElementById('createContactPhone');

		// Reset form
		createContactName.value = '';
		createContactName.blur();
		createContactPhone.value = '';
		createContactPhone.blur();
		if (createContactForm.querySelector('.errorMessage')) {
			createContactForm.querySelector('.errorMessage').remove();
		}

		createContactForm.classList.add('hidden');
	} else {
		createContactForm.classList.remove('hidden');
	}

	console.log(`Contact form hidden? (${createContactForm.hidden})`);
}


// Event listeners
const toggleCreateContactButton = document.getElementById('toggleCreateContactButton');
const createContactButton = document.getElementById('createContactButton');
const clearContactListButton = document.getElementById('clearContactListButton');

toggleCreateContactButton.addEventListener('click', toggleCreateContactForm);
createContactButton.addEventListener('click', createContact);
clearContactListButton.addEventListener('click', clearContactList);

// Hide createContactForm on page load
// toggleCreateContactForm();