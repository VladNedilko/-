const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const cors = require('cors');

const app = express();
const PORT = 5000;

const DATA_DIR = 'E:/lil_kaban/5 Семестр/Kyrs/music-app/src/server/data';
const USERS_DIR = path.join(DATA_DIR, 'users');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const email = req.params.email;
        const userDir = path.join(USERS_DIR, email, 'pics');
        ensureDirExists(userDir);
        cb(null, userDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now();
        const name = file.fieldname === 'avatar' ? 'avatar' : 'background';
        cb(null, `${name}-${uniqueSuffix}${path.extname(file.originalname)}`);
    },
});

const storageForTracks = multer.diskStorage({
    destination: (req, file, cb) => {
        const email = req.params.email;
        const trackType = file.fieldname === 'audioFile' ? 'audio' : 'covers';
        const userDir = path.join(USERS_DIR, email, 'tracks', trackType);
        ensureDirExists(userDir);
        cb(null, userDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now();
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage });
const trackUpload = multer({
    storage: storageForTracks,
    fileFilter: (req, file, cb) => {
        if (
            (file.fieldname === 'audioFile' && !file.mimetype.startsWith('audio/')) ||
            (file.fieldname === 'cover' && !file.mimetype.startsWith('image/'))
        ) {
            return cb(new Error('Invalid file type!'), false);
        }
        cb(null, true);
    },
});

app.use(cors());
app.use(express.json());
app.use(express.static(DATA_DIR));

const ensureDirExists = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Directory created: ${dirPath}`);
    }
};


const deleteOldFile = (filePath) => {
    if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
};

app.delete('/users/:email/tracks/:trackId', (req, res) => {
    const email = req.params.email;
    const trackId = req.params.trackId;
    const userDir = path.join(USERS_DIR, email);
    const userDataPath = path.join(userDir, 'user.json');

    try {
        if (!fs.existsSync(userDataPath)) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userData = JSON.parse(fs.readFileSync(userDataPath));
        const trackIndex = userData.tracks.findIndex((track) => track.id === parseInt(trackId));

        if (trackIndex === -1) {
            return res.status(404).json({ error: 'Track not found' });
        }

        const [deletedTrack] = userData.tracks.splice(trackIndex, 1);
        fs.writeFileSync(userDataPath, JSON.stringify(userData, null, 2));

        if (deletedTrack.trackLink) {
            const trackFilePath = path.join(DATA_DIR, deletedTrack.trackLink.replace('http://localhost:5000/', ''));
            deleteOldFile(trackFilePath);
        }
        if (deletedTrack.coverLink) {
            const coverFilePath = path.join(DATA_DIR, deletedTrack.coverLink.replace('http://localhost:5000/', ''));
            deleteOldFile(coverFilePath);
        }

        res.status(200).json({ message: 'Track deleted successfully' });
    } catch (error) {
        console.error('Error deleting track:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/register', (req, res) => {
    const { nickname, email, password } = req.body;

    if (!nickname || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const userDir = path.join(USERS_DIR, email);

    if (fs.existsSync(userDir)) {
        return res.status(400).json({ error: 'User already exists' });
    }

    try {
        ensureDirExists(userDir);
        ensureDirExists(path.join(userDir, 'pics'));

        const userData = { nickname, email, password, avatarPath: null, backgroundPath: null };
        fs.writeFileSync(path.join(userDir, 'user.json'), JSON.stringify(userData, null, 2));

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(`Error creating user directory: ${error.message}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    try {
        const users = fs.readdirSync(USERS_DIR);
        for (const user of users) {
            const userDataPath = path.join(USERS_DIR, user, 'user.json');
            const userData = JSON.parse(fs.readFileSync(userDataPath));

            if (userData.email === email && userData.password === password) {
                return res.json({ ...userData, isAuthenticated: true });
            }
        }

        res.status(401).json({ error: 'Invalid credentials' });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/users/:email', (req, res) => {
    const email = req.params.email;
    const userDir = path.join(USERS_DIR, email);

    if (!fs.existsSync(userDir)) {
        return res.status(404).json({ error: 'User not found' });
    }

    try {
        const userDataPath = path.join(userDir, 'user.json');
        const userData = JSON.parse(fs.readFileSync(userDataPath));
        res.json(userData);
    } catch (error) {
        console.error('Error reading user data:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/users/:email/upload', upload.fields([{ name: 'avatar' }, { name: 'background' }]), (req, res) => {
    const email = req.params.email;
    const userDir = path.join(USERS_DIR, email);
    const userDataPath = path.join(userDir, 'user.json');

    if (!fs.existsSync(userDir)) {
        return res.status(404).json({ error: 'User not found' });
    }

    try {
        const userData = fs.existsSync(userDataPath)
            ? JSON.parse(fs.readFileSync(userDataPath))
            : { avatarPath: null, backgroundPath: null };

        const updateFilePath = (file, field) => {
            if (file) {

                if (userData[field]) {
                    const oldFilePath = path.join(DATA_DIR, userData[field].replace('http://localhost:5000/', ''));
                    deleteOldFile(oldFilePath);
                }
                
                const newFilePath = path.join(userDir, 'pics', file.filename);
                userData[field] = `http://localhost:5000/${path.relative(DATA_DIR, newFilePath).replace(/\\/g, '/')}`;
            }
        };

        updateFilePath(req.files['avatar']?.[0], 'avatarPath');

        updateFilePath(req.files['background']?.[0], 'backgroundPath');

        fs.writeFileSync(userDataPath, JSON.stringify(userData, null, 2));

        res.json({
            avatarPath: userData.avatarPath,
            backgroundPath: userData.backgroundPath,
        });
    } catch (error) {
        console.error('Error saving files:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.patch('/users/:email/tracks/:trackId', (req, res) => {
    const email = req.params.email;
    const trackId = parseInt(req.params.trackId, 10);
    const userDir = path.join(USERS_DIR, email);
    const userDataPath = path.join(userDir, 'user.json');

    if (!fs.existsSync(userDataPath)) {
        return res.status(404).json({ error: 'User not found' });
    }

    try {
        const userData = JSON.parse(fs.readFileSync(userDataPath));
        const trackIndex = userData.tracks.findIndex((track) => track.id === trackId);

        if (trackIndex === -1) {
            return res.status(404).json({ error: 'Track not found' });
        }

        const { trackName, mainArtist } = req.body;
        if (!trackName || !mainArtist) {
            return res.status(400).json({ error: 'Track name and artist name are required.' });
        }

        const updatedTrack = {
            ...userData.tracks[trackIndex],
            name: trackName,
            artist: mainArtist,
        };

        userData.tracks[trackIndex] = updatedTrack;
        fs.writeFileSync(userDataPath, JSON.stringify(userData, null, 2));

        res.status(200).json(updatedTrack);
    } catch (error) {
        console.error('Error updating track:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});




app.get('/users/:email/tracks', (req, res) => {
    const email = req.params.email;
    const userDir = path.join(USERS_DIR, email);
    const userDataPath = path.join(userDir, 'user.json');

    if (!fs.existsSync(userDataPath)) {
        return res.status(404).json({ error: 'User not found' });
    }

    try {
        const userData = JSON.parse(fs.readFileSync(userDataPath));
        res.json(userData.tracks || []);
    } catch (error) {
        console.error('Error fetching tracks:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/users/:email/username', (req, res) => {
    const email = req.params.email;
    const userDir = path.join(USERS_DIR, email);
    const userDataPath = path.join(userDir, 'user.json');

    if (!fs.existsSync(userDataPath)) {
        return res.status(404).json({ error: 'User not found' });
    }

    try {
        const userData = JSON.parse(fs.readFileSync(userDataPath));
        res.json({ username: userData.nickname });
    } catch (error) {
        console.error('Error reading user data:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/users/:email/recently-played', (req, res) => {
    const email = req.params.email;
    const userDir = path.join(USERS_DIR, email);
    const userDataPath = path.join(userDir, 'user.json');

    if (!fs.existsSync(userDataPath)) {
        return res.status(404).json({ error: 'User not found' });
    }

    try {
        const userData = JSON.parse(fs.readFileSync(userDataPath));
        const recentlyPlayed = userData.tracks
            ?.filter(track => track.isRecentlyPlayed) // Assuming a flag `isRecentlyPlayed`
            .sort((a, b) => b.lastPlayedAt - a.lastPlayedAt) // Sort by the last played time
            .slice(0, 10); // Limit to the last 10 tracks
        res.json(recentlyPlayed || []);
    } catch (error) {
        console.error('Error fetching recently played tracks:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.patch('/users/:email/tracks/:trackId/play', (req, res) => {
    const email = req.params.email;
    const trackId = parseInt(req.params.trackId, 10); // Приведение trackId к числу
    console.log('Request received:', { email, trackId });

    const userDir = path.join(USERS_DIR, email);
    const userDataPath = path.join(userDir, 'user.json');

    if (!fs.existsSync(userDataPath)) {
        return res.status(404).json({ error: 'User not found' });
    }

    try {
        const userData = JSON.parse(fs.readFileSync(userDataPath));

        if (!Array.isArray(userData.tracks)) {
            return res.status(400).json({ error: 'Tracks data is invalid' });
        }

        const track = userData.tracks.find((t) => t.id === trackId);
        if (!track) {
            console.log('Track not found:', trackId);
            return res.status(404).json({ error: 'Track not found' });
        }

        // Обновление трека
        track.isRecentlyPlayed = true;
        track.lastPlayedAt = Date.now();

        fs.writeFileSync(userDataPath, JSON.stringify(userData, null, 2));
        console.log('Track updated successfully:', track);

        res.status(200).json({ message: 'Track marked as played', track });
    } catch (error) {
        console.error('Error updating track play info:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.post('/users/:email/tracks', trackUpload.fields([
    { name: 'audioFile', maxCount: 1 },
    { name: 'cover', maxCount: 1 },
]), (req, res) => {
    const email = req.params.email;
    const userDataPath = path.join(USERS_DIR, email, 'user.json');

    if (!req.files || !req.files.audioFile || req.files.audioFile.length === 0) {
        return res.status(400).json({ error: 'Audio file is required.' });
    }

    try {
        if (!fs.existsSync(userDataPath)) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userData = JSON.parse(fs.readFileSync(userDataPath));
        if (!userData.tracks) {
            userData.tracks = [];
        }

        const audioFile = req.files.audioFile[0];
        const coverFile = req.files.cover ? req.files.cover[0] : null;

        const newTrack = {
            id: Date.now(),
            name: req.body.trackName || audioFile.originalname,
            artist: req.body.mainArtist || 'Unknown Artist',
            genre: req.body.genre || 'Unknown Genre',
            tags: req.body.tags ? JSON.parse(req.body.tags) : [],
            description: req.body.description || '',
            isRecentlyPlayed: false,
            lastPlayedAt: null,
            isPublic: req.body.isPublic === 'true',
            trackLink: `http://localhost:5000/${path.relative(DATA_DIR, audioFile.path).replace(/\\/g, '/')}`,
            coverLink: coverFile
                ? `http://localhost:5000/${path.relative(DATA_DIR, coverFile.path).replace(/\\/g, '/')}`
                : null,
        };

        userData.tracks.push(newTrack);

        fs.writeFileSync(userDataPath, JSON.stringify(userData, null, 2));

        res.status(201).json({ message: 'Track uploaded successfully.', track: newTrack });
    } catch (error) {
        console.error('Error uploading track:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
