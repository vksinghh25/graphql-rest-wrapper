const fetch = require('node-fetch');
const allUsers = require('./users.js');
const University = require('./universities.js');

const baseURL = 'https://jsonplaceholder.typicode.com';
const baseURLVehicles = 'http://localhost:8080';

// the resolvers here come from 3 different sources
// from an external API at the baseURL location
// from a local data source i.e. an array allUsers
// and lastly from a MongoDB running locally holding a collection of univerities
// also see how the 'vehicles' resolver combines 2 API calls
// provide to this the schema defintion and the resolvers
const resolvers = {
	Query: {
		todos: () => {
			return fetch(`${baseURL}/todos`).then(res => res.json());
		},
		todo: (parent, args) => {
			const { id } = args;
      return fetch(`${baseURL}/todos/${id}`).then(res => res.json());
		},
		vehicles: async () => {
			const cars = await fetch(`${baseURLVehicles}/cars`).then(res => res.json());
			const trucks = await fetch(`${baseURLVehicles}/trucks`).then(res => res.json());
			return cars.concat(trucks);
		},
		users: () => {
			return allUsers;
		},
		universities: () => {
			return University.find({});
		},
		university: (parent, args) => {
				const name = args.name;
				console.log(name);
        return University.findOne({ name: name }).exec();
		}
	},
	Mutation: {
		addUniversity: async (parent, args) => {
			const newUniversity = new University({
				city: args.city,
				name: args.name,
				founded: args.founded
			});

			const error = await newUniversity.save();
			if(error) {
				return error;
			}
			else {
				return newUniversity;
			}
		}
	}
};

module.exports = resolvers;
