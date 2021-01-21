module.exports = new class DocumentationGenerator {

	config = {
		"tempalte": "1"
	}

	generate(routes, config = {}) {
		this.mergeConfig(config);
		var data = getRouteData(routes);
		this.generateDoc(data);
	}

	mergeConfig(config) {
		// TODO:
	}

	getRouteData(routes) {
		routes.forEach(el => {
			if (typeof el == "string") {
				data = extractDataFromRoute(el);
				data.file = el;
				el = data;
			} else {
				el = getRouteData(el);
			}
		});
		return routes;
	}

	extractDataFromRoute(filename) {
		var route = require(filename);
		if (route instanceof Route) {
			return route.get();
		}
		return {};
	}

	generateDoc(routes) {
		switch (this.config.tempalte) {
			case 'dark':
			default:
				require("./template/1/generate")(routes, this.config);
				break;
		}
	}

}