import React from 'react'

class ImageUploadform extends React.Component {
    state = {
        iamges: []
    }
    onChange(e) {
        this.setState({image: e.target.files[0]});
    }

    render () {
        return (
            <div>
                <form>
                    <input 
                    type = "file"
                    name = "image-uplaod"
                    />
                    <button type = "submit">Add Image</button>
                </form>
            </div>
        )
    }
}

export default ImageUploadform