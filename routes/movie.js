var express = require("express");
var router = express.Router();
var axios = require("axios");
var Movie = require("../models").Movie;

router.get("/", function (req, res, next) {
	Movie.findAll()
		.then((result) => res.send(result))
		.catch((e) => next({ message: e, status: 500 }));
});

router.get("/:id(\\d+)", function (req, res, next) {
	let id = req.params.id;
	Movie.findByPk(id)
		.then((result) => res.send(result))
		.catch((e) => next({ message: e, status: 500 }));
});

router.post("/", function (req, res, next) {
	if (req.user.role !== "admin") {
		return next({ message: "Unauthorized", status: 401 });
	}

	axios({
		url: "http://localhost:8080/sendText",
		method: "POST",
		headers: {
			api_key: "K6MEQJRV3trXMPZ5eQd1Jl8NaaaRZxqy",
			"Cotent-Type": "application/json",
		},
		data: {
			args: {
				to: "6285930087857@c.us",
				content: JSON.stringify(req.body),
			},
		},
	})
		.then((data) => console.log(data))
		.catch((e) => console.log(e));

	let movie = req.body;
	if (movie.name && movie.year && movie.rating) {
		movie.year = new Date(movie.year, 1, 1).toISOString();
		console.log(movie);
		Movie.create(movie)
			.then((result) => {
				res.send("success");
			})
			.catch((e) => next({ message: e, status: 500 }));
	} else {
		next({ message: "Invalid movie data", status: 400 });
	}
});

router.put("/", function (req, res, next) {
	if (req.user.role !== "admin") {
		return next({ message: "Unauthorized", status: 403 });
	}

	let movie = req.body;
	if (movie.id && movie.name && movie.year && movie.rating) {
		movie.year = new Date(movie.year, 1, 1).toISOString();
		Movie.update(movie, { where: { id: movie.id } })
			.then((result) => {
				res.send("success");
			})
			.catch((e) => next({ message: e, status: 500 }));
	} else {
		next({ message: "Invalid movie data", status: 400 });
	}
});

router.delete("/:id(\\d+)", function (req, res, next) {
	if (req.user.role !== "admin") {
		return next({ message: "Unauthorized", status: 403 });
	}

	let id = req.params.id;
	Movie.destroy({ where: { id: id } })
		.then((result) => {
			res.send("success");
		})
		.catch((e) => next({ message: e, status: 500 }));
});

router.get("/filter/name/:name([A-Za-z\\s]+)", function (req, res, next) {
	let name = req.params.name;
	let filteredMovie = movies.filter(
		(movie) => movie.name.toUpperCase().indexOf(name.toUpperCase()) !== -1
	);
	res.send(filteredMovie).status(200);
});

router.get("/filter/year/:from-:to", function (req, res, next) {
	let { from, to } = req.params;
	db.query(
		"SELECT id, name, year, rating FROM public.movies WHERE date_part('year', year) BETWEEN $1 AND $2",
		[from, to]
	)
		.then((result) => {
			res.send(result.rows);
		})
		.catch((e) => next({ message: e, status: 500 }));
});

module.exports = router;
