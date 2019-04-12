/*
 * JavaScript for the index.HTML: 
 * Handles page and the validation of the elements.
 *
 * Script: script.js
 * Author: Hyunseung Kim (Glenn)
 * Version: 1.0
 * Date Created: 2019-04-10
 * Last Updated: 2019-04-10
 *
 */

// Add the event listener for the document load
document.addEventListener("DOMContentLoaded", load);

/**
 * Handles the load event of the document.
 */
function load() 
{
	//Section
	let homeSection    = document.getElementById("home_section");
	let serviceSection = document.getElementById("service_section");
	let contactSection = document.getElementById("contact_section");

	hideErrors();

	itemAddEventListener();

	//Default section setting. Welcomepage shows.
	homeSection.style.display    = "block";
	serviceSection.style.display = "none";
	contactSection.style.display = "none";
}
/*
 * Hide all section before showing selected page 
 */
function pageChanging(pageName) 
{
	//Remove all the section from display.
	var sectionList = document.getElementsByTagName("section");
	for(let i=0; i<sectionList.length; i++)	{
		sectionList[i].style.display = "none";
	}
	
	//Display selected page only.
	document.getElementById(pageName+"_section").style.display	= "block";
}

/*
 * Hides all of the error elements.
 */
function hideErrors()
{
	var errorTag = document.getElementsByClassName("error");

	for(var i=0; i<errorTag.length; i++)
	{
		errorTag[i].style.display = "none";
	}
}

/*
 * Handles the reset event for the form.
 *
 * param e  A reference to the event object
 * return   True allows the reset to happen; False prevents
 *          the browser from resetting the form.
 */
function resetForm(e)
{
	// Confirm that the user wants to reset the form.
	if ( confirm('Clear order?') )
	{
		// Ensure all error fields are hidden
		hideErrors();
		
		// Set focus to the first text field on the page
		document.getElementById("qty1").focus();
		
		// When using onReset="resetForm()" in markup, returning true will allow
		// the form to reset
		return true;
	}

	// Prevents the form from resetting
	e.preventDefault();
	
	// When using onReset="resetForm()" in markup, returning false would prevent
	// the form from resetting
	return false;	
}

/*
 * Add item event listener.
 */
function itemAddEventListener()
{
	//Event Listener for the main form submission
	let submitForm = document.getElementById("submit");
	submitForm.addEventListener("click", validate);

	//Event Listener for the clear button
	let resetForm = document.getElementById("reset");
	resetForm.addEventListener("click", resetForm);
	
	let homePage    = document.getElementById("home_page");
	homePage.addEventListener("click",function(){pageChanging("home")});

	let servicePage = document.getElementById("service_page");
	servicePage.addEventListener("click",function(){pageChanging("service")});

	let contactPage = document.getElementById("contact_page");
	contactPage.addEventListener("click",function(){pageChanging("contact")});
	
	let goHome = document.getElementById("go_home");
	goHome.addEventListener("click",function(){pageChanging("home")});
	
	let contactUs = document.getElementById("contact_us");
	contactUs.addEventListener("click",function(){pageChanging("contact")});
}

/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the event object
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e)
{
	hideErrors();

	if(formHasErrors())
	{
		e.preventDefault();
		return false;
	}

	return true;
}


/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors()
{
	var errorFlag = false;

	//Check name address city
	var requiredTextFields = ["fullname"];

	var currentItem;
	for(var i=0; i<requiredTextFields.length; i++)
	{
		currentItem = document.getElementById(requiredTextFields[i]);
		if(isEmpty(currentItem.value))
		{
			onAndOffErrorMsg(requiredTextFields[i]);
			if(!errorFlag)
			{
				currentItem.focus();
				currentItem.select();
			}

			errorFlag = true;
		}
	}
	
	var phoneNumber = document.getElementById("custphone");
	
	if(isEmpty(phoneNumber.value))
	{
		onAndOffErrorMsg("custphone");
		
		if(!errorFlag)
		{
			phoneNumber.focus();
			phoneNumber.select();
		}

		errorFlag = true;
	}
	
	var regExpPhone = new RegExp(/^\d{3}\-?\d{3}\-?\d{4}$/);
	if(!regExpPhone.test(phoneNumber.value))
	{
		onAndOffErrorMsg("custphoneformat");

		if(!errorFlag)
		{
			phoneNumber.focus();
			phoneNumber.select();
		}	

		errorFlag = true;
	}
	
	//Check email is empty
	var emailAddress = document.getElementById("email");

	if(isEmpty(emailAddress.value))
	{
		onAndOffErrorMsg("email");

		if(!errorFlag)
		{
			emailAddress.focus();
			emailAddress.select();
		}

		errorFlag = true;
	}

	//Check email is valid
	var regExpEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
	if(!regExpEmail.test(emailAddress.value))
	{
		onAndOffErrorMsg("emailformat");

		if(!errorFlag)
		{
			emailAddress.focus();
			emailAddress.select();
		}	

		errorFlag = true;
	}
	
	//Check comment is empty
	var comment = document.getElementById("otherdetails");

	if(isEmpty(comment.value))
	{
		onAndOffErrorMsg("otherdetails");

		if(!errorFlag)
		{
			comment.focus();
			comment.select();
		}

		errorFlag = true;
	}
	
 	return errorFlag;
}

/*
 * Check null, empty, undefined value.
 *
 * param variable The value to be checked.
 * return    True value will be returned, if the value is null, empty, or undefined.
 */
function isEmpty(variable) 
{
	return (variable == null || typeof variable == "undefined" || variable == "") ? true : false;
}

/*
 * Show or Hide error message.
 *
 * param1 tagId
 * param2 string of style command
 */
function onAndOffErrorMsg(tagId) 
{
	document.getElementById(tagId + "_error").style.display = "block";
}
