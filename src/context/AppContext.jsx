import { createContext, useState, useEffect } from 'react';

export const AudioContext = createContext();
const audio = new Audio()

const AudioProvider = ({ children }) => {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [name, setName] = useState("");
    const [theme, setTheme] = useState("white");



    const toggleTheme = () => {
        if(theme === 'white'){
            setTheme('dark')
        }else if (theme === 'dark') {
            setTheme('white')
        }
    }

    const setAudioTrack = (track) => {
        if (currentTrack?.id !== track.id) {
            setCurrentTrack(track)
            audio.src = track.src
            audio.play()
            setIsPlaying(true)
            return
        }
        if (isPlaying) {
            audio.pause()
            setIsPlaying(false)
        } else {
            audio.play()
            setIsPlaying(true)

        }

    };

    const setSearchText = (name) => {
        console.log(name);
        setName(name)
    }

    const value = {
        toggleTheme,
        theme,
        setSearchText, 
        name,
        text:"Music App",
        currentTrack,
        isPlaying,
        setAudioTrack,
        audio
    }

    return (
        <AudioContext.Provider value={value}>
            {children}
        </AudioContext.Provider>
    );
};

export default AudioProvider;
