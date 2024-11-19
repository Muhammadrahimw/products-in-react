import React, {useEffect, useState} from "react";
import axios from "axios";
import useAxios from "axios-hooks";

const Products = () => {
	let buttonStyle = {
		width: "20%",
		height: "3em",
		cursor: "pointer",
	};

	let categoryStyle = {
		display: "flex",
		gap: "0.75em",
		marginBottom: "1.25em",
	};

	let searchStyle = {
		width: "100%",
		padding: "0.75em",
		marginBottom: "1.25em",
		fontSize: "1em",
		outline: "none",
	};

	let productsContainer = {
		display: "grid",
		gridTemplateColumns: "repeat(5, 1fr)",
		gap: "1.25em",
	};

	let productStyle = {
		border: "1px solid #ddd",
		padding: "0.75em",
		borderRadius: "0.25em",
	};

	let productImgStyle = {
		width: "100%",
		height: "9.5em",
		objectFit: "contain",
		marginBottom: "0.75em",
	};

	const [searchItem, setSearchItem] = useState("");
	const [categoryFilter, setCategoryFilter] = useState("");
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [{data: products, loading, error}] = useAxios(
		"https://fakestoreapi.com/products"
	);

	useEffect(() => {
		if (products) {
			let filtered = products;

			if (categoryFilter) {
				filtered = filtered.filter(
					(product) => product.category === categoryFilter
				);
			}

			if (searchItem) {
				filtered = filtered.filter((product) =>
					product.title.includes(searchItem)
				);
			}

			setFilteredProducts(filtered);
		}
	}, [products, categoryFilter, searchItem]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error</p>;

	let categories = [];
	products.forEach((product) => {
		if (!categories.includes(product.category)) {
			categories.push(product.category);
		}
	});

	return (
		<section style={{padding: "1.25em"}}>
			<div style={categoryStyle}>
				<button style={buttonStyle} onClick={() => setCategoryFilter("")}>
					All
				</button>
				{categories.map((category) => (
					<button
						style={buttonStyle}
						key={category}
						onClick={() => setCategoryFilter(category)}>
						{category}
					</button>
				))}
			</div>
			<input
				type="text"
				placeholder="Search products"
				value={searchItem}
				onChange={(e) => setSearchItem(e.target.value)}
				style={searchStyle}
			/>
			<div style={productsContainer}>
				{filteredProducts.map((product) => (
					<div key={product.id} style={productStyle}>
						<img
							src={product.image}
							alt={product.title}
							style={productImgStyle}
						/>
						<h3 style={{fontSize: "1em", marginBottom: "0.3em"}}>
							{product.title}
						</h3>
						<p style={{fontSize: "0.8em", color: "#555"}}>
							Category: {product.category}
						</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default Products;
