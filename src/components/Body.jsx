import React, { useEffect, useState } from 'react'
import * as htmlToImage from 'html-to-image'
import download from "downloadjs"
export default function Body() {
    let node = document.getElementById("download-image")
    const time =new Date().getTime()

    const [formData, setFormData] = useState({
        topText: "",
        downText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })

    const [allMemes, setAllMemes] = React.useState([])

    function handleChange(event) {
        const { name, value } = event.target

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    function handleSubmit(event) {
        event.preventDefault()
       
    }
    function downloadImage(){
        htmlToImage.toPng(node)
        .then(function(dataUrl){
            download( dataUrl, time);
        })
    }

    function getMemeImage(){
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setFormData(prevMeme=>({
            ...prevMeme,
            randomImage:url
        }))
    }
    useEffect(() => {
        console.log("running")
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])


    return (
        <div className='body--container'>
            <div className='form-section'>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name='topText'
                        value={formData.topText}
                        onChange={handleChange}
                        placeholder="Top Text"
                        className='form-items'
                    />
                    <input
                        type="text"
                        name='downText'
                        value={formData.downText}
                        onChange={handleChange}
                        placeholder="Down Text"
                        className='form-items'
                    />
                    <button onClick={getMemeImage} className='btn'>Generate</button>
                    <button onClick={downloadImage} className='btn'>Download</button>
                </form>
            </div>
            <div className='meme-image-section' id='download-image'>
                <img src={formData.randomImage} />
                <p className='top-text'>{formData.topText}</p>
                <p className='bottom-text'>{formData.downText}</p>
            </div>
        </div>
    )
}
