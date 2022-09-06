import React, { useState } from 'react'
import { startAddProduct, startUpdateProduct, fetchProduct, addProduct, deleteProduct } from '../../actions/productActions'
import { connect } from 'react-redux'
import ImagesList from '../images/ImagesList'
import Loading from '../Loading'
import ConfirmDeleteModal from '../ConfirmDeleteModal'
import { useParams } from 'react-router-dom';




const ProductForm = (props) => {
    const [name, setName] = useState(props.product ? props.product.name : '')
    const [description, setDescription] = useState(props.product ? props.product.description : '')
    const [price, setPrice] = useState(props.product ? props.product.price.toString() : '')
    const [quantity, setQuantity] = useState(props.product ? props.product.quantity : 0)
    const [images, setImages] = useState([])
    const [selectedImages, setSelectedImages] = useState([])
    const [error, setError] = useState(undefined)
    const [success, setSuccess] = useState(undefined)
    const [loaded, setLoaded] = useState(false)
    const [showModal, setShowModal] = useState(false)
    // for image drag and drop reordering 
    // check if product is in props, then check if it has images
    const defaultList = props.product ? props.product.Images ? props.product.Images : [] : []
    defaultList.sort((a, b) => a.order - b.order)
    const [itemList, setItemList] = useState(defaultList)
    // store id and product id
    const {id, productId} = useParams()
    


    function onDescriptionChange(e) {
        setDescription(e.target.value)
    }
    const onNameChange = (e) => {
        setName(e.target.value)
    }
    const onPriceChange = (e) => {
        const price = e.target.value
        // this regex doesn't work exactly as it should
        if (!price || price.match(/^\d{1,}(\.\d{0,2})?/)) {
            setPrice(price)
        }
    }
    const onQuantityChange = (e) => {
        setQuantity(e.target.value)
    }
    const onImageChange = (e) => {
        const images = e.target.files
        // for when user adds images to upload and then removes them before submitting
        if (images.length == 0) {
            setImages([])
        }
        // add the image to images array in state (but don't add to database until form is submitted)
        if (props.product) {
            for (let i = 0; i < images.length; i++) {
                setImages(prevImages => [...prevImages, { image: images[i], order: props.product.Images.length + 1 }])
            }
        }
        else {
            // order will just rely on current images in component if there is no product prop
            for (let i = 0; i < images.length; i++) {
                setImages(prevImages => [...prevImages, { image: images[i], order: prevImages.length + 1 }])
            }
        }
    }
    const handleDeleteProduct = async (e) => {
        e.preventDefault()
        try {
            const product = await props.deleteProduct(id, productId)
            setError(undefined)
            setSuccess('Product Deleted')
            props.history.replace(`/UserDashboard/stores/${id}/products`)
        }
        catch (e) {
            console.log(e)
            setSuccess(undefined)
            setError('Unable to delete product :(')
        }
    }
    const openModal = () => {
        setShowModal(true)
    }
    const hideModal = () => {
        setShowModal(false)
    }
    const onformSubmit = async (e) => {
        e.preventDefault()
        // make sure required fields are filled out
        if (!name || !price || !quantity) {
            setSuccess(undefined)
            setError('Name, Price, and Description are required')
        } else {
            // get field values from component state
            try {
                // if we are updating a product, use startUpdateProduct instead of startAddProduct
                if (props.product) {
                    setLoaded(false)
                    const product = await props.startUpdateProduct(
                        name,
                        description,
                        price,
                        quantity,
                        images,
                        // used to check if order of images has been changed
                        itemList,
                        // array of images to delete (if any)
                        selectedImages,
                        id,
                        productId
                    )
                    // otherwise imageList won't be rerendered with updates
                    const newImageList = product.Images ? product.Images : []
                    newImageList.sort((a, b) => a.order - b.order)
                    setItemList(newImageList)
                } else {
                    setLoaded(false)
                    // add product using the storeId from mapstatetoprops
                    const product = await props.addProduct(
                        name,
                        description,
                        price,
                        quantity,
                        images,
                        id,
                        props.history
                    )
                    props.history.replace(`/UserDashboard/stores/${id}/products/${product.id}`)
                    
                }
                // setState needs some logic to see if product is being added or updated 
                setError(undefined)
                setSuccess(props.action == 'Add' ? 'Added' : 'Updated')
                setImages([])
                setSelectedImages([])
                // setLoaded(true)
                
            } catch (e) {
                console.log(e)
                setSuccess(undefined)
                setError(e.message)
                setLoaded(true)
            }
        }

    }
    const handleDrop = (droppedItem) => {

        // Ignore drop outside droppable container
        if (!droppedItem.destination) return;
        var updatedList = [...itemList];
        // Remove dragged item
        const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
        // Add dropped item
        updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
        // Update State
        setItemList(updatedList);
    };
    // once ajax is complete render the product form for this product
    return (
        <div>
           
            <div className='product-page'>

                <ConfirmDeleteModal
                    show={showModal}
                    handleClose={hideModal}
                    action={handleDeleteProduct}
                    type={'product'}
                    setShowModal={setShowModal}
                />
                <div className='form__wrapper'>
                    <form
                        onSubmit={onformSubmit}
                        className='form product-form'
                    >
                        {error && <p className="error">{error}</p>}
                        {success && <p>{success}</p>}
                        <label htmlFor='name'>Name</label>
                        <input
                            type='text'
                            name='name'
                            placeholder='name'
                            value={name}
                            onChange={onNameChange}
                            autoFocus />
                        <label htmlFor='description'>Decription</label>
                        <textarea
                            name='description'
                            type='text'
                            placeholder='description'
                            label='Description'
                            value={description}
                            onChange={onDescriptionChange}
                        />
                        <label htmlFor='price'>Price</label>
                        <input
                            name='price'
                            type='text'
                            placeholder='price'
                            label='Price'
                            value={price}
                            onChange={onPriceChange}
                        />
                        <label htmlFor='quantity'>Quantity</label>
                        <input
                            name='quantity'
                            type='number'
                            placeholder='quantity'
                            label='Quantity'
                            value={quantity}
                            onChange={onQuantityChange}
                        />
                        <label htmlFor='image'>Add Image</label>
                        <input

                            name="image"
                            type='file'
                            multiple
                            label='Add Images'
                            accept="image/png, image/jpeg"
                            onChange={onImageChange}
                        />

                        <button className='button cta' type='submit'>{props.action} Product</button>
                    </form>
                </div>
                <ImagesList
                    product={props.product}
                    selected={selectedImages}
                    setSelectedImages={setSelectedImages}
                    handleDrop={handleDrop}
                    itemList={itemList}
                    setItemList={setItemList}
                />
                {props.product && <button className='button delete-button' onClick={openModal}>Delete Product</button>}
            </div>
        </div>
    ) 
}





export default connect(undefined, { fetchProduct, addProduct, deleteProduct })(ProductForm)