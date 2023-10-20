'use strict';

function validateInput(event) {
	const targetParent = event.target.parentNode;
	const textFields = targetParent.querySelectorAll('input[type="text"], input[type="tel"]');

	// Remove pre-existing error message (if any)
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
			textField.parentNode.insertBefore(errorMessage, textField.nextSibling);

			return false;
		}
	}
}


function createContact(event) {
	event.preventDefault();

	if (validateInput(event) === false) {return} // Validate text fields

	const createContactName = document.getElementById('createContactName');
	const createContactPhone = document.getElementById('createContactPhone');
	const contactList = document.getElementById('contactList');

	const listItem = document.createElement('li');
	listItem.innerHTML =
	`
		<input type="text" class="contactName" value="${createContactName.value}" aria-label="Contact name" disabled>
		<input type="tel" class="contactPhone" value="${createContactPhone.value}" aria-label="Phone number" disabled>
		<button class="editContactButton">
			<span class="shortLabel">✏️</span>
			<span class="longLabel">Ändra</span>
		</button>
		<button class="deleteContactButton">
			<span class="shortLabel">🗑️</span>
			<span class="longLabel">Radera</span>
		</button>
	`;
	listItem.querySelector('.editContactButton').addEventListener('click', toggleEditContact);
	listItem.querySelector('.deleteContactButton').addEventListener('click', deleteContact);
	contactList.appendChild(listItem);

	console.log(`Created contact with name '${createContactName.value}' and phone number '${createContactPhone.value}'`);

	toggleCreateContactForm(); // Hide contact form
}


function toggleEditContact(event) {
	const targetListItem = event.target.parentNode;

	if (validateInput(event) === false) {return} // Validate text fields

	if (targetListItem.classList.contains('editMode')) {
		targetListItem.classList.remove('editMode');
		event.target.innerHTML =
		`
			<span class="shortLabel">✏️</span>
			<span class="longLabel">Ändra</span>
		`;
	} else {
		targetListItem.classList.add('editMode');
		event.target.innerHTML =
		`
			<span class="shortLabel">💾</span>
			<span class="longLabel">Spara</span>
		`;
	}
	targetListItem.children[0].disabled = !targetListItem.children[0].disabled;
	targetListItem.children[1].disabled = !targetListItem.children[1].disabled;

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
	const createContactName = document.getElementById('createContactName');
	const createContactPhone = document.getElementById('createContactPhone');

	if (!createContactForm.classList.contains('hidden')) {
		createContactForm.classList.add('hidden');

		// Reset form
		createContactName.value = '';
		createContactName.blur();
		createContactPhone.value = '';
		createContactPhone.blur();
		if (createContactForm.querySelector('.errorMessage')) {
			createContactForm.querySelector('.errorMessage').remove();
		}
	} else {
		createContactName.focus();
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