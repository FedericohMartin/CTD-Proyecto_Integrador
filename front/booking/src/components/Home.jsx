import React, {useState , useEffect} from "react";
import styles from "../styles/home.module.css"
import categoryService from "../services/categoryService";
import productService from "../services/productService";
import Categories from "./tools/Categories";
import Searchbox from "./tools/Searchbox";

function Home() {
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([]);
    const [hasData, setHasData] = useState(true);
    const [page, setPage] = useState({
        pageNumber: 0,
        totalPages: 0,
    });
    const [isLoaded, setIsLoaded] =useState(false);
    const [categoriesLoaded, setCategoriesLoaded] = useState(false);

    const onNextClicked = () => {
        setPage(prevState => {
            const update = {...prevState};
            update.pageNumber++

            return update;
        })
    }

    const onPrevClicked = () => {
        setPage(prevState => {
            const update = {...prevState};
            update.pageNumber--

            return update;
        })
    }

    const onNumberClicked= (targetPage) => {
        setPage(prevState => {
            const update = {...prevState};
            update.pageNumber = parseInt(targetPage);

            return update;
        })
    }

    const onResetPage = () => {
        setPage((prevState) => {
            return {...prevState, pageNumber:0}
        })
    }
    
    
    const onSubmitClicked = (data) => {
        setIsLoaded(false);
        onResetPage();
        if(!(data.city || data.dateRange.startDate || data.dateRange.endDate)){
            setHasData(false);
            console.log("null data");
        } else if(data.city && !(data.dateRange.startDate || data.dateRange.endDate)){
            setIsLoaded(false);
            setHasData(true);
            productService
            .getByCityId(data.city)
            .then(response => {
                setProducts(response.data.items);
                setPage((prevState)=>{
                    const update = {...prevState};
                    update.totalPages = Math.ceil(response.data.total/4);
                    return update;
                })
                setIsLoaded(true);
            })
            .catch(error => console.log(error));
        }else if(!data.city && (data.dateRange.startDate && data.dateRange.endDate)){
            setIsLoaded(false);
            setHasData(true);
            productService
            .getByDates(data)
            .then(response => {
                setProducts(response.data.items);
                setPage((prevState)=>{
                    const update = {...prevState};
                    update.totalPages = Math.ceil(response.data.total/4);
                    return update;
                })
                setIsLoaded(true);
            })
            .catch(error => console.log(error));
        }else if(data.city && data.dateRange.startDate && data.dateRange.endDate){
            setIsLoaded(false);
            setHasData(true);
            productService
            .getBycityAndDates(data)
            .then(response => {
                setProducts(response.data.items);
                setPage((prevState)=>{
                    const update = {...prevState};
                    update.totalPages = Math.ceil(response.data.total/4);
                    return update;
                })
                setIsLoaded(true);
            })
            .catch(error => console.log(error));
        }
    }

    const onCategoryClicked = (categoryId) => {
        setIsLoaded(false);
        onResetPage();
        productService
        .getByCategoryId(categoryId)
        .then(response => {
            setProducts(response.data.items);
            setPage((prevState)=>{
                const update = {...prevState};
                update.totalPages = Math.ceil(response.data.total/4);
                return update;
            })
            setIsLoaded(true);
        })
        .catch(error => console.log(error));
    }

    useEffect(() => {
        const abortController = new AbortController();
        categoryService
        .getAll(abortController.signal)
        .then((response) => {
            setCategories(response.data);
            setCategoriesLoaded(true);
        })
        .catch(error =>{

            console.log(error)});

        productService
        .getAll(abortController.signal)
        .then((response) => {
            setProducts(response.data.items);
            setPage((prevState)=>{
                const update = {...prevState};
                update.totalPages = Math.ceil(response.data.total/4);
                return update;
            })
            setIsLoaded(true);
        })
        .catch(error => {console.log(error)})

        return () => abortController.abort();
    }, []);

    return (
            <div className={styles.container}>
                <Searchbox onParentSubmitClicked={onSubmitClicked} hasData={hasData}></Searchbox>
                <Categories 
                    categories={categories} 
                    products={products} 
                    onParentClicked={onCategoryClicked}
                    onParentNextClicked={onNextClicked}
                    onParentPrevClicked={onPrevClicked}
                    onParentNumberClicked={onNumberClicked}
                    isLoaded={isLoaded}
                    categoriesLoaded={categoriesLoaded}
                    page={page}
                ></Categories>
            </div>
    )
}

export default Home;