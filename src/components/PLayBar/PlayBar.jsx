import { useState, useEffect, useContext } from 'react';
import { AudioContext } from '../../context/AppContext';
import { Box, Container, IconButton, Slider } from '@mui/material';
import { CiPlay1, CiPause1 } from 'react-icons/ci';
import { formatMMSS } from '../../helpers/formatMMSS';

const PlayBar = () => {
    const { currentTrack, isPlaying, setAudioTrack, audio } = useContext(AudioContext);
    const [value, setValue] = useState(0);

    useEffect(() => {
        let timer;

        if (isPlaying) {
            timer = setInterval(() => {
                setValue(Math.floor(audio.currentTime));
            }, 1000);
        }

        return () => {
            clearInterval(timer);
        };
    }, [isPlaying, audio]);

    return (
        <div
            style={{
                position: 'fixed',
                width: '100%',
                left: 0,
                bottom: 0,
                height: 150,
                background: 'grey',
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <Container maxWidth='lg'>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={()=>{
                        setAudioTrack(currentTrack)
                    }}>
                        {isPlaying ? <CiPause1 /> : <CiPlay1 />}
                    </IconButton>
                    <img width={80} src={currentTrack.preview} alt='' />
                    <div>
                        <h4>{currentTrack.artists}</h4>
                        <p>{currentTrack.title}</p>
                    </div>
                    <p style={{ width: 100 }}>{formatMMSS(value)}</p>
                    <Slider
                        onChange={(_, v) => {
                            const newTime = (v / 100) * currentTrack.duration;
                            audio.currentTime = newTime;
                            setValue(newTime);
                        }}
                        value={(value / currentTrack.duration) * 100}
                        min={0}
                        max={100}
                    />
                    <p style={{ width: 100 }}>{formatMMSS(currentTrack.duration - value)}</p>
                </Box>
            </Container>
        </div>
    );
};

export default PlayBar;
