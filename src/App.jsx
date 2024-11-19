import {useState} from "react";
import Products from "./components/products/products";

function App() {
	const [count, setCount] = useState(0);

	return (
		<section>
			<Products />
		</section>
	);
}

export default App;
