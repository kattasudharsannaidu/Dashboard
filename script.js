window.addEventListener('load', () => {
	initialise();
})

function initialise() {
	const body = document.querySelector("body");
	const leftPane = document.querySelector("div.left-pane");
	const centerPane = document.querySelector("div.center-pane");
	const searchBox = document.querySelector("input.search");

	buildLeftPane();
	buildCenterPane(config["Jivox"]);
	initializeEventListeners();

	function buildLeftPane() {
		const markup = getLeftPaneMarkup();
		leftPane.innerHTML = markup;
	}

	function getLeftPaneMarkup() {
		return `
		<ul class="menu-container">
			${Object.keys(config).map(menuItem => {
				return `<li class="menu-item" data-variant="menu-item" data-name="${menuItem}">${menuItem}</li>`
			}).join('')}
		</ul>
	`
	}

	function buildCenterPane(items) {
		const markup = getCenterPaneMarkup(items);
		centerPane.innerHTML = markup;
	}

	function getCenterPaneMarkup(items) {
		if(items.length === 0) return '';
		return `
			<ul class="link-buttons-container">
				${items.map(item => (
					`<li class="link-button">
						<a class="link" href=${item.link}>${item.label}</a>
					</li>`
				)).join("")}
			</ul>
		`
	}

	function initializeEventListeners() {
		searchBox.addEventListener('input', (event) => onSearch(event.target.value));
		document.addEventListener('click', (event) => {
			if(event.target.getAttribute("data-variant") !== "menu-item") return;
			onMenuItemClick(event.target.getAttribute("data-name"));
		})
	}

	function onSearch(value) {
		let items = [];
		if (value.trim() === '') { 
			items = config['Jivox'];
		} else {
			items = Object.values(config).reduce((previousValue, arr) => {
				return [...previousValue, ...arr.filter(obj => obj.label.toLowerCase().includes(value.toLowerCase()))]
			}, []);
		}
		const markup = getCenterPaneMarkup(items);
		centerPane.innerHTML = markup;
	}

	function onMenuItemClick(menuItem) {
		const [ _, items ] = Object.entries(config).find(([key]) => key === menuItem );
		const markup = getCenterPaneMarkup(items);
		centerPane.innerHTML = markup;
	}
}