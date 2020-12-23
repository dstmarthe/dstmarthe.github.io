const domContainer = document.querySelector("#projInfo");
var linkList = document.querySelectorAll(".project-tile");
const searchQueryURL = "https://api.github.com/users/dstmarthe/repos";
domContainer.innerHTML =
	"Mouse over a project to see a description, then click to visit each site.";
CSS.paintWorklet.addModule("houdini-static-gradient/worklet.js");
CSS.paintWorklet.addModule("bytemare/bytemare.js");


function hover(element, enter, leave) {
	element.forEach((link) => link.addEventListener("mouseenter", enter));
	element.forEach((link) => link.addEventListener("mouseleave", leave));
}

async function getRepo(num) {
	//get repo info by index
	fetch(searchQueryURL)
		.then((result) => result.json())
		.then((response) => {
			//returm name and description of repo by index
			domContainer.innerHTML = `<em>Name:</em> ${response[num].name.replace(
				"-",
				" "
			)}
			\<br/ > <br/ > <em>Description:</em> ${response[num].description}`;
		})
		.catch((err) => console.log(err));
}

var node;
function changeNode(num) {
	node = +num;
}
hover(
	//call Hover function
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
