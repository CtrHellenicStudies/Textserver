import Sequelize from 'sequelize';

import PermissionsService from './PermissionsService';
import Collection from '../../models/collection';
import serializeUrn from '../../modules/cts/lib/serializeUrn';


/**
 * Logic-layer service for dealing with collections
 */

export default class CollectionService extends PermissionsService {
	/**
	 * Count collections
	 * @returns {number} count of collections
	 */
	count() {
		return Collection.count();
	}

	/**
	 * Get a list of collections
	 * @param {string} textsearch
	 * @param {number} offset
	 * @param {number} limit
	 * @returns {Object[]} array of collections
	 */
	getCollections(textsearch, urn, offset = 0, limit = 100) {
		const args = {
			where: {},
			limit,
			offset,
			order: [
				['slug', 'ASC']
			],
		};


		if (textsearch) {
			args.where.title = {
				[Sequelize.Op.like]: `%${textsearch}%`,
			};
		}

		if (urn) {
			args.where.urn = serializeUrn(urn);
		}

		return Collection.findAll(args);
	}

	/**
	 * Get collection
	 * @param {number} id - id of collection
	 * @param {string} slug - slug of collection
	 * @param {string} urn - urn of collection
	 * @returns {Object} array of collections
	 */
	getCollection(id, slug, urn) {
		const where = {};

		if (!id && !slug && !urn) {
			return null;
		}

		if (id) {
			where.id = id;
		}

		if (slug) {
			where.slug = slug;
		}

		if (urn) {
			where.urn = urn;
		}

		return Collection.findOne({ where });
	}
}
