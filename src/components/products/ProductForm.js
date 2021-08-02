import React, {useState, useEffect} from 'react'
import { startAddProduct, startUpdateProduct, startGetProduct, startDeleteProduct } from '../../actions/productActions'
import { connect } from 'react-redux'
import ImagesList from '../images/ImagesList'
import Loading from '../Loading'



const ProductForm = (props) => {
        const [name, setName] = useState(props.product ? props.product.name : '')
        const [description, setDescription] = useState(props.product ? props.product.description : '')
        const [price, setPrice] = useState(props.product ? props.product.price.toString() : '')
        const [quantity, setQuantity] = useState(props.product ? props.product.quantity: 0)
        const [images, setImages] = useState([])
        const [selectedImages, setSelectedImages] = useState([])
        const [error, setError] = useState(undefined)
        const [success, setSuccess] = useState(undefined)
        const [loaded, setLoaded] = useState(false)

        // if we are editing a product we want to set state to match current product values
    useEffect(() => {
        const fetchData = async () => {
        // check if we are adding or updating a product 
        // if we are updating a product we need to fetch the current version from the database
        if(props.action == 'Update') {

            try{
                const product = await props.startGetProduct(props.store.id, props.product.id)
                setLoaded(true)
            } catch(e) {
                setSuccess(undefined)
                setError('could not get product, return to product list')
                setLoaded(true)
            }
        } else {
            setLoaded(true)
        }
    }
    fetchData()
        
    }, [])
    const onDescriptionChange = (e) => {
        setDescription(e.target.value)
    }
    const onNameChange = (e) => {
        setName(e.target.value)
    }
    const onPriceChange = (e) => {
        const price = e.target.value
        // this regex doesn't work exactly as it should
        if(!price || price.match(/^\d{1,}(\.\d{0,2})?/)){
            setPrice(price)
        }
    }
    const onQuantityChange = (e) => {
        setQuantity(e.target.value)
    }
    const onImageChange = (e) => {
        const image = e.target.files[0]
        // add the image to images array in state (but don't add to database until form is submitted)
        setImages(prevImages => [...prevImages, image])
    }
    const handleDeleteProduct = async (e) => {
        e.preventDefault()
        try {
           const product = await this.props.startDeleteProduct(this.props.store.id, this.props.product.id)
           setError(undefined)
           setSuccess('Product Deleted')
        this.props.history.replace(`/UserDashboard/stores/${this.props.store.id}/products`)
        }
        catch {
            setSuccess(undefined)
            setError('Unable to delete product :(')
        }


    }
    const selectImageToDelete = (image) => {
        this.setState((prevState) => ({imagesToDelete: prevState.imagesToDelete.concat(image)}))
    }
    const onformSubmit = async (e) => {
        e.preventDefault()
        // make sure required fields are filled out
        if(!name || !price || !quantity) {
            setSuccess(undefined)
            setError('Name, Price, and Description are required')
        } else {
            // get field values from component state
    
            try {
                // if we are updating a product, use startUpdateProduct instead of startAddProduct
                if(props.product) {
                    const product = await props.startUpdateProduct(
                        name, 
                        description, 
                        price, 
                        quantity, 
                        images,
                        props.store.id,
                        props.product.id 
                        )
                        await props.startGetProduct(props.store.id, props.product.id)
                } else {
                    // add product using the storeId from mapstatetoprops
                    const product = await props.startAddProduct(
                        name, 
                        description, 
                        price, 
                        quantity, 
                        images,
                        props.store.id
                        )
                    await props.startGetProduct(props.store.id, product.id)
                    props.history.replace(`/UserDashboard/stores/${props.store.id}/products/${product.id}`)
                    
                }
                // setState needs some logic to see if product is being added or updated 
                    setError(undefined)
                    setSuccess(props.action == 'Add' ? 'Added' : 'Updated')
                    setImages([])
                    // fetch all products from database to update redux store (and display new image for this product)
            } catch (e) { 
                setSuccess(undefined)
                setError(`Unable To ${this.props.action} Product`)
            }
        }
        
    }
        // once ajax is complete render the product form for this product
        return loaded ? (
            <div>
                <form onSubmit = {onformSubmit}>
                    {error && <p className = "error">{error}</p>}
                    {success && <p>{success}</p>}
                    <input 
                    type = 'text' 
                    placeholder = 'name'
                    value = {name}
                    onChange = {onNameChange}
                    autoFocus />
                    <input 
                    type = 'text'
                    placeholder = 'description'
                    value = {description}
                    onChange = {onDescriptionChange}
                    />
                    <input 
                    type = 'text'
                    placeholder = 'price'
                    value = {price}
                    onChange = {onPriceChange}
                    />
                    <input 
                    type = 'number'
                    placeholder = 'quantity'
                    value = {quantity}
                    onChange = {onQuantityChange}
                    />
                    <input 
                    type = 'file'
                    label = 'file'
                    accept="image/png, image/jpeg"
                    onChange = {onImageChange}
                    />

                <button type = 'submit'>{props.action} Product</button> 
                </form>
                <ImagesList 
                product = {props.product} 
                store = {props.store}
                selected = {selectedImages}
                setSelectedImages = {setSelectedImages}
                />
                {props.product && <button onClick = {handleDeleteProduct}>Delete Product</button>}
            </div>
        ) : <Loading />
    } 

const mapDispatchToProps = (dispatch) => ({
    startAddProduct: (name, description, price, quantity, images, storeId) => dispatch(startAddProduct(name, description, price, quantity, images, storeId)),
    startUpdateProduct: (name, description, price, quantity, images, storeId, productId) => dispatch(startUpdateProduct(name, description, price, quantity, images, storeId, productId)),
    startDeleteProduct: (storeId, productId) => dispatch(startDeleteProduct(storeId, productId)),
    startGetProduct: (storeId, productId) => dispatch(startGetProduct(storeId, productId)),  
})


export default connect(undefined, mapDispatchToProps)(ProductForm)