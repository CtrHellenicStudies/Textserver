import _ from 'underscore';
import { GraphQLObjectType, GraphQLInputObjectType, GraphQLString, } from 'graphql';
import { attributeFields } from 'graphql-sequelize';

import TextNode from '../../models/textNode';
import TextNodeService from '../logic/textNodes';



/**
 * Text Nodes model type
 * @type {GraphQLObjectType}
 */
const TextNodeType = new GraphQLObjectType({
	name: 'TextNode',
	description: 'A textNode in a work, similar to data model from Draft.js',
	fields: {
		..._.assign(attributeFields(TextNode)),
		urn: {
			type: GraphQLString,
			resolve(parent, {}, { token }) {
				const textNodeService = new TextNodeService({ token });
				return textNodeService.getTextNodeURN(parent);
			},
		},
	},
});

/**
 * Text Nodes input model type
 * @type {GraphQLInputObjectType}
 */
const TextNodeInputType = new GraphQLInputObjectType({
	name: 'TextNodeInput',
	description: 'Input type for a textNode in a work, similar to data model from Draft.js',
	fields: _.assign(attributeFields(TextNode)),
});

export { TextNodeType, TextNodeInputType };
