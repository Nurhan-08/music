import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Box, Container, CircularProgress, Card, CardContent, IconButton } from '@mui/material';
import { AudioContext } from '../../context/AppContext';
import { CiPlay1, CiPause1 } from 'react-icons/ci';
import PlayBar from '../PLayBar/PlayBar';

const url = 'https://665b0c8a003609eda45fa87a.mockapi.io/api/v1/tracks';

const MusicList = () => {
    const [songs, setSongs] = useState([]);
    const { setAudioTrack, currentTrack, isPlaying, name } = useContext(AudioContext);

    useEffect(() => {
        axios.get(url).then((response) => {
            setSongs(response.data);
        });
    }, []);

    if (songs.length === 0) {
        return (
            <Container maxWidth='md'>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    return (
        <div>
            <Container>
                <Card>
                    <CardContent>
                        {songs.filter(el => el.artists.toLowerCase().includes(name.toLowerCase()))
                            .map((track) => {
                                const min = Math.floor(track.duration / 60);
                                const remainderSecond = Math.floor(track.duration % 60);
                                return (
                                    <div key={track.id} style={{ display: 'flex', gap: 50, alignItems: 'center' }}>
                                        <IconButton onClick={() => {
                                            console.log('cl', setAudioTrack);
                                            setAudioTrack(track)
                                        }}>
                                            {currentTrack?.id === track.id && isPlaying ? <CiPause1 /> : <CiPlay1 />}
                                        </IconButton>
                                        <img width={100} src={track.preview} alt='' />
                                        <div>
                                            <h4>{track.title}</h4>
                                            <p>{track.artists}</p>
                                        </div>
                                        <p>{min}:{remainderSecond < 10 ? `0${remainderSecond}` : remainderSecond}</p>
                                    </div>
                                );
                            })}
                    </CardContent>
                </Card>
                {currentTrack && <PlayBar />}
            </Container>
        </div>
    );
};

export default MusicList;
