const Route = require("@runtheons/router/Route");

module.exports = new class DocumentationGenerator {

	config = {
		"tempalte": "1"
	}

	generate(routes, config = {}) {
		this.mergeConfig(config);
		var data = this.getRouteData(routes);
		this.generateDoc(data);
	}

	mergeConfig(config) {
		// TODO:
	}

	getRouteData(routes) {
		Object.keys(routes).forEach(k => {
			if (typeof routes[k] == "string") {
				var data = this.extractDataFromRoute(routes[k]);
				data.file = routes[k];
				routes[k] = data;
			} else {
				routes[k] = this.getRouteData(routes[k]);
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
				require("./template/1/generate.js")(routes, this.config);
				break;
		}
	}

}