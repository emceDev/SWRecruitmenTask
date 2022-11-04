import { useQuery, useReactiveVar } from "@apollo/client";
import { cartProductsVar } from "../apolloState/client";
import { GET_PRICES } from "../apolloState/queries";

export const addToCart = (Component) => {
	return function WrappedComponent(props) {
		const currentCart = useReactiveVar(cartProductsVar);
		const { data, loading, error } = useQuery(GET_PRICES, {
			variables: { pid: props.productId },
		});
		function addRemove() {
			// const toCartData = {
			// 	productId: p.id,
			// 	prices: p.prices,
			// 	inCartQuantity: 1,
			// };

			console.log(props);
			if (props.inCart === true) {
				console.log("is in cart");
			} else {
				console.log("add to cart");
			}

			// cartProductsVar(
			// 	p.isInCart ? [...currentCart] : [...currentCart, toCartData]
			// );
			// cartProductsVar(
			// 	p.isInCart
			// 		? currentCart.filter((x) => x.productId !== p.id)
			// 		: [...currentCart, toCartData]
			// );
		}
		if (loading) {
			<p>loading...</p>;
		} else if (error) {
			<p>error occurred</p>;
		} else {
			return <Component {...props} data={data} addRemove={addRemove} />;
		}
	};
};
