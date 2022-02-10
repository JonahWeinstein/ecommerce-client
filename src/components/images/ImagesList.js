import React, {useState} from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ImageListItem from './ImageListItem'



const ImagesList = (props) => {
    // get the original list of images to facilitate drag and drop reordering
    const defaultList = props.product.Images
    const [itemList, setItemList] = useState(defaultList)

    // console.log(defaultList)
    const onSelect = (image, selected) => {
        if(!selected) {
            props.setSelectedImages(
                prevImages => prevImages.filter((currentImage) => currentImage.id != image.id)
                )
        }
        else {
            props.setSelectedImages(prevImages => prevImages.concat(image))
        }
    }
    // Function to update list on drop
const handleDrop = (droppedItem) => {
    console.log(droppedItem)
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
   
    
    // if there are images associated with this product then list them
    if(props.product){
        
        return (
            <div className="image-list">
            <DragDropContext onDragEnd={handleDrop}>
            <Droppable droppableId="list-container">
              {(provided) => (
                <div
                  className="list-container"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {itemList.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                      {(provided) => (
                        <div
                          className="item-container"
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                        >
                        <ImageListItem 

                        image = {item}
                        store = {props.store}
                        onSelect = {onSelect}
                        />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
            </div>
                
            //         {props.product.Images.map((image) => (
            //             <li key = {image.id} className = "list--grid-layout__item">
                            // <ImageListItem 

                            // image = {image}
                            // store = {props.store}
                            // onSelect = {onSelect}
                            // />
                            
            //             </li>
            //         ))}
            //     </ul>
            // </div>
        )
    } else {
        return (
            <div>

            </div>
        )
    }
}



export default ImagesList