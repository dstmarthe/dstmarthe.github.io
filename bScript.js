
const domContainer = document.querySelector("#projInfo");
var linkList = document.querySelectorAll(".project-tile");
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


function toggle_visibility(el) {
	infoPara = document.createElement("p")
	infoPara.id = "mblInfo"
	if (this){}

	else {
	el.appendChild(infoPara)}
}

async function getRepo(num) {
	//Get repo info by index
	fetch(searchQueryURL)
		.then((result) => result.json())
		.then((response) => {
			//Returm name and description of repo by index
			domContainer.innerHTML = `<em>Name:</em> ${response[num].name.replace(
				"-",
				" "
			)}
			\<br/ > <br/ > <em>Description:</em> ${response[num].description}`;
		})
		.catch((err) => console.log(err));
}

//node takes number from function call in html
var node;
function changeNode(num) {
	node=+num;
}

hover(
	linkList,
	(e) => {
		// On hover
		getRepo(node);
	},
	(e) => {
		// On exit hover
		domContainer.innerHTML = "";
	}
);
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