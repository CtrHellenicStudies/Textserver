import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';



/**
 * Custom graphql scalar type representing a CTS URN as individual input components
 */
const PerseusCtsResponse = new GraphQLScalarType({
	name: 'PerseusCtsResponse',
	description: 'GraphQL custom scalar type to represent a response from the Perseus CTS API',

	parseValue(ast) {
		return ast;
	},
	serialize(value) {
		// if urn is already string, no need to serialize from other type
		if (typeof value === 'string') {
			return value;
		}

		return value;
	},
	parseLiteral(ast) {
		return ast;
	},
});


export default PerseusCtsResponse;
