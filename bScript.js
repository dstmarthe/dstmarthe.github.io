const domContainer = document.querySelector("#projInfo");
const linkList = document.querySelectorAll(".project-tile");
var infoPara = document.createElement("p")
infoPara.id = "mblInfo";
const searchQueryURL = "https://api.github.com/users/dstmarthe/repos";
domContainer.innerHTML =
	"Mouse over a project to see a description, then click to visit each site.";
//Paint Worklets from Houdini, only bytemare is in use
CSS.paintWorklet.addModule("houdini-static-gradient/worklet.js");
CSS.paintWorklet.addModule("bytemare/bytemare.js");

//Hover function for each project link
function hover(element, enter, leave) {
	element.forEach((link) => link.addEventListener("mouseenter", enter));
	element.forEach((link) => link.addEventListener("mouseleave", leave));
}
//node takes number from function call in html
var node;
function changeNode(num) {
	node=+num;
}
//Toggle repo information for mobile
var v = function toggle_visibility() {
	//If there is more than one p child delete inforPara, else add it
	if (this.querySelectorAll("p").length >= 1){
	infoPara.remove();
	} else {
	this.append(infoPara)}
	getRepo(node, infoPara)
}

//Add event listeners to the project tiles, triggering toggle_visibility
function mobileClick(el)  {
	el.forEach((link) => link.addEventListener("click", v, false));
}
//Will be invoked to remove listeners on desktop
function removeClick(el) {
	el.forEach((link) => link.removeEventListener('click', v, false));	
}

function removeHover(element, enter, leave) {
	element.forEach((link) => link.removeEventListener("mouseenter", enter));
	element.forEach((link) => link.removeEventListener("mouseleave", leave));
}

function mediaQ(x) {
	if (x.matches) { // If media query matches attach mobile function
		mobileClick(linkList)
		removeHover(linkList)
	} else {
		removeClick(linkList)
		hover(                //Invoke hover for desktop
			linkList,
			(e) => {
				// On hover
				getRepo(node, domContainer);
			},
			(e) => {
				// On exit hover
				domContainer.innerHTML = "";
			}
		);
	}
  }
  //Keeps track of window size
  var x = window.matchMedia("(max-width: 760px)")
  mediaQ(x) // Call listener function at run time
  x.addEventListener("change", mediaQ) // Attach listener function on state changes

async function getRepo(num, container) {
	//Get repo info by index
	fetch(searchQueryURL)
		.then((result) => result.json())
		.then((response) => {
			//Returm name and description of repo by index
			container.innerHTML = `<em>Name:</em> ${response[num].name.replace(
				"-",
				" "
			)}
			\<br/ > <br/ > <em>Description:</em> ${response[num].description}`;
		})
		.catch((err) => console.log(err));
}

document.addEventListener('DOMContentLoaded', () => {

	// Get all "navbar-burger" elements
	const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
	// Check if there are any navbar burgers
	if ($navbarBurgers.length > 0) {
  
	  // Add a click event on each of them
	  $navbarBurgers.forEach( el => {
		el.addEventListener('click', () => {
  
		  // Get the target from the "data-target" attribute
		  const target = el.dataset.target;
		  const $target = document.getElementById(target);
  
		  // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
		  el.classList.toggle('is-active');
		  $target.classList.toggle('is-active');
  
		});
	  });
	}
  });