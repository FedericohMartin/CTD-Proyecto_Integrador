import React, {useState , useEffect} from "react";
import styles from "../styles/home.module.css"
import categoryService from "../services/categoryService";
import productService from "../services/productService";
import Categories from "./tools/Categories";
import Searchbox from "./tools/Searchbox";


function Home() {
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([]);
    
    const onSubmitClicked = (data) => {
        productService
        .getByCityId(data.city)
        .then(response => {
            setProducts(response.data);;
        })
        .catch(error => console.log(error));
    }

    const onCategoryClicked = (catedoryId) => {
        productService
        .getByCategoryId(catedoryId)
        .then(response => {
            setProducts(response.data);;
        })
        .catch(error => console.log(error));
    }

    useEffect(() => {
        categoryService
        .getAll()
        .then((response) => {
            setCategories(response.data);
        })
        .catch(error => console.log(error));

        productService
        .getAll()
        .then((response) => {
            setProducts(response.data);
        })
        .catch(error => console.log(error))
    }, []);

    return (
            <div className={styles.container}>
                <Searchbox onParentSubmitClicked={onSubmitClicked}></Searchbox>
                <Categories categories={categories} products={products} onParentClicked={onCategoryClicked}></Categories>
            </div>
    )
}

export default Home;