module.exports = new class DocumentationGenerator {

	config = {
		"tempalte": "1"
	}

	setConfig(config) {
		this.mergeConfig(config);
	}

	generate(routes) {
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

	}

}